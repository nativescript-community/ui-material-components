
// import {Trace} from '@nativescript/core';
// Trace.addCategories(Trace.categories.concat(Trace.categories.All));
// Trace.enable();

import Vue from 'nativescript-vue';
import ActivityIndicatorPlugin from '@nativescript-community/ui-material-activityindicator/vue';
import ButtonPlugin from '@nativescript-community/ui-material-button/vue';
import CardViewPlugin from '@nativescript-community/ui-material-cardview/vue';
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue';
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue';
import RipplePlugin from '@nativescript-community/ui-material-ripple/vue';
import SliderPlugin from '@nativescript-community/ui-material-slider/vue';
import TextFieldPlugin from '@nativescript-community/ui-material-textfield/vue';
import TextViewPlugin from '@nativescript-community/ui-material-textview/vue';
import { isIOS } from '@nativescript/core/platform';
import { install as installBottomSheet } from '@nativescript-community/ui-material-bottomsheet';
import BottomSheetPlugin from '@nativescript-community/ui-material-bottomsheet/vue';
import BottomNavigationBarPlugin from '@nativescript-community/ui-material-bottomnavigationbar/vue';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';

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
Vue.use(BottomNavigationBarPlugin);
Vue.use(TabsPlugin);

Vue.registerElement('Label', () => require('@nativescript-community/ui-label').Label);
Vue.registerElement('PreviousNextView', () => require('@nativescript/iqkeyboardmanager').PreviousNextView);
Vue.registerElement('TextViewWithHint', () => require('@nativescript/iqkeyboardmanager').TextViewWithHint);

import { installMixins, themer } from '@nativescript-community/ui-material-core';
installMixins();
if (isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setPrimaryColorVariant('#33B5E5');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}

import Theme from '@nativescript/theme';

Theme.setMode(Theme.Dark); // Or Theme.Light
// import { getExamples } from './examples';
import * as views from './views';

// for (let item of getExamples()) {
//     Vue.component(item.component.name, item.component);
// }

Vue.component(views.Home.name, views.Home);

// Vue.config.silent = true;

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
