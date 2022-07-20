module.exports = {
  extends: ['universe/native', 'universe/shared/typescript-analysis', 'plugin:react/jsx-runtime'],
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
  ignorePatterns: ['node_modules', '.expo', 'dist'], // TODO: solve eslint paths for packages
  rules: {
    'import/namespace': 'off', // TODO: does not work on windows
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useFrameProcessor)',
      },
    ],
  },
};
