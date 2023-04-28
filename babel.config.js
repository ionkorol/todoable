module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            lib: "./src/lib",
            hooks: "./src/hooks",
            screens: "./src/screens",
            assets: "./src/assets",
            style: "./src/style",
            utils: "./src/utils",
            "redux-store": "./src/redux-store",
            navigation: "./src/navigation",
          },
        },
      ],
    ],
  };
};
