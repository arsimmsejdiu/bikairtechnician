// eslint-disable-next-line no-undef
module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        ["module-resolver", {
            root: ["./src/"],
            alias: {
                "@assets": "./src/assets",
                "@components": "./src/components",
                "@containers": "./src/containers",
                "@hooks": "./src/hooks",
                "@i18n": "./src/i18n",
                "@models": "./src/models",
                "@permissions": "./src/permissions",
                "@redux": "./src/redux",
                "@screens": "./src/screens",
                "@services": "./src/services",
                "@stacks": "./src/stacks",
                "@styles": "./src/styles",
                "@utils": "./src/utils"
            },
        },
        ],
        [
            "react-native-reanimated/plugin",
            {
                globals: [],
            },
        ],
    ],
};
