if (global.TNS_WEBPACK) {
    require('tns-core-modules/bundle-entry-points');

    const context = (<any>require).context('~/', true, /(root|page|fragment)\.(xml|css|js|ts|scss|less|sass)$/);
    global.registerWebpackModules(context);

    global.registerModule('nativescript-material-textfield', () => require('./nativescript-material-components/textfield/textfield'));
    global.registerModule('nativescript-material-button', () => require('./nativescript-material-components/button/button'));
    global.registerModule('nativescript-material-core', () => require('./nativescript-material-components/core/material'));
    global.registerModule('nativescript-material-core/cssproperties', () => require('./nativescript-material-components/core/cssproperties'));
    global.registerModule('nativescript-material-ripple', () => require('./nativescript-material-components/ripple/ripple'));
    // global.registerModule('main-page', function() {
    //     return require('./main-page');
    // });
}
