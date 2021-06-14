const { productName } = require('./package.json')

module.exports = {
    productName,   
    appId: "onepass",
    productName: "One Pass",
    copyright: "Copyright © 2021 Santosh Bhandari",
    files: [
        'src/main/**/*',
        'src/render/dist/**/*',
        'node_modules/**/*',
        'package.json'
    ],
    extraMetadata: {
        main: "src/main/index.js",
    },
    mac: {
        category: "public.app-category.utilities",
        target: "dmg"
    },
    win: {
        target: "nsis"
    },
    linux: {
        target: "AppImage",
        category: "Utility"
    },
    nsis: {
        oneClick: false
    }
}