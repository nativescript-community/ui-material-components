const WebpackTemplate = require('nativescript-akylas-webpack-template');
const webpack = require('webpack');
const { resolve } = require('path');
const NsVueTemplateCompiler = require('akylas-nativescript-vue-template-compiler');

// temporary hack to support v-model using ns-vue-template-compiler
// See https://github.com/nativescript-vue/nativescript-vue/issues/371
// NsVueTemplateCompiler.registerElement('MDTextField', () => require('~/nativescript-material-textfield').TextField, {
//     model: {
//         prop: 'text',
//         event: 'textChange'
//     }
// });
// NsVueTemplateCompiler.registerElement('MDTextView', () => require('~/nativescript-material-textview').TextField, {
//     model: {
//         prop: 'text',
//         event: 'textChange'
//     }
// });
// NsVueTemplateCompiler.registerElement('MDSlider', () => require('~/nativescript-material-slider').Slider, {
//     model: {
//         prop: 'value',
//         event: 'valueChange'
//     }
// });


module.exports = env => {
    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
    if (!platform) {
        throw new Error('You need to provide a target platform!');
    }

    const projectRoot = __dirname;

    const {
        // The 'appPath' and 'appResourcesPath' values are fetched from
        // the nsconfig.json configuration file
        // when bundling with `tns run android|ios --bundle`.
        appPath = 'app',

        development = false // --env.development
    } = env;

    const appFullPath = resolve(projectRoot, appPath);

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

    console.log('running webpack with env', env);
    const config = WebpackTemplate(env, {
        projectRoot: __dirname,
        alias: aliases
    });
    if (development) {
        Array.prototype.push.apply(config.plugins,[
            new webpack.ContextReplacementPlugin(/nativescript-material-textfield/, resolve(projectRoot, '..', 'src', 'textfield')),
            new webpack.ContextReplacementPlugin(/nativescript-material-textview/, resolve(projectRoot, '..', 'src', 'textview'))
        ]);
    }
    // config.stats = 'verbose'

    return config;
};
