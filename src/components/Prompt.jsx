import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { themePropTypes } from '../hooks/useTheme';
import { THEMES } from '../utils/constants';
import styles from '../styles/Prompt.module.css';

let CONSOLE_MESSAGE_DISPLAYED = false;

const Prompt = ({ theme }) => {
  const [promptVisible, setPromptVisible] = useState(false);
  const [outputWindowVisible, setOutputWindowVisible] = useState(false);
  const [arrowDirection, setArrowDirection] = useState('up');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState('');
  const [command, setCommand] = useState('');

  const outputWindowRef = useRef(null);
  const promptRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const ARROWS = {
    up: '&#9650;',
    down: '&#9660;',
  };

  const ECHO_TYPES = useMemo(
    () => ['info', 'success', 'warning', 'error', 'default'],
    []
  );
  const ECHO_THEMES = useMemo(() => ['light', 'dark', 'colored'], []);

  const scrollOutputWindowToTop = useCallback(() => {
    if (outputWindowRef.current) {
      outputWindowRef.current.scrollTop = 0;
    }
  }, []);

  const scrollOutputWindowToBottom = useCallback(() => {
    if (outputWindowRef.current) {
      outputWindowRef.current.scrollTop = outputWindowRef.current.scrollHeight;
    }
  }, []);

  const showOutputWindow = useCallback(
    ({ top = false, bottom = false }) => {
      setOutputWindowVisible(true);
      setArrowDirection('down');
      if (top) setTimeout(() => scrollOutputWindowToTop(), 0);
      if (bottom) setTimeout(() => scrollOutputWindowToBottom(), 0);
    },
    [scrollOutputWindowToBottom, scrollOutputWindowToTop]
  );

  const hideOutputWindow = () => {
    setOutputWindowVisible(false);
    setArrowDirection('up');
  };

  const showPrompt = () => {
    setPromptVisible(true);
  };

  const clearCommand = () => {
    setCommand('');
  };

  const clearOutput = () => {
    setOutput('');
  };

  const hidePrompt = useCallback(() => {
    setPromptVisible(false);
    setHistoryIndex(-1);
    hideOutputWindow();
    clearCommand();
  }, []);

  const toggleOutputWindow = useCallback(() => {
    return outputWindowVisible
      ? hideOutputWindow()
      : showOutputWindow({ bottom: true });
  }, [outputWindowVisible, showOutputWindow]);

  const setTheme = useCallback(
    (which) => {
      theme.applyTheme(which);
    },
    [theme]
  );

  const moveCursorToEnd = () => {
    promptRef.current.selectionStart = promptRef.current.value.length;
    promptRef.current.selectionEnd = promptRef.current.value.length;
  };

  useEffect(() => {
    if (history[historyIndex] === undefined) {
      clearCommand();
    } else {
      setCommand(history[historyIndex]);
    }
  }, [history, historyIndex]);

  const prev = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((currentHistoryIndex) => currentHistoryIndex + 1);
    }
    moveCursorToEnd();
  }, [history.length, historyIndex]);

  const next = useCallback(() => {
    if (historyIndex >= 0) {
      setHistoryIndex((currentHistoryIndex) => currentHistoryIndex - 1);
    }
    moveCursorToEnd();
  }, [historyIndex]);

  const echo = useCallback(
    (args) => {
      let type = 'info';
      let { theme: currentTheme } = theme;
      let parts = [...args];

      parts = parts
        .map((part) => {
          if (part.startsWith('--type=')) {
            const proposed = part.split('=')[1];
            if (ECHO_TYPES.includes(proposed)) type = proposed;
            return null;
          }
          if (part.startsWith('--theme=')) {
            const proposed = part.split('=')[1];
            if (ECHO_THEMES.includes(proposed)) currentTheme = proposed;
            return null;
          }
          return part;
        })
        .filter((part) => part);

      toast(parts.join(' '), { type, theme: currentTheme });
    },
    [theme, ECHO_TYPES, ECHO_THEMES]
  );

  const cd = useCallback(
    (args) => {
      let path = args[0];
      if (args.length < 1) {
        path = '';
      }
      if (path.startsWith('/')) {
        path = path.substring(1);
      }
      if (path.endsWith('/')) {
        path = path.slice(0, -1);
      }

      path = `/${path}`;

      if (location.pathname === path) {
        return;
      }

      navigate(path);
    },
    [location.pathname, navigate]
  );

  const exit = useCallback(() => {
    hidePrompt();
  }, [hidePrompt]);

  const help = useCallback(() => {
    clearOutput();

    const echoTypes = ECHO_TYPES.reduce((acc, cur) => `${acc}, ${cur}`);
    const echoThemes = ECHO_THEMES.reduce((acc, cur) => `${acc}, ${cur}`);
    const siteThemes = Object.values(THEMES).reduce(
      (acc, cur) => `${acc}, ${cur}`
    );

    // prettier-ignore
    setOutput(`usage: command [arg1] [arg2] ...
  Available commands:
  echo   - prints args to toast notification of optional type and theme
           types: ${echoTypes}
           themes: ${echoThemes}
           e.g. echo --type=${ECHO_TYPES[0]} --theme=${ECHO_THEMES[0]} Hello World
  cd     - navigates to the given arg
  toggle - toggles the output window
  theme  - sets the website theme to the arg
           themes: ${siteThemes}
           e.g. theme ${Object.values(THEMES)[0]}
  exit   - closes the command prompt
  help   - prints this message
  `);

    showOutputWindow({ top: true });
  }, [ECHO_TYPES, ECHO_THEMES, showOutputWindow]);

  const run = useCallback(
    ({ cmd = null, recordHistory = true }) => {
      if (cmd === '') return;

      if (recordHistory) {
        // Push to top of history stack
        setHistory((prevHistory) => [cmd, ...prevHistory]);
      }

      const parts = cmd
        .split(' ')
        .filter((p) => {
          return p !== '';
        })
        .map((p) => p.trim());
      const cleanedCommand = parts[0].trim().toLowerCase();
      const args = parts.slice(1);

      switch (cleanedCommand) {
        case 'echo':
          echo(args);
          break;
        case 'cd':
          cd(args);
          break;
        case 'toggle':
          toggleOutputWindow();
          break;
        case 'theme':
          setTheme(args[0]);
          break;
        case 'exit':
          exit();
          break;
        case 'help':
          help();
          break;
        default:
          break;
      }

      setHistoryIndex(-1);
      clearCommand();
    },
    [cd, echo, exit, help, setTheme, toggleOutputWindow]
  );

  useEffect(() => {
    if (history[0] === 'help') return;

    const gutter = history.length.toString().length + 1;
    const historyString = history
      .slice()
      .reverse()
      .reduce(
        (acc, cur, i) =>
          `${acc}${(i + 1).toString().padStart(gutter, ' ')} ${cur} \n`,
        ''
      );

    setOutput(historyString);

    setTimeout(() => scrollOutputWindowToBottom(), 0);
  }, [history, scrollOutputWindowToBottom]);

  useEffect(() => {
    const keyupFn = (e) => {
      if (e.code === 'Backquote') {
        e.preventDefault(); // Prevents adding ` when opening the prompt
        showPrompt();
      } else if (e.code === 'Escape') {
        hidePrompt();
      } else if (e.code === 'Enter') {
        if (promptVisible) {
          run({ cmd: command, event: e });
        }
      } else if (e.code === 'ArrowUp') {
        if (promptVisible) {
          prev();
        }
      } else if (e.code === 'ArrowDown') {
        if (promptVisible) {
          next();
        }
      }
    };

    window.addEventListener('keyup', keyupFn);

    return () => window.removeEventListener('keyup', keyupFn);
  }, [command, hidePrompt, next, prev, promptVisible, run]);

  useEffect(() => {
    if (!CONSOLE_MESSAGE_DISPLAYED) {
      // eslint-disable-next-line no-console
      console.info(
        `%c[${window.location.host}] Prefer a CLI? Press the tilde (~) key when focused on the website and type \`help\` for usage.`,
        'font-size: 16px; background-color: rgba(0,0,0,0.85); color: #00CC00; font-family: "Courier New", Courier, monospace;'
      );

      CONSOLE_MESSAGE_DISPLAYED = true;
    }
  }, []);

  return (
    promptVisible && (
      <div className={styles.wrapper}>
        {outputWindowVisible && (
          <textarea
            value={output}
            className={`${styles.outputWindow} ${styles.hackerman}`}
            ref={outputWindowRef}
            readOnly="readonly"
          />
        )}
        <input
          className={`${styles.caret} ${styles.hackerman}`}
          value=">"
          maxLength="1"
          readOnly="readonly"
        />
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className={`${styles.prompt} ${styles.hackerman}`}
          ref={promptRef}
          maxLength="75"
          autoComplete="off"
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        />
        <button
          type="button"
          aria-label="Toggle prompt output window"
          className={`${styles.outputWindowBtn} ${styles.hackerman}`}
          onClick={() => run({ cmd: 'toggle', recordHistory: false })}
          dangerouslySetInnerHTML={{ __html: ARROWS[arrowDirection] }} // eslint-disable-line react/no-danger
        />
      </div>
    )
  );
};

Prompt.propTypes = {
  theme: themePropTypes.isRequired,
};

export default Prompt;