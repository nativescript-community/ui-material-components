const webpackConfig = require('./webpack.config.js');
const { readFileSync } = require('fs');
const { relative, resolve } = require('path');
const nsWebpack = require('@nativescript/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NsVueTemplateCompiler = require('nativescript-vue-template-compiler');

// temporary hack to support v-model using ns-vue-template-compiler
// See https://github.com/nativescript-vue/nativescript-vue/issues/371
NsVueTemplateCompiler.registerElement('MDTextField', () => require('@nativescript-community/ui-material-textfield').TextField, {
    model: {
        prop: 'text',
        event: 'textChange'
    }
});
NsVueTemplateCompiler.registerElement('MDTextView', () => require('@nativescript-community/ui-material-textview').TextField, {
    model: {
        prop: 'text',
        event: 'textChange'
    }
});
NsVueTemplateCompiler.registerElement('MDSlider', () => require('@nativescript-community/ui-material-slider').Slider, {
    model: {
        prop: 'value',
        event: 'valueChange'
    }
});
module.exports = (env, params = {}) => {
    const {
        appPath = 'app',
        appResourcesPath = 'app/App_Resources',
        hmr, // --env.hmr
        production, // --env.production
        sourceMap, // --env.sourceMap
        hiddenSourceMap, // --env.hiddenSourceMap
        inlineSourceMap, // --env.inlineSourceMap
        development, // --env.development
        verbose, // --env.verbose
        uglify // --env.uglify
    } = env;
    const config = webpackConfig(env, params);
    const mode = production ? 'production' : 'development';
    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
    const tsconfig = 'tsconfig.json';
    const projectRoot = params.projectRoot || __dirname;
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    if (!!development) {
        const srcFullPath = resolve(projectRoot, '..', 'src');
        Object.assign(config.resolve.alias, {
            '#': srcFullPath,
            '@nativescript-community/ui-material-core$': '#/core/index.' + platform,
            '@nativescript-community/ui-material-core/android/utils$': '#/core/android/utils',
            '@nativescript-community/ui-material-core/cssproperties$': '#/core/cssproperties',
            '@nativescript-community/ui-material-core/textbase/cssproperties$': '#/core/textbase/cssproperties',

            '@nativescript-community/ui-material-bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,
            '@nativescript-community/ui-material-bottomsheet/vue$': '#/bottomsheet/vue/index',
            '@nativescript-community/ui-material-bottomsheet/bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,
            '../bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,

            '@nativescript-community/ui-material-bottomnavigationbar$': '#/bottomnavigationbar/bottomnavigationbar.' + platform,
            '@nativescript-community/ui-material-bottomnavigationbar/vue$': '#/bottomnavigationbar/vue/index',
            '@nativescript-community/ui-material-bottomnavigationbar/bottomnavigationbar$': '#/bottomnavigationbar/bottomnavigationbar.' + platform,
            '../bottomnavigationbar$': '#/bottomnavigationbar/bottomnavigationbar.' + platform,

            '@nativescript-community/ui-material-progress$': '#/progress/progress.' + platform,
            '@nativescript-community/ui-material-progress/vue$': '#/progress/vue/index',
            '@nativescript-community/ui-material-progress/progress$': '#/progress/progress.' + platform,
            '../progress$': '#/progress/progress.' + platform,

            '@nativescript-community/ui-material-cardview$': '#/cardview/cardview.' + platform,
            '@nativescript-community/ui-material-cardview/vue$': '#/cardview/vue/index',
            '@nativescript-community/ui-material-cardview/cardview$': '#/cardview/cardview.' + platform,
            '../cardview$': '#/cardview/cardview.' + platform,

            '@nativescript-community/ui-material-slider$': '#/slider/slider.' + platform,
            '@nativescript-community/ui-material-slider/vue$': '#/slider/vue/index',
            '@nativescript-community/ui-material-slider/slider$': '#/slider/slider.' + platform,
            '../slider$': '#/slider/slider.' + platform,

            '@nativescript-community/ui-material-button$': '#/button/button.' + platform,
            '@nativescript-community/ui-material-button/vue$': '#/button/vue/index',
            '@nativescript-community/ui-material-button/button$': '#/button/button.' + platform,
            '../button$': '#/button/button.' + platform,

            '@nativescript-community/ui-material-speeddial$': '#/speeddial/index',
            '@nativescript-community/ui-material-speeddial/vue$': '#/speeddial/vue/index',

            '@nativescript-community/ui-material-tabs$': '#/tabs/tabs.' + platform,
            '@nativescript-community/ui-material-tabs/vue$': '#/tabs/vue/index',
            '@nativescript-community/ui-material-tabs/tabs$': '#/tabs/button.' + platform,
            '../tabs$': '#/tabs/tabs.' + platform,

            '@nativescript-community/ui-material-textfield$': '#/textfield/textfield',
            '@nativescript-community/ui-material-textfield': '#/textfield',

            '@nativescript-community/ui-material-textview$': '#/textview/textview',
            '@nativescript-community/ui-material-textview': '#/textview',

            '@nativescript-community/ui-material-floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,
            '@nativescript-community/ui-material-floatingactionbutton/vue$': '#/floatingactionbutton/vue/index',
            '@nativescript-community/ui-material-floatingactionbutton/floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,
            '../floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,

            '@nativescript-community/ui-material-activityindicator$': '#/activityindicator/index.' + platform,
            '@nativescript-community/ui-material-activityindicator/vue$': '#/activityindicator/vue/index',
            '@nativescript-community/ui-material-activityindicator/activityindicator$': '#/activityindicator/index.' + platform,
            '../activityindicator$': '#/activityindicator/index.' + platform,

            '@nativescript-community/ui-material-ripple$': '#/ripple/ripple.' + platform,
            '@nativescript-community/ui-material-ripple/vue$': '#/ripple/vue/index',
            '@nativescript-community/ui-material-ripple/ripple$': '#/ripple/ripple.' + platform,
            '../ripple$': '#/ripple/ripple.' + platform,

            '@nativescript-community/ui-material-dialogs$': '#/dialogs/dialogs.' + platform,
            '@nativescript-community/ui-material-dialogs/dialogs$': '#/dialogs/dialogs.' + platform,

            '@nativescript-community/ui-material-snackbar$': '#/snackbar/snackbar.' + platform,
            '@nativescript-community/ui-material-snackbar/snackbar$': '#/snackbar/snackbar.' + platform,
            './snackbar$': '#/snackbar/snackbar.' + platform
        });
        console.log(config.resolve.alias);
    }
    const symbolsParser = require('scss-symbols-parser');
    const mdiSymbols = symbolsParser.parseSymbols(readFileSync(resolve(projectRoot, 'node_modules/@mdi/font/scss/_variables.scss')).toString());
    const mdiIcons = JSON.parse(`{${mdiSymbols.variables[mdiSymbols.variables.length - 1].value.replace(/" (F|0)(.*?)([,\n]|$)/g, '": "$1$2"$3')}}`);
    // const forecastSymbols = symbolsParser.parseSymbols(readFileSync(resolve(projectRoot, 'css/forecastfont.scss')).toString());
    // const forecastIcons = JSON.parse(`{${forecastSymbols.variables[forecastSymbols.variables.length - 1].value.replace(/'forecastfont-(\w+)' (F|f|0)(.*?)([,\n]|$)/g, '"$1": "$2$3"$4')}}`);

    // const weatherIconsCss = resolve(projectRoot, 'css/weather-icons/weather-icons-variables.scss');
    // const weatherSymbols = symbolsParser.parseSymbols(readFileSync(weatherIconsCss).toString()).imports.reduce(function (acc, value) {
    //     return acc.concat(symbolsParser.parseSymbols(readFileSync(resolve(dirname(weatherIconsCss), value.filepath)).toString()).variables);
    // }, []);
    // // console.log('weatherSymbols', weatherSymbols);
    // const weatherIcons = weatherSymbols.reduce(function (acc, value) {
    //     acc[value.name.slice(1)] = '\\u' + value.value.slice(2, -1);
    //     return acc;
    // }, {});
    const scssPrepend = `$mdi-fontFamily: ${platform === 'android' ? 'materialdesignicons-webfont' : 'Material Design Icons'};`;

    const scssLoaderRuleIndex = config.module.rules.findIndex((r) => r.test && r.test.toString().indexOf('scss') !== -1);
    config.module.rules.splice(
        scssLoaderRuleIndex,
        1,
        {
            test: /\.scss$/,
            exclude: /\.module\.scss$/,
            use: [
                {
                    loader: '@nativescript/webpack/dist/loaders/css2json-loader',
                    options: { useForImports: true }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false,
                        additionalData: scssPrepend
                    }
                }
            ]
        },
        {
            test: /\.module\.scss$/,
            use: [
                { loader: 'css-loader', options: { url: false } },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false,
                        additionalData: scssPrepend
                    }
                }
            ]
        }
    );

    config.module.rules.push({
        // rules to replace mdi icons and not use nativescript-font-icon
        test: /\.(ts|js|scss|css|vue)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'string-replace-loader',
                options: {
                    search: 'mdi-([a-z-]+)',
                    replace: (match, p1, offset, str) => {
                        if (mdiIcons[p1]) {
                            return String.fromCharCode(parseInt(mdiIcons[p1], 16));
                        }
                        return match;
                    },
                    flags: 'g'
                }
            }
        ]
    });

    // // we remove default rules
    config.plugins = config.plugins.filter((p) => ['CopyPlugin'].indexOf(p.constructor.name) === -1);
    // we add our rules
    const globOptions = { dot: false, ignore: [`**/${relative(appPath, appResourcesFullPath)}/**`] };
    const context = nsWebpack.Utils.platform.getEntryDirPath();
    const copyPatterns = [
        { context, from: 'fonts/!(ios|android)/**/*', to: 'fonts/[name][ext]', noErrorOnMissing: true, globOptions },
        { context, from: 'fonts/*', to: 'fonts/[name][ext]', noErrorOnMissing: true, globOptions },
        { context, from: `fonts/${platform}/**/*`, to: 'fonts/[name][ext]', noErrorOnMissing: true, globOptions },
        { context, from: '**/*.jpg', noErrorOnMissing: true, globOptions },
        { context, from: '**/*.png', noErrorOnMissing: true, globOptions },
        { context, from: 'assets/**/*', noErrorOnMissing: true, globOptions },
        {
            from: 'node_modules/@mdi/font/fonts/materialdesignicons-webfont.ttf',
            to: 'fonts',
            globOptions
        }
    ];
    config.plugins.unshift(new CopyWebpackPlugin({ patterns: copyPatterns }));

    if (!!production) {
        config.plugins.push(
            new ForkTsCheckerWebpackPlugin({
                tsconfig: resolve(tsconfig)
            })
        );
    }

    return config;
};
