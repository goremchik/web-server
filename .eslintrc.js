module.exports = {
    env: {
      commonjs: true,
      node: true,
      es6: true,
      jest: true,
    },
    extends: ["eslint:recommended"],
    globals: {},
    parser: "babel-eslint",
    ignorePatterns: ["node_modules/"],
};
