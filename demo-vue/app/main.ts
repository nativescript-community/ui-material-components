// import { knownFolders } from '@nativescript/core/file-system';
// const currentApp = knownFolders.currentApp();
// global.process = global.process || {} as any;
// global.process.cwd = function() {
//     return '';
// };
// require('source-map-support').install({
//     environment: 'node',
//     handleUncaughtExceptions: false,
//     retrieveSourceMap(source) {
//         const sourceMapPath = source + '.map';
//         const appPath = currentApp.path;
//         let sourceMapRelativePath = sourceMapPath
//             // .replace('file:///', '')
//             .replace('file://', '')
//             .replace(appPath + '/', '')
//             .replace(appPath + '/', '');
//         if (sourceMapRelativePath.startsWith('app/')) {
//             sourceMapRelativePath = sourceMapRelativePath.slice(4);
//         }
//         // console.log('retrieveSourceMap', source, appPath, sourceMapRelativePath, currentApp.getFile(sourceMapRelativePath).readTextSync());
//         return {
//             url: sourceMapRelativePath,
//             map: currentApp.getFile(sourceMapRelativePath).readTextSync()
//         };
//     }
// });

import Vue from 'nativescript-vue';
import ActivityIndicatorPlugin from 'nativescript-material-activityindicator/vue';
import ButtonPlugin from 'nativescript-material-button/vue';
import CardViewPlugin from 'nativescript-material-cardview/vue';
import FloatingActionButtonPlugin from 'nativescript-material-floatingactionbutton/vue';
import ProgressPlugin from 'nativescript-material-progress/vue';
import RipplePlugin from 'nativescript-material-ripple/vue';
import SliderPlugin from 'nativescript-material-slider/vue';
import TextFieldPlugin from 'nativescript-material-textfield/vue';
import TextViewPlugin from 'nativescript-material-textview/vue';
import { isIOS } from '@nativescript/core/platform';
import { install as installBottomSheet } from 'nativescript-material-bottomsheet';
import BottomSheetPlugin from 'nativescript-material-bottomsheet/vue';
import BottomNavigationBarlugin from 'nativescript-material-bottomnavigationbar/vue';

installBottomSheet();

Vue.use(ActivityIndicatorPlugin);
Vue.use(ButtonPlugin);
Vue.use(CardViewPlugin);
Vue.use(FloatingActionButtonPlugin);
Vue.use(ProgressPlugin);
Vue.use(RipplePlugin);
Vue.use(SliderPlugin); 
Vue.use(TextViewPlugin);
Vue.use(TextFieldPlugin);
Vue.use(BottomSheetPlugin);
Vue.use(BottomNavigationBarlugin);

Vue.registerElement('PreviousNextView', () => require('nativescript-iqkeyboardmanager').PreviousNextView);
Vue.registerElement('TextViewWithHint', () => require('nativescript-iqkeyboardmanager').TextViewWithHint);

import { installMixins, themer } from 'nativescript-material-core';
import { install } from 'nativescript-material-bottomsheet';

install();
installMixins();
if (isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setPrimaryColorVariant('#33B5E5');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

// import { getExamples } from './examples';
import * as views from './views'; 

// for (let item of getExamples()) {
//     Vue.component(item.component.name, item.component);
// }

Vue.component(views.Home.name, views.Home);

Vue.config.silent = true;

Vue.config.errorHandler = (e, vm, info) => {
  console.log('vue error', e, e.stack);

};

Vue.config.warnHandler = function(msg, vm, trace) {
  console.warn('[Vue][Warn]', `[${msg}]`);
  // cwarn(msg, trace);
};

new Vue({
    template: `
      <Frame>
        <Home />
      </Frame>
    `
}).$start();
