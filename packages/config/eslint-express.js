module.exports = {
  extends: ['universe/node', 'universe/shared/typescript-analysis'],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  ignorePatterns: ['node_modules', 'patches', 'dist'],
  rules: {
    'import/namespace': 'off', // TODO: does not work on windows
  },
};
