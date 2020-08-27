const { join, relative, resolve, sep } = require('path');
const { readFileSync } = require('fs');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require('nativescript-vue-template-compiler');

const nsWebpack = require('@nativescript/webpack');
const nativescriptTarget = require('@nativescript/webpack/nativescript-target');
const { NativeScriptWorkerPlugin } = require('nativescript-worker-loader/NativeScriptWorkerPlugin');
const hashSalt = Date.now().toString();

// temporary hack to support v-model using ns-vue-template-compiler
// See https://github.com/nativescript-vue/nativescript-vue/issues/371
NsVueTemplateCompiler.registerElement('MDTextField', () => require('@nativescript-community/ui-material-textfield').TextField, {
    model: {
        prop: 'text',
        event: 'textChange',
    },
});
NsVueTemplateCompiler.registerElement('MDTextView', () => require('@nativescript-community/ui-material-textview').TextField, {
    model: {
        prop: 'text',
        event: 'textChange',
    },
});
NsVueTemplateCompiler.registerElement('MDSlider', () => require('@nativescript-community/ui-material-slider').Slider, {
    model: {
        prop: 'value',
        event: 'valueChange',
    },
});

module.exports = (env) => {
    // Add your custom Activities, Services and other android app components here.
    const appComponents = env.appComponents || [];
    appComponents.push(...['@nativescript/core/ui/frame', '@nativescript/core/ui/frame/activity']);

    const platform = env && ((env.android && 'android') || (env.ios && 'ios') || env.platform);
    if (!platform) {
        throw new Error('You need to provide a target platform!');
    }

    const platforms = ['ios', 'android'];
    const projectRoot = __dirname;

    if (env.platform) {
        platforms.push(env.platform);
    }

    // Default destination inside platforms/<platform>/...
    const dist = resolve(projectRoot, nsWebpack.getAppPath(platform, projectRoot));

    const {
        // The 'appPath' and 'appResourcesPath' values are fetched from
        // the nsconfig.json configuration file.
        appPath = 'app',
        appResourcesPath = 'app/App_Resources',

        // You can provide the following flags when running 'tns run android|ios'
        snapshot, // --env.snapshot
        production, // --env.production
        report, // --env.report
        hmr, // --env.hmr
        sourceMap, // --env.sourceMap
        hiddenSourceMap, // --env.hiddenSourceMap
        unitTesting, // --env.unitTesting
        verbose, // --env.verbose
        snapshotInDocker, // --env.snapshotInDocker
        skipSnapshotTools, // --env.skipSnapshotTools
        compileSnapshot, // --env.compileSnapshot
        development, // --env.development
    } = env;

    const useLibs = compileSnapshot;
    const isAnySourceMapEnabled = !!sourceMap || !!hiddenSourceMap;
    const externals = nsWebpack.getConvertedExternals(env.externals);

    const mode = production ? 'production' : 'development';

    const appFullPath = resolve(projectRoot, appPath);
    const hasRootLevelScopedModules = nsWebpack.hasRootLevelScopedModules({ projectDir: projectRoot });
    let coreModulesPackageName = 'tns-core-modules';
    let alias = env.alias || {};
    alias['~/package.json'] = resolve(projectRoot, 'package.json');
    alias['~'] = appFullPath;
    alias['@'] = appFullPath;
    alias['vue'] = 'nativescript-vue';

    if (hasRootLevelScopedModules) {
        coreModulesPackageName = '@nativescript/core';
        alias['tns-core-modules'] = coreModulesPackageName;
    }

    if (!!development) {
        const srcFullPath = resolve(projectRoot, '..', 'src');
        alias = Object.assign(alias, {
            '#': srcFullPath,
            '@nativescript-community/ui-material-core$': '#/core/core.' + platform,
            '@nativescript-community/ui-material-core': '#/core/core.' + platform,
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

            '@nativescript-community/ui-material-tabs$': '#/tabs/tabs.' + platform,
            '@nativescript-community/ui-material-tabs/vue$': '#/tabs/vue/index',
            '@nativescript-community/ui-material-tabs/tabs$': '#/tabs/button.' + platform,
            '../tabs$': '#/tabs/tabs.' + platform,

            '@nativescript-community/ui-material-textfield$': '#/textfield/textfield',
            '@nativescript-community/ui-material-textfield': '#/textfield',
            // '@nativescript-community/ui-material-textfield/textfield$': '#/textfield/textfield.' + platform,
            // '@nativescript-community/ui-material-textfield/textfield_cssproperties$': '#/textfield/textfield_cssproperties',
            // '@nativescript-community/ui-material-textfield/vue$': '#/textfield/vue/index',
            // '../textfield$': '#/textfield/textfield.' + platform,

            '@nativescript-community/ui-material-textview$': '#/textview/textview',
            '@nativescript-community/ui-material-textview': '#/textview',
            // '@nativescript-community/ui-material-textview/textview$': '#/textview/textview.' + platform,
            // '@nativescript-community/ui-material-textview/textview_cssproperties$': '#/textview/textview_cssproperties',
            // '@nativescript-community/ui-material-textview/vue$': '#/textview/vue/index',
            // '../textfield$': '#/textview/textview.' + platform,

            '@nativescript-community/ui-material-floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,
            '@nativescript-community/ui-material-floatingactionbutton/vue$': '#/floatingactionbutton/vue/index',
            '@nativescript-community/ui-material-floatingactionbutton/floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,
            '../floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,

            '@nativescript-community/ui-material-activityindicator$': '#/activityindicator/activityindicator.' + platform,
            '@nativescript-community/ui-material-activityindicator/vue$': '#/activityindicator/vue/index',
            '@nativescript-community/ui-material-activityindicator/activityindicator$': '#/activityindicator/activityindicator.' + platform,
            '../activityindicator$': '#/activityindicator/activityindicator.' + platform,

            '@nativescript-community/ui-material-ripple$': '#/ripple/ripple.' + platform,
            '@nativescript-community/ui-material-ripple/vue$': '#/ripple/vue/index',
            '@nativescript-community/ui-material-ripple/ripple$': '#/ripple/ripple.' + platform,
            '../ripple$': '#/ripple/ripple.' + platform,

            '@nativescript-community/ui-material-dialogs$': '#/dialogs/dialogs.' + platform,
            '@nativescript-community/ui-material-dialogs/dialogs$': '#/dialogs/dialogs.' + platform,

            '@nativescript-community/ui-material-snackbar$': '#/snackbar/snackbar.' + platform,
            '@nativescript-community/ui-material-snackbar/snackbar$': '#/snackbar/snackbar.' + platform,
            './snackbar$': '#/snackbar/snackbar.' + platform,
        });
    }

    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath, platform);
    const entryPath = `.${sep}${entryModule}`;
    const entries = env.entries || {};
    entries.bundle = entryPath;

    const areCoreModulesExternal = Array.isArray(env.externals) && env.externals.some((e) => e.indexOf('tns-core-modules') > -1);
    if (platform === 'ios' && !areCoreModulesExternal) {
        entries['tns_modules/@nativescript/core/inspector_modules'] = 'inspector_modules';
    }
    console.log('alias',alias);
    console.log(`Bundling application for entryPath ${entryPath}...`);

    const sourceMapFilename = nsWebpack.getSourceMapFilename(hiddenSourceMap, __dirname, dist);

    const itemsToClean = [`${dist}/**/*`];
    if (platform === 'android') {
        itemsToClean.push(`${join(projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'assets', 'snapshots')}`);
        itemsToClean.push(`${join(projectRoot, 'platforms', 'android', 'app', 'build', 'configurations', 'nativescript-android-snapshot')}`);
    }

    const symbolsParser = require('scss-symbols-parser');
    const mdiSymbols = symbolsParser.parseSymbols(readFileSync(resolve(projectRoot, 'node_modules/@mdi/font/scss/_variables.scss')).toString());
    const mdiIcons = JSON.parse(`{${mdiSymbols.variables[mdiSymbols.variables.length - 1].value.replace(/" (F|0)(.*?)([,\n]|$)/g, '": "$1$2"$3')}}`);

    nsWebpack.processAppComponents(appComponents, platform);
    const config = {
        mode,
        context: appFullPath,
        externals,
        watchOptions: {
            ignored: [
                appResourcesFullPath,
                // Don't watch hidden files
                '**/.*',
            ],
        },
        target: nativescriptTarget,
        // target: nativeScriptVueTarget,
        entry: entries,
        output: {
            pathinfo: false,
            path: dist,
            sourceMapFilename,
            libraryTarget: 'commonjs2',
            filename: '[name].js',
            globalObject: 'global',
            hashSalt,
        },
        resolve: {
            extensions: ['.vue', '.ts', '.js', '.scss', '.css'],
            // Resolve {N} system modules from tns-core-modules
            modules: [resolve(__dirname, `node_modules/${coreModulesPackageName}`), resolve(__dirname, 'node_modules'), `node_modules/${coreModulesPackageName}`, 'node_modules'],
            alias,
            // resolve symlinks to symlinked modules
            symlinks: true,
        },
        resolveLoader: {
            // don't resolve symlinks to symlinked loaders
            symlinks: false,
        },
        node: {
            // Disable node shims that conflict with NativeScript
            http: false,
            timers: false,
            setImmediate: false,
            fs: 'empty',
            __dirname: false,
        },
        devtool: hiddenSourceMap ? 'hidden-source-map' : sourceMap ? 'inline-source-map' : 'none',
        optimization: {
            runtimeChunk: 'single',
            noEmitOnErrors: true,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: (module) => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName) || appComponents.some((comp) => comp === moduleName);
                        },
                        enforce: true,
                    },
                },
            },
            minimize: Boolean(production),
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    cache: true,
                    sourceMap: isAnySourceMapEnabled,
                    terserOptions: {
                        output: {
                            comments: false,
                            semicolons: !isAnySourceMapEnabled,
                        },
                        compress: {
                            // The Android SBG has problems parsing the output
                            // when these options are enabled
                            collapse_vars: platform !== 'android',
                            sequences: platform !== 'android',
                        },
                        keep_fnames: true,
                    },
                }),
            ],
        },
        module: {
            rules: [
                {
                    include: [join(appFullPath, entryPath + '.js'), join(appFullPath, entryPath + '.ts')],
                    use: [
                        // Require all Android app components
                        platform === 'android' && {
                            loader: '@nativescript/webpack/helpers/android-app-components-loader',
                            options: { modules: appComponents },
                        },

                        {
                            loader: '@nativescript/webpack/bundle-config-loader',
                            options: {
                                registerPages: true, // applicable only for non-angular apps
                                loadCss: !snapshot, // load the application css if in debug mode
                                unitTesting,
                                appFullPath,
                                projectRoot,
                                ignoredFiles: nsWebpack.getUserDefinedEntries(entries, platform),
                            },
                        },
                    ].filter((loader) => Boolean(loader)),
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        compiler: NsVueTemplateCompiler,
                    },
                },
                {
                    // rules to replace mdi icons and not use nativescript-font-icon
                    test: /\.(ts|js|css|vue)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search: 'mdi-([a-z-]+)',
                                replace: (match, p1, offset, str) => {
                                    if (mdiIcons[p1]) {
                                        console.log('replace mdi icon', p1, mdiIcons[p1], String.fromCharCode(parseInt(mdiIcons[p1], 16)));
                                        return String.fromCharCode(parseInt(mdiIcons[p1], 16));
                                    }
                                    return match;
                                },
                                flags: 'g',
                            },
                        },
                    ],
                },
                {
                    test: /[\/|\\]app\.css$/,
                    use: [
                        '@nativescript/webpack/helpers/style-hot-loader',
                        {
                            loader: '@nativescript/webpack/helpers/css2json-loader',
                            options: { useForImports: true },
                        },
                    ],
                },
                {
                    test: /[\/|\\]app\.scss$/,
                    use: [
                        '@nativescript/webpack/helpers/style-hot-loader',
                        {
                            loader: '@nativescript/webpack/helpers/css2json-loader',
                            options: { useForImports: true },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    exclude: /[\/|\\]app\.css$/,
                    use: ['@nativescript/webpack/helpers/style-hot-loader', '@nativescript/webpack/helpers/apply-css-loader.js', { loader: 'css-loader', options: { url: false } }],
                },
                {
                    test: /\.scss$/,
                    exclude: /[\/|\\]app\.scss$/,
                    use: [
                        '@nativescript/webpack/helpers/style-hot-loader',
                        '@nativescript/webpack/helpers/apply-css-loader.js',
                        { loader: 'css-loader', options: { url: false } },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        allowTsInNodeModules: true,
                        transpileOnly: true,
                        compilerOptions: {
                            declaration: false,
                        },
                    },
                },
            ],
        },
        plugins: [
            // ... Vue Loader plugin omitted
            // make sure to include the plugin!
            new VueLoaderPlugin(),
            // Define useful constants like TNS_WEBPACK
            new webpack.DefinePlugin({
                'global.TNS_WEBPACK': 'true',
                TNS_ENV: JSON.stringify(mode),
                process: 'global.process',
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin({ verbose: !!verbose, cleanOnceBeforeBuildPatterns: itemsToClean }),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin(
                [
                    { from: { glob: 'fonts/**' } },
                    { from: { glob: '**/*.+(jpg|png)' } },
                    { from: { glob: 'assets/**/*' } },
                    {
                        from: resolve(__dirname, 'node_modules', '@mdi/font/fonts/materialdesignicons-webfont.ttf'),
                        to: 'fonts',
                    },
                ],
                {
                    ignore: [`${relative(appPath, appResourcesFullPath)}/**`],
                }
            ),
            new nsWebpack.GenerateNativeScriptEntryPointsPlugin('bundle'),
            // For instructions on how to set up workers with webpack
            // check out https://github.com/nativescript/worker-loader
            new NativeScriptWorkerPlugin(),
            new nsWebpack.PlatformFSPlugin({
                platform,
                platforms,
            }),
            // Does IPC communication with the {N} CLI to notify events when running in watch mode.
            new nsWebpack.WatchStateLoggerPlugin(),
        ],
    };

    if (development) {
        config.plugins.push(new webpack.ContextReplacementPlugin(/nativescript-barcodescanner/, resolve(projectRoot, '..', 'src')));
    }

    if (unitTesting) {
        config.module.rules.push(
            {
                test: /-page\.js$/,
                use: '@nativescript/webpack/helpers/script-hot-loader',
            },
            {
                test: /\.(html|xml)$/,
                use: '@nativescript/webpack/helpers/markup-hot-loader',
            },

            { test: /\.(html|xml)$/, use: '@nativescript/webpack/helpers/xml-namespace-loader' }
        );
    }

    if (report) {
        // Generate report files for bundles content
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                generateStatsFile: true,
                reportFilename: resolve(projectRoot, 'report', 'report.html'),
                statsFilename: resolve(projectRoot, 'report', 'stats.json'),
            })
        );
    }

    if (snapshot) {
        config.plugins.push(
            new nsWebpack.NativeScriptSnapshotPlugin({
                chunk: 'vendor',
                requireModules: ['@nativescript/core/bundle-entry-points'],
                projectRoot,
                webpackConfig: config,
                snapshotInDocker,
                skipSnapshotTools,
                useLibs,
            })
        );
    }

    if (hmr) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return config;
};
