const { join, relative, resolve, sep } = require('path');

const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require('akylas-nativescript-vue-template-compiler');

// temporary hack to support v-model using ns-vue-template-compiler
// See https://github.com/nativescript-vue/nativescript-vue/issues/371
NsVueTemplateCompiler.registerElement('MDTextField', () => require('~/nativescript-material-components/textfield').TextField, {
    model: {
        prop: 'text',
        event: 'textChange'
    }
});
NsVueTemplateCompiler.registerElement('MDSlider', () => require('~/nativescript-material-components/slider').Slider, {
    model: {
        prop: 'value',
        event: 'valueChange'
    }
});

const nsWebpack = require('nativescript-dev-webpack');
const nativescriptTarget = require('nativescript-dev-webpack/nativescript-target');
const { NativeScriptWorkerPlugin } = require('nativescript-worker-loader/NativeScriptWorkerPlugin');

module.exports = env => {
    // Add your custom Activities, Services and other android app components here.
    const appComponents = ['tns-core-modules/ui/frame', 'tns-core-modules/ui/frame/activity'];

    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
    if (!platform) {
        throw new Error('You need to provide a target platform!');
    }

    const platforms = ['ios', 'android'];
    const projectRoot = __dirname;

    // Default destination inside platforms/<platform>/...
    const dist = resolve(projectRoot, nsWebpack.getAppPath(platform, projectRoot));
    const appResourcesPlatformDir = platform === 'android' ? 'Android' : 'iOS';

    const {
        // The 'appPath' and 'appResourcesPath' values are fetched from
        // the nsconfig.json configuration file
        // when bundling with `tns run android|ios --bundle`.
        appPath = 'app',
        appResourcesPath = 'app/App_Resources',

        // You can provide the following flags when running 'tns run android|ios'
        development = false, // --env.development
        snapshot, // --env.snapshot
        uglify, // --env.uglify
        production, // --env.production
        report, // --env.report
        hmr, // --env.hmr
        sourceMap, // --env.sourceMap
        hiddenSourceMap, // --env.hiddenSourceMap
        unitTesting, // --env.unitTesting
        verbose // --env.verbose
    } = env;

    const isAnySourceMapEnabled = !!sourceMap || !!hiddenSourceMap;
    const externals = nsWebpack.getConvertedExternals(env.externals);

    const mode = production ? 'production' : 'development';

    const appFullPath = resolve(projectRoot, appPath);
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath, platform);
    const entryPath = `.${sep}${entryModule}`;
    const entries = { bundle: entryPath };
    const areCoreModulesExternal = Array.isArray(env.externals) && env.externals.some(e => e.indexOf('tns-core-modules') > -1);

    console.log(`Bundling application for entryPath ${entryPath}...`);

    const sourceMapFilename = nsWebpack.getSourceMapFilename(hiddenSourceMap, __dirname, dist);

    const tsconfig = 'tsconfig.json';

    const itemsToClean = [`${dist}/**/*`];
    if (platform === 'android') {
        itemsToClean.push(`${join(projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'assets', 'snapshots')}`);
        itemsToClean.push(`${join(projectRoot, 'platforms', 'android', 'app', 'build', 'configurations', 'nativescript-android-snapshot')}`);
    }

    let aliases = {
        '~': appFullPath,
        '@': appFullPath,
        'nativescript-vue': 'nativescript-akylas-vue',
        vue: 'nativescript-vue'
    };

    if (!!development) {
        const srcFullPath = resolve(projectRoot, '..', 'src');
        aliases = Object.assign(aliases, {
            '#': srcFullPath,
            'nativescript-material-core$': '#/core/core.' + platform,
            'nativescript-material-core/core': '#/core/core.' + platform,
            'nativescript-material-core/android/utils$': '#/core/android/utils',
            'nativescript-material-core/cssproperties$': '#/core/cssproperties',

            'nativescript-material-bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,
            'nativescript-material-bottomsheet/vue$': '#/bottomsheet/vue/index',
            'nativescript-material-bottomsheet/bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,
            '../bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,

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

            'nativescript-material-textfield$': '#/textfield/textfield.' + platform,
            'nativescript-material-textfield/textfield$': '#/textfield/textfield.' + platform,
            'nativescript-material-textfield/textfield_cssproperties$': '#/textfield/textfield_cssproperties',
            'nativescript-material-textfield/vue$': '#/textfield/vue/index',
            '../textfield$': '#/textfield/textfield.' + platform,

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
            './snackbar$': '#/snackbar/snackbar.' + platform,
        });

        console.log('alias', aliases);
    }

    const babelLoader = {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        targets: {
                            node: '8' // <--- this
                        }
                        // loose: true
                    }
                ]
            ],
            plugins: ['@babel/plugin-syntax-dynamic-import']
        }
    };

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
        entry: entries,

        output: {
            pathinfo: false,
            path: dist,
            sourceMapFilename,
            libraryTarget: 'commonjs2',
            filename: '[name].js',
            globalObject: 'global'
        },
        resolve: {
            extensions: ['.vue', '.tsx', '.ts', '.js', '.scss', '.css'],
            // Resolve {N} system modules from tns-core-modules
            modules: [resolve(__dirname, 'node_modules/tns-core-modules'), resolve(__dirname, 'node_modules'), 'node_modules/tns-core-modules', 'node_modules'],
            alias: aliases,
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
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: module => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return (
                                /[\\/]node_modules[\\/]/.test(moduleName) ||
                                /tns-core-modules/.test(moduleName) ||
                                appComponents.some(comp => comp === moduleName)
                            );
                        },
                        enforce: true
                    }
                }
            },
            minimize: uglify !== undefined ? uglify : production,
            minimizer: [
                new TerserPlugin(
                        {
                            parallel: true,
                            cache: true,
                            sourceMap: isAnySourceMapEnabled,
                            terserOptions: {
                                ecma: 6,
                                // warnings: true,
                                // toplevel: true,
                                output: {
                                    comments: false
                                    // semicolons: !isAnySourceMapEnabled
                                },
                                compress: {
                                    collapse_vars: platform !== 'android',
                                    sequences: platform !== 'android',
                                    passes: 2
                                },
                                keep_fnames: true
                            }
                        }
                )
            ]
        },
        module: {
            rules: [
                {
                    test: nsWebpack.getEntryPathRegExp(appFullPath, entryPath + '.(js|ts)'),
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
                                projectRoot
                            }
                        }
                    ].filter(loader => Boolean(loader))
                },
                {
                    test: /\.css$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        {
                            loader: 'css-loader',
                            options: { url: false }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        {
                            loader: 'css-loader',
                            options: { url: false }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    // exclude: /node_modules/,
                    use: [
                        babelLoader
                    ]
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        babelLoader,
                        {
                            loader: 'ts-loader',
                            options: {
                                // disable type checker - we will use it in fork plugin
                                transpileOnly: true,
                                configFile: resolve(tsconfig),
                                appendTsSuffixTo: [/\.vue$/],
                                allowTsInNodeModules: true, // wanted?
                                compilerOptions: {
                                    declaration: false
                                }
                            }
                        }
                    ]
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
                TNS_ENV: JSON.stringify(mode)
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin({ verbose: !!verbose, cleanOnceBeforeBuildPatterns: itemsToClean }),

            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([{ from: { glob: 'fonts/**' } }, { from: { glob: '**/*.+(jpg|png)' } }, { from: { glob: 'assets/**/*' } }], {
                ignore: [`${relative(appPath, appResourcesFullPath)}/**`]
            }),
            // Generate a bundle starter script and activate it in package.json
            new nsWebpack.GenerateNativeScriptEntryPointsPlugin("bundle"),
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
                webpackConfig: config
            })
        );
    }

    if (hmr) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return config;
};
