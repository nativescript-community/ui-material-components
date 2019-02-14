if (global.TNS_WEBPACK) {
    require('tns-core-modules/bundle-entry-points');

    const context = (<any>require).context('~/', true, /(root|page|fragment)\.(xml|css|js|ts|scss|less|sass)$/);
    global.registerWebpackModules(context);

    // global.registerModule('main-page', function() {
    //     return require('./main-page');
    // });
}
