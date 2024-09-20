import fs from 'node:fs';
import ts from 'typescript';
import prettier from 'prettier';
import prettierrc from '../../prettier.config.js';

if (process.argv.length < 4) {
  // eslint-disable-next-line no-console
  console.error('Usage: node prune-data.js dataPath generatedPath');
  process.exit(1);
}

const [, , dataPath, generatedPath] = process.argv;
const program = ts.createProgram([dataPath], { allowJs: true });
const sourceFile = program.getSourceFile(dataPath);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

const pruneInactiveData = (context) => (root) => {
  const visit = (node) => {
    const newNode = ts.visitEachChild(node, visit, context);

    if (ts.isObjectLiteralExpression(newNode)) {
      let keep = true;

      newNode.forEachChild((prop) => {
        if (ts.isPropertyAssignment(prop)) {
          if (
            prop.name.getText(sourceFile) === 'active' &&
            prop.initializer.kind === ts.SyntaxKind.FalseKeyword
          ) {
            keep = false;
            return;
          }
        }
      });

      return keep ? newNode : undefined;
    }

    return newNode;
  };

  return ts.visitNode(root, visit);
};

const result = ts.transform(sourceFile, [pruneInactiveData]);

const output = result.transformed.reduce(
  (acc, cur) =>
    acc + printer.printNode(ts.EmitHint.Unspecified, cur, sourceFile),
  ''
);

fs.writeFileSync(
  generatedPath,
  await prettier.format(
    `
      // WARNING: This file is generated, do not edit directly!
      // Edit the data source file and regenerate instead.

      ${output}
    `,
    { parser: 'typescript', ...prettierrc }
  )
);
