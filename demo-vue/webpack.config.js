const { relative, resolve } = require("path");

const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require("nativescript-vue-template-compiler");

// temporary hack to support v-model using ns-vue-template-compiler
// See https://github.com/nativescript-vue/nativescript-vue/issues/371
NsVueTemplateCompiler.registerElement(
    "MDTextField",
    () => require("~/nativescript-material-components/textfield").TextField,
    {
        model: {
            prop: "text",
            event: "textChange"
        }
    }
);
NsVueTemplateCompiler.registerElement(
    "MDSlider",
    () => require("~/nativescript-material-components/slider").Slider,
    {
        model: {
            prop: 'value',
            event: 'valueChange'
        }
    }
);

const nsWebpack = require("nativescript-dev-webpack");
const nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
const { NativeScriptWorkerPlugin } = require("nativescript-worker-loader/NativeScriptWorkerPlugin");

module.exports = env => {
    // Add your custom Activities, Services and other android app components here.
    const appComponents = [
        "tns-core-modules/ui/frame",
        "tns-core-modules/ui/frame/activity",
    ];

    const platform = env && (env.android && "android" || env.ios && "ios");
    if (!platform) {
        throw new Error("You need to provide a target platform!");
    }

    const platforms = ["ios", "android"];
    const projectRoot = __dirname;

    // Default destination inside platforms/<platform>/...
    const dist = resolve(projectRoot, nsWebpack.getAppPath(platform, projectRoot));
    const appResourcesPlatformDir = platform === "android" ? "Android" : "iOS";

    const {
        // The 'appPath' and 'appResourcesPath' values are fetched from
        // the nsconfig.json configuration file
        // when bundling with `tns run android|ios --bundle`.
        appPath = "app",
            appResourcesPath = "app/App_Resources",

            // You can provide the following flags when running 'tns run android|ios'
            development = false, // --env.development
            snapshot, // --env.snapshot
            production, // --env.production
            report, // --env.report
            hmr, // --env.hmr
    } = env;

    const externals = (env.externals || []).map((e) => { // --env.externals
        return new RegExp(e + ".*");
    });

    const mode = production ? "production" : "development"

    const appFullPath = resolve(projectRoot, appPath);
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath);
    const entryPath = resolve(appFullPath, entryModule);
    console.log(`Bundling application for entryPath ${entryPath}...`);

    let aliases = {
        '~': appFullPath,
        '@': appFullPath,
        'vue': 'nativescript-vue'
    };

    if (!!development) {
        const srcFullPath = resolve(projectRoot, '..', 'src');
        aliases = Object.assign(aliases, {
            '#': srcFullPath,
            'nativescript-material-core$': '#/core/material.' + platform,
            'nativescript-material-core/android/utils$': '#/core/android/utils',
            'nativescript-material-core/cssproperties$': '#/core/cssproperties',
            
            'nativescript-material-bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,
            'nativescript-material-bottomsheet/vue$': '#/bottomsheet/vue/index',
            'nativescript-material-progbottomsheetress/bottomsheet$': '#/bottomsheet/bottomsheet.' + platform,

            'nativescript-material-progress$': '#/progress/progress.' + platform,
            'nativescript-material-progress/vue$': '#/progress/vue/index',
            'nativescript-material-progress/progress$': '#/progress/progress.' + platform,

            'nativescript-material-cardview$': '#/cardview/cardview.' + platform,
            'nativescript-material-cardview/vue$': '#/cardview/vue/index',
            'nativescript-material-cardview/cardview$': '#/cardview/cardview.' + platform,

            'nativescript-material-slider$': '#/slider/slider.' + platform,
            'nativescript-material-slider/vue$': '#/slider/vue/index',
            'nativescript-material-slider/slider$': '#/slider/slider.' + platform,

            'nativescript-material-button$': '#/button/button.' + platform,
            'nativescript-material-button/vue$': '#/button/vue/index',
            'nativescript-material-button/button$': '#/button/button.' + platform,

            'nativescript-material-textfield$': '#/textfield/textfield.' + platform,
            'nativescript-material-textfield/textfield$': '#/textfield/textfield.' + platform,
            'nativescript-material-textfield/textfield_cssproperties$': '#/textfield/textfield_cssproperties',
            'nativescript-material-textfield/vue$': '#/textfield/vue/index',

            'nativescript-material-floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,
            'nativescript-material-floatingactionbutton/vue$': '#/floatingactionbutton/vue/index',
            'nativescript-material-floatingactionbutton/floatingactionbutton$': '#/floatingactionbutton/floatingactionbutton.' + platform,

            'nativescript-material-activityindicator$': '#/activityindicator/activityindicator.' + platform,
            'nativescript-material-activityindicator/vue$': '#/activityindicator/vue/index',
            'nativescript-material-activityindicator/activityindicator$': '#/activityindicator/activityindicator.' + platform,

            'nativescript-material-ripple$': '#/ripple/ripple.' + platform,
            'nativescript-material-ripple/vue$': '#/ripple/vue/index',
            'nativescript-material-ripple/ripple$': '#/ripple/ripple.' + platform,

            'nativescript-material-dialogs$': '#/dialogs/dialogs.' + platform
        });

        console.log('alias', aliases)
    }

    const config = {
        mode: mode,
        context: appFullPath,
        externals,
        watchOptions: {
            ignored: [
                appResourcesFullPath,
                // Don't watch hidden files
                "**/.*",
            ],
        },
        target: nativescriptTarget,
        // target: nativeScriptVueTarget,
        entry: {
            bundle: entryPath,
        },
        output: {
            pathinfo: false,
            path: dist,
            libraryTarget: "commonjs2",
            filename: "[name].js",
            globalObject: "global",
        },
        resolve: {
            extensions: [".vue", ".js", ".ts", ".scss", ".css"],
            // Resolve {N} system modules from tns-core-modules
            modules: [
                resolve(__dirname, "node_modules/tns-core-modules"),
                resolve(__dirname, "node_modules"),
                "node_modules/tns-core-modules",
                "node_modules",
            ],
            alias: aliases,
            // resolve symlinks to symlinked modules
            symlinks: true,
        },
        resolveLoader: {
            // don't resolve symlinks to symlinked loaders
            symlinks: false,
        },
        node: {
            // Disable node shims that conflict with NativeScript
            "http": false,
            "timers": false,
            "setImmediate": false,
            "fs": "empty",
            "__dirname": false,
        },
        devtool: "none",
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: "vendor",
                        chunks: "all",
                        test: (module) => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName) ||
                                appComponents.some(comp => comp === moduleName);

                        },
                        enforce: true,
                    },
                },
            },
            minimize: Boolean(production),
            minimizer: [
                new UglifyJsPlugin({
                    parallel: true,
                    cache: true,
                    uglifyOptions: {
                        output: {
                            comments: false,
                        },
                        compress: {
                            // The Android SBG has problems parsing the output
                            // when these options are enabled
                            'collapse_vars': platform !== "android",
                            sequences: platform !== "android",
                        },
                    },
                }),
            ],
        },
        module: {
            rules: [{
                    test: entryPath,
                    use: [
                        // Require all Android app components
                        platform === "android" && {
                            loader: "nativescript-dev-webpack/android-app-components-loader",
                            options: { modules: appComponents },
                        },

                        {
                            loader: "nativescript-dev-webpack/bundle-config-loader",
                            options: {
                                registerPages: true, // applicable only for non-angular apps
                                loadCss: !snapshot, // load the application css if in debug mode
                            },
                        },
                    ].filter(loader => Boolean(loader)),
                },
                {
                    test: /\.css$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        { loader: "css-loader", options: { minimize: false, url: false } },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        { loader: "css-loader", options: { minimize: false, url: false } },
                        "sass-loader",
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
                    },
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        compiler: NsVueTemplateCompiler,
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
                "global.TNS_WEBPACK": "true",
                "TNS_ENV": JSON.stringify(mode)
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin([`${dist}/**/*`]),
            // Copy native app resources to out dir.
            new CopyWebpackPlugin([{
                from: `${appResourcesFullPath}/${appResourcesPlatformDir}`,
                to: `${dist}/App_Resources/${appResourcesPlatformDir}`,
                context: projectRoot,
            }]),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([
                { from: { glob: "fonts/**" } },
                { from: { glob: "**/*.+(jpg|png)" } },
                { from: { glob: "assets/**/*" } },
            ], { ignore: [`${relative(appPath, appResourcesFullPath)}/**`] }),
            // Generate a bundle starter script and activate it in package.json
            new nsWebpack.GenerateBundleStarterPlugin([
                "./vendor",
                "./bundle",
            ]),
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

    if (report) {
        // Generate report files for bundles content
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            generateStatsFile: true,
            reportFilename: resolve(projectRoot, "report", `report.html`),
            statsFilename: resolve(projectRoot, "report", `stats.json`),
        }));
    }

    if (snapshot) {
        config.plugins.push(new nsWebpack.NativeScriptSnapshotPlugin({
            chunk: "vendor",
            requireModules: [
                "tns-core-modules/bundle-entry-points",
            ],
            projectRoot,
            webpackConfig: config,
        }));
    }

    if (hmr) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return config;
};
