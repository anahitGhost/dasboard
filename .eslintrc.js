module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    babelOptions: {
      presets: [
        '@babel/preset-react',
      ],
    },
    requireConfigFile: false,
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/destructuring-assignment': [0, 'always', { ignoreClassFields: true }],
    'no-use-before-define': ['error', { functions: false, variables: false, classes: false }],
    'react/prefer-stateless-function': [0],
    'react/function-component-definition': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': [1, {
      forbid: [],
      checkContextTypes: true,
      checkChildContextTypes: true,
    }],
    'global-require': 0,
    'no-param-reassign': [2, { props: false }],
    'no-underscore-dangle': [0],
    radix: [0],
    'react/static-property-placement': [0],
    'react/jsx-props-no-spreading': [0],
    'jsx-a11y/label-has-associated-control': [1, {
      labelComponents: ['CustomLabel'],
      labelAttributes: ['inputLabel'],
      controlComponents: ['CustomInput'],
      assert: 'both',
      depth: 3,
    }],
    'max-len': ['error', { code: 120 }],
  },
};
