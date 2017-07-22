module.exports = {
  "extends": "eslint:recommended",
  "rules": {
    // enable additional rules
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "no-console": "off"
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "modules": true
    }
  },
  "globals": {
    "require": false
  }
};