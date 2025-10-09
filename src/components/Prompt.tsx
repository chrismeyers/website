import { use, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { ThemeContext } from '../context/contexts.ts';
import styles from '../styles/Prompt.module.css';

let CONSOLE_MESSAGE_DISPLAYED = false;

const Prompt = () => {
  const { applyTheme } = use(ThemeContext);

  const [promptVisible, setPromptVisible] = useState(false);
  const [outputWindowVisible, setOutputWindowVisible] = useState(false);
  const [arrowDirection, setArrowDirection] = useState('up');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState('');
  const [command, setCommand] = useState('');

  const outputWindowRef = useRef<HTMLTextAreaElement>(null);
  const promptRef = useRef<HTMLInputElement>(null);

  const [location, setLocation] = useLocation();

  const ARROWS: Record<string, string> = {
    up: '&#9650;',
    down: '&#9660;',
  };

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

  const toggleOutputWindow = useCallback(
    () =>
      outputWindowVisible
        ? hideOutputWindow()
        : showOutputWindow({ bottom: true }),
    [outputWindowVisible, showOutputWindow]
  );

  const showPrompt = () => {
    setPromptVisible(true);
  };

  const hidePrompt = useCallback(() => {
    setPromptVisible(false);
    setHistoryIndex(-1);
    hideOutputWindow();
    setCommand('');
  }, []);

  const stdout = useCallback(
    (text: string) => {
      setOutput((prev) => `${prev}\n${text}`.trim());
      setTimeout(() => scrollOutputWindowToBottom(), 0);
    },
    [scrollOutputWindowToBottom]
  );

  const moveCursorToEnd = () => {
    if (promptRef.current) {
      promptRef.current.selectionStart = promptRef.current.value.length;
      promptRef.current.selectionEnd = promptRef.current.value.length;
    }
  };

  const prev = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((currentIndex) => {
        const newIndex = currentIndex + 1;
        setCommand(history[newIndex] ?? '');
        return newIndex;
      });
    }
    moveCursorToEnd();
  }, [history, historyIndex]);

  const next = useCallback(() => {
    if (historyIndex >= 0) {
      setHistoryIndex((currentIndex) => {
        const newIndex = currentIndex - 1;
        setCommand(history[newIndex] ?? '');
        return newIndex;
      });
    }
    moveCursorToEnd();
  }, [history, historyIndex]);

  const echo = useCallback(
    (args: string[]) => {
      stdout(args.join(' '));
      showOutputWindow({ bottom: true });
    },
    [showOutputWindow, stdout]
  );

  const cd = useCallback(
    (args: string[]) => {
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

      if (location === path) {
        return;
      }

      setLocation(path);
    },
    [location, setLocation]
  );

  const exit = useCallback(() => {
    hidePrompt();
  }, [hidePrompt]);

  const help = useCallback(() => {
    // prettier-ignore
    stdout(`Usage: command [arg1] [arg2] ...
  Available commands:
  echo   - prints args to the output window
  cd     - navigates to the given arg
  toggle - toggles the output window
  theme  - sets the website theme to the arg
           themes: light, dark
  clear  - clears the output window
  exit   - closes the command prompt
  help   - prints this message
  `);
    showOutputWindow({ bottom: true });
  }, [showOutputWindow, stdout]);

  const run = useCallback(
    ({ cmd = '', recordHistory = true }) => {
      if (cmd === '') return;

      if (recordHistory) {
        // Push to top of history stack
        setHistory((prevHistory: string[]) => [cmd, ...prevHistory]);
        stdout(`$ ${cmd}`);
      }

      const parts = cmd
        .split(' ')
        .filter((p) => p !== '')
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
          applyTheme(args[0]);
          break;
        case 'clear':
          setOutput('');
          break;
        case 'exit':
          exit();
          break;
        case 'help':
          help();
          break;
        default:
          stdout(`command not found: ${cleanedCommand}`);
          break;
      }

      setHistoryIndex(-1);
      setCommand('');
    },
    [applyTheme, cd, echo, exit, help, stdout, toggleOutputWindow]
  );

  useEffect(() => {
    const keyupFn = (e: KeyboardEvent) => {
      if (e.code === 'Backquote') {
        e.preventDefault(); // Prevents adding ` when opening the prompt
        showPrompt();
      } else if (e.code === 'Escape') {
        hidePrompt();
      } else if (e.code === 'Enter') {
        if (promptVisible) {
          run({ cmd: command });
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
            readOnly
          />
        )}
        <input
          className={`${styles.ps1} ${styles.hackerman}`}
          value="$"
          maxLength={1}
          readOnly
        />
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className={`${styles.prompt} ${styles.hackerman}`}
          ref={promptRef}
          maxLength={75}
          autoComplete="off"
          autoFocus
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

export default Prompt;
