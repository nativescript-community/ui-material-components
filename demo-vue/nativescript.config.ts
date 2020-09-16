import { NativeScriptConfig } from '@nativescript/core';

export default {
    id: 'org.nativescript.demovuematerial',
    appResourcesPath: 'app/App_Resources',
    android: {
        v8Flags: '--expose_gc',
        markingMode: 'none',
    },
    appPath: 'app',
    webpackConfigPath:'./app.webpack.config.js'
} as NativeScriptConfig;
