module.exports = {
  root: false,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'no-console': 'off',
    "singleQuote": 0,
    "quotes": 0,
    'semi': 0, // 关闭结尾分好检查
    "indent": ["off", 2], // 关闭空格检查
    "linebreak-style": [0, "error", "windows"], // windows上换行问题
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
