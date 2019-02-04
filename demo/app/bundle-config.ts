if (global.TNS_WEBPACK) {
    require('tns-core-modules/bundle-entry-points');

    const context = (<any>require).context('~/', true, /(root|page|fragment)\.(xml|css|js|ts|scss|less|sass)$/);
    global.registerWebpackModules(context);

    global.registerModule('nativescript-material-textfield', () => require('nativescript-material-textfield/textfield'));
    global.registerModule('nativescript-material-button', () => require('nativescript-material-button/button'));
    global.registerModule('nativescript-material-cardview', () => require('nativescript-material-cardview/cardview'));
    global.registerModule('nativescript-material-core', () => require('nativescript-material-core/material'));
    global.registerModule('nativescript-material-core/cssproperties', () => require('nativescript-material-core/cssproperties'));
    global.registerModule('nativescript-material-ripple', () => require('nativescript-material-ripple/ripple'));
    // global.registerModule('main-page', function() {
    //     return require('./main-page');
    // });
}
