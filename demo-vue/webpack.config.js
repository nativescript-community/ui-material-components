const { join, relative, resolve, sep } = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require('nativescript-vue-template-compiler');

const nsWebpack = require('nativescript-dev-webpack');
const nativescriptTarget = require('nativescript-dev-webpack/nativescript-target');
const { NativeScriptWorkerPlugin } = require('nativescript-worker-loader/NativeScriptWorkerPlugin');
const hashSalt = Date.now().toString();

// temporary hack to support v-model using ns-vue-template-compiler
// See https://github.com/nativescript-vue/nativescript-vue/issues/371
NsVueTemplateCompiler.registerElement('MDTextField', () => require('nativescript-material-textfield').TextField, {
    model: {
        prop: 'text',
        event: 'textChange'
    }
});
NsVueTemplateCompiler.registerElement('MDTextView', () => require('nativescript-material-textview').TextField, {
    model: {
        prop: 'text',
        event: 'textChange'
    }
});
NsVueTemplateCompiler.registerElement('MDSlider', () => require('nativescript-material-slider').Slider, {
    model: {
        prop: 'value',
        event: 'valueChange'
    }
});

module.exports = env => {
    // Add your custom Activities, Services and other android app components here.
    const appComponents = env.appComponents || [];
    appComponents.push(...['tns-core-modules/ui/frame', 'tns-core-modules/ui/frame/activity']);

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
        development // --env.development
    } = env;

    const useLibs = compileSnapshot;
    const isAnySourceMapEnabled = !!sourceMap || !!hiddenSourceMap;
    const externals = nsWebpack.getConvertedExternals(env.externals);

    const mode = production ? 'production' : 'development';

    const appFullPath = resolve(projectRoot, appPath);
    const hasRootLevelScopedModules = nsWebpack.hasRootLevelScopedModules({ projectDir: projectRoot });
    let coreModulesPackageName = 'tns-core-modules';
    let alias = env.alias || {};
    alias['~'] = appFullPath;
    alias['@'] = appFullPath;
    alias['vue'] = 'nativescript-vue';
    alias['nativescript-vue'] = 'nativescript-akylas-vue';

    if (hasRootLevelScopedModules) {
        coreModulesPackageName = '@nativescript/core';
        alias['tns-core-modules'] = coreModulesPackageName;
    }

    if (!!development) {
        const srcFullPath = resolve(projectRoot, '..', 'src');
        alias = Object.assign(alias, {
            '#': srcFullPath,
            'nativescript-material-core$': '#/core/core.' + platform,
            'nativescript-material-core/core': '#/core/core.' + platform,
            'nativescript-material-core/android/utils$': '#/core/android/utils',
            'nativescript-material-core/cssproperties$': '#/core/cssproperties',
            'nativescript-material-core/textbase/cssproperties$': '#/core/textbase/cssproperties',

            'nativescript-material-bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,
            'nativescript-material-bottomsheet/vue$': '#/bottomsheet/vue/index',
            'nativescript-material-bottomsheet/bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,
            '../bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,

            'nativescript-material-bottomnavigationbar$': '#/bottomnavigationbar/bottomnavigationbar.' + platform,
            'nativescript-material-bottomnavigationbar/vue$': '#/bottomnavigationbar/vue/index',
            'nativescript-material-bottomnavigationbar/bottomnavigationbar$': '#/bottomnavigationbar/bottomnavigationbar.' + platform,
            '../bottomnavigationbar$': '#/bottomnavigationbar/bottomnavigationbar.' + platform,

            'nativescript-material-progress$': '#/progress/progress.' + platform,
            'nativescript-material-progress/vue$': '#/progress/vue/index',
            'nativescript-material-progress/progress$': '#/progress/progress.' + platform,
            '../progress$': '#/progress/progress.' + platform,

            'nativescript-material-cardview$': '#/cardview/cardview.' + platform,
            'nativescript-material-cardview/vue$': '#/cardview/vue/index',
            'nativescript-material-cardview/cardview$': '#/cardview/cardview.' + platform,
            '../cardview$': '#/cardview/cardview.' + platform,

            'nativescript-material-slider$': '#/slider/slider.' + platform,
            'nativescript-material-slider/vue$': '#/slider/vue/index',
            'nativescript-material-slider/slider$': '#/slider/slider.' + platform,
            '../slider$': '#/slider/slider.' + platform,

            'nativescript-material-button$': '#/button/button.' + platform,
            'nativescript-material-button/vue$': '#/button/vue/index',
            'nativescript-material-button/button$': '#/button/button.' + platform,
            '../button$': '#/button/button.' + platform,

            'nativescript-material-textfield$': '#/textfield/textfield',
            'nativescript-material-textfield': '#/textfield',
            // 'nativescript-material-textfield/textfield$': '#/textfield/textfield.' + platform,
            // 'nativescript-material-textfield/textfield_cssproperties$': '#/textfield/textfield_cssproperties',
            // 'nativescript-material-textfield/vue$': '#/textfield/vue/index',
            // '../textfield$': '#/textfield/textfield.' + platform,

            'nativescript-material-textview$': '#/textview/textview',
            'nativescript-material-textview': '#/textview',
            // 'nativescript-material-textview/textview$': '#/textview/textview.' + platform,
            // 'nativescript-material-textview/textview_cssproperties$': '#/textview/textview_cssproperties',
            // 'nativescript-material-textview/vue$': '#/textview/vue/index',
            // '../textfield$': '#/textview/textview.' + platform,

            'nativescript-material-floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,
            'nativescript-material-floatingactionbutton/vue$': '#/floatingactionbutton/vue/index',
            'nativescript-material-floatingactionbutton/floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,
            '../floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,

            'nativescript-material-activityindicator$': '#/activityindicator/activityindicator.' + platform,
            'nativescript-material-activityindicator/vue$': '#/activityindicator/vue/index',
            'nativescript-material-activityindicator/activityindicator$': '#/activityindicator/activityindicator.' + platform,
            '../activityindicator$': '#/activityindicator/activityindicator.' + platform,

            'nativescript-material-ripple$': '#/ripple/ripple.' + platform,
            'nativescript-material-ripple/vue$': '#/ripple/vue/index',
            'nativescript-material-ripple/ripple$': '#/ripple/ripple.' + platform,
            '../ripple$': '#/ripple/ripple.' + platform,

            'nativescript-material-dialogs$': '#/dialogs/dialogs.' + platform,
            'nativescript-material-dialogs/dialogs$': '#/dialogs/dialogs.' + platform,

            'nativescript-material-snackbar$': '#/snackbar/snackbar.' + platform,
            'nativescript-material-snackbar/snackbar$': '#/snackbar/snackbar.' + platform,
            './snackbar$': '#/snackbar/snackbar.' + platform
        });
    }

    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath, platform);
    const entryPath = `.${sep}${entryModule}`;
    const entries = env.entries || {};
    entries.bundle = entryPath;

    const areCoreModulesExternal = Array.isArray(env.externals) && env.externals.some(e => e.indexOf('tns-core-modules') > -1);
    if (platform === 'ios' && !areCoreModulesExternal) {
        entries['tns_modules/tns-core-modules/inspector_modules'] = 'inspector_modules';
    }
    console.log(`Bundling application for entryPath ${entryPath}...`);

    let sourceMapFilename = nsWebpack.getSourceMapFilename(hiddenSourceMap, __dirname, dist);

    const itemsToClean = [`${dist}/**/*`];
    if (platform === 'android') {
        itemsToClean.push(`${join(projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'assets', 'snapshots')}`);
        itemsToClean.push(`${join(projectRoot, 'platforms', 'android', 'app', 'build', 'configurations', 'nativescript-android-snapshot')}`);
    }

    nsWebpack.processAppComponents(appComponents, platform);
    const config = {
        mode: mode,
        context: appFullPath,
        externals,
        watchOptions: {
            ignored: [
                appResourcesFullPath,
                // Don't watch hidden files
                '**/.*'
            ]
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
            hashSalt
        },
        resolve: {
            extensions: ['.vue', '.ts', '.js', '.scss', '.css'],
            // Resolve {N} system modules from tns-core-modules
            modules: [resolve(__dirname, `node_modules/${coreModulesPackageName}`), resolve(__dirname, 'node_modules'), `node_modules/${coreModulesPackageName}`, 'node_modules'],
            alias,
            // resolve symlinks to symlinked modules
            symlinks: true
        },
        resolveLoader: {
            // don't resolve symlinks to symlinked loaders
            symlinks: false
        },
        node: {
            // Disable node shims that conflict with NativeScript
            http: false,
            timers: false,
            setImmediate: false,
            fs: 'empty',
            __dirname: false
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
                        test: module => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName) || appComponents.some(comp => comp === moduleName);
                        },
                        enforce: true
                    }
                }
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
                            semicolons: !isAnySourceMapEnabled
                        },
                        compress: {
                            // The Android SBG has problems parsing the output
                            // when these options are enabled
                            collapse_vars: platform !== 'android',
                            sequences: platform !== 'android'
                        },
                        keep_fnames: true
                    }
                })
            ]
        },
        module: {
            rules: [
                {
                    include: [join(appFullPath, entryPath + '.js'), join(appFullPath, entryPath + '.ts')],
                    use: [
                        // Require all Android app components
                        platform === 'android' && {
                            loader: 'nativescript-dev-webpack/android-app-components-loader',
                            options: { modules: appComponents }
                        },

                        {
                            loader: 'nativescript-dev-webpack/bundle-config-loader',
                            options: {
                                registerPages: true, // applicable only for non-angular apps
                                loadCss: !snapshot, // load the application css if in debug mode
                                unitTesting,
                                appFullPath,
                                projectRoot,
                                ignoredFiles: nsWebpack.getUserDefinedEntries(entries, platform)
                            }
                        }
                    ].filter(loader => Boolean(loader))
                },
                {
                    test: /[\/|\\]app\.css$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        {
                            loader: 'nativescript-dev-webpack/css2json-loader',
                            options: { useForImports: true }
                        }
                    ]
                },
                {
                    test: /[\/|\\]app\.scss$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        {
                            loader: 'nativescript-dev-webpack/css2json-loader',
                            options: { useForImports: true }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    exclude: /[\/|\\]app\.css$/,
                    use: ['nativescript-dev-webpack/style-hot-loader', 'nativescript-dev-webpack/apply-css-loader.js', { loader: 'css-loader', options: { url: false } }]
                },
                {
                    test: /\.scss$/,
                    exclude: /[\/|\\]app\.scss$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        { loader: 'css-loader', options: { url: false } },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        allowTsInNodeModules: true,
                        transpileOnly: true,
                        compilerOptions: {
                            declaration: false
                        }
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        compiler: NsVueTemplateCompiler
                    }
                }
            ]
        },
        plugins: [
            // ... Vue Loader plugin omitted
            // make sure to include the plugin!
            new VueLoaderPlugin(),
            // Define useful constants like TNS_WEBPACK
            new webpack.DefinePlugin({
                'global.TNS_WEBPACK': 'true',
                TNS_ENV: JSON.stringify(mode),
                process: 'global.process'
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin({ verbose: !!verbose, cleanOnceBeforeBuildPatterns: itemsToClean }),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([{ from: { glob: 'fonts/**' } }, { from: { glob: '**/*.+(jpg|png)' } }, { from: { glob: 'assets/**/*' } }], {
                ignore: [`${relative(appPath, appResourcesFullPath)}/**`]
            }),
            new nsWebpack.GenerateNativeScriptEntryPointsPlugin('bundle'),
            // For instructions on how to set up workers with webpack
            // check out https://github.com/nativescript/worker-loader
            new NativeScriptWorkerPlugin(),
            new nsWebpack.PlatformFSPlugin({
                platform,
                platforms
            }),
            // Does IPC communication with the {N} CLI to notify events when running in watch mode.
            new nsWebpack.WatchStateLoggerPlugin()
        ]
    };

    if (development) {
        config.plugins.push(new webpack.ContextReplacementPlugin(/nativescript-barcodescanner/, resolve(projectRoot, '..', 'src')));
    }

    if (unitTesting) {
        config.module.rules.push(
            {
                test: /-page\.js$/,
                use: 'nativescript-dev-webpack/script-hot-loader'
            },
            {
                test: /\.(html|xml)$/,
                use: 'nativescript-dev-webpack/markup-hot-loader'
            },

            { test: /\.(html|xml)$/, use: 'nativescript-dev-webpack/xml-namespace-loader' }
        );
    }

    if (report) {
        // Generate report files for bundles content
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                generateStatsFile: true,
                reportFilename: resolve(projectRoot, 'report', `report.html`),
                statsFilename: resolve(projectRoot, 'report', `stats.json`)
            })
        );
    }

    if (snapshot) {
        config.plugins.push(
            new nsWebpack.NativeScriptSnapshotPlugin({
                chunk: 'vendor',
                requireModules: ['tns-core-modules/bundle-entry-points'],
                projectRoot,
                webpackConfig: config,
                snapshotInDocker,
                skipSnapshotTools,
                useLibs
            })
        );
    }

    if (hmr) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return config;
};
