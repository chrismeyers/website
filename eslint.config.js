// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintReact from '@eslint-react/eslint-plugin';
import eslintReactKit, { merge } from '@eslint-react/kit';

export default defineConfig(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintReact.configs['recommended-typescript'],
  eslintReactKit().use(functionComponentDefinition).getConfig(),
  {
    rules: {
      // built in
      'no-param-reassign': ['error', { props: false }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-console': 'warn',
      'no-alert': 'warn',
      'no-debugger': 'error',
      'no-return-await': 'off',

      // @typescript-eslint
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['bin/**/*.js', 'bin/**/*.ts'],
    rules: {
      // built in
      'no-console': 'off',
    },
    languageOptions: {
      globals: globals.node,
    },
  }
);

/** @returns {import('@eslint-react/kit').RuleFunction} */
function functionComponentDefinition() {
  return (context, { collect, hint }) => {
    const { query, visitor } = collect.components(context, {
      hint:
        hint.component.Default &
        ~hint.component.DoNotIncludeFunctionDefinedAsObjectMethod,
    });
    return merge(visitor, {
      'Program:exit'(program) {
        for (const { node } of query.all(program)) {
          if (node.type === 'ArrowFunctionExpression') continue;
          context.report({
            node,
            message:
              'Function components must be defined with arrow functions.',
            suggest: [
              {
                desc: 'Convert to arrow function.',
                fix(fixer) {
                  const src = context.sourceCode;
                  if (node.generator) return null;
                  const prefix = node.async ? 'async ' : '';
                  const typeParams = node.typeParameters
                    ? src.getText(node.typeParameters)
                    : '';
                  const params = `(${node.params.map((p) => src.getText(p)).join(', ')})`;
                  const returnType = node.returnType
                    ? src.getText(node.returnType)
                    : '';
                  const body = src.getText(node.body);
                  // function Foo(params) { ... } -> const Foo = (params) => { ... };
                  if (node.type === 'FunctionDeclaration' && node.id) {
                    // dprint-ignore
                    return fixer.replaceText(
                      node,
                      `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`
                    );
                  }
                  // const Foo = function(params) { ... } -> const Foo = (params) => { ... }
                  if (
                    node.type === 'FunctionExpression' &&
                    node.parent.type === 'VariableDeclarator'
                  ) {
                    // dprint-ignore
                    return fixer.replaceText(
                      node,
                      `${prefix}${typeParams}${params}${returnType} => ${body}`
                    );
                  }
                  // { Foo(params) { ... } } -> { Foo: (params) => { ... } }
                  if (
                    node.type === 'FunctionExpression' &&
                    node.parent.type === 'Property'
                  ) {
                    // dprint-ignore
                    return fixer.replaceText(
                      node.parent,
                      `${src.getText(node.parent.key)}: ${prefix}${typeParams}${params}${returnType} => ${body}`
                    );
                  }
                  return null;
                },
              },
            ],
          });
        }
      },
    });
  };
}
