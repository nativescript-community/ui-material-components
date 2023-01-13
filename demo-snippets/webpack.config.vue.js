const NsVueTemplateCompiler = require('../demo-vue/node_modules/nativescript-vue-template-compiler');
const { readFileSync } = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { resolve } = require('path');
function fixedFromCharCode(codePt) {
    if (codePt > 0xffff) {
        codePt -= 0x10000;
        return String.fromCharCode(0xd800 + (codePt >> 10), 0xdc00 + (codePt & 0x3ff));
    } else {
        return String.fromCharCode(codePt);
    }
}

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
NsVueTemplateCompiler.registerElement('MDTabs', () => require('@nativescript-community/ui-material-tabs').Slider, {
    model: {
        prop: 'selectedIndex',
        event: 'selectedIndexChange'
    }
});

module.exports = (env, webpack) => {
    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
    webpack.chainWebpack((config) => {
        const symbolsParser = require('scss-symbols-parser');
        const mdiSymbols = symbolsParser.parseSymbols(readFileSync(resolve(__dirname, './node_modules/@mdi/font/scss/_variables.scss')).toString());
        const mdiIcons = JSON.parse(`{${mdiSymbols.variables[mdiSymbols.variables.length - 1].value.replace(/" (F|0)(.*?)([,\n]|$)/g, '": "$1$2"$3')}}`);

        const scssPrepend = `$mdi-fontFamily: ${platform === 'android' ? 'materialdesignicons-webfont' : 'Material Design Icons'};`;
        config.module.rule('scss').use('sass-loader').options({
            additionalData: scssPrepend
        });
        config.module
            .rule('replace_mdi')
            .exclude.add(/node_modules/)
            .end()
            .test(/\.(ts|js|scss|css|vue)$/)
            .use('string-replace-loader')
            .loader(resolve(__dirname, './node_modules/string-replace-loader'))
            .options({
                search: 'mdi-([a-z0-9-_]+)',
                replace: (match, p1, offset, str) => {
                    if (mdiIcons[p1]) {
                        return fixedFromCharCode(parseInt(mdiIcons[p1], 16));
                    }
                    return match;
                },
                flags: 'g'
            });
        config.plugin('material-font').use(CopyWebpackPlugin, [
            {
                patterns: [
                    {
                        from: resolve(__dirname, './node_modules/@mdi/font/fonts/materialdesignicons-webfont.ttf'),
                        to: 'fonts'
                    }
                ]
            }
        ]);
    });
};
