import Theme from '@nativescript-community/css-theme';
import ActivityIndicatorPlugin from '@nativescript-community/ui-material-activityindicator/vue';
import BottomNavigationPlugin from '@nativescript-community/ui-material-bottom-navigation/vue';
import BottomNavigationBarPlugin from '@nativescript-community/ui-material-bottomnavigationbar/vue';
import { install as installBottomSheet } from '@nativescript-community/ui-material-bottomsheet';
import BottomSheetPlugin from '@nativescript-community/ui-material-bottomsheet/vue';
import ButtonPlugin from '@nativescript-community/ui-material-button/vue';
import CardViewPlugin from '@nativescript-community/ui-material-cardview/vue';
import { installMixins, themer } from '@nativescript-community/ui-material-core';
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue';
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue';
import RipplePlugin from '@nativescript-community/ui-material-ripple/vue';
import SliderPlugin from '@nativescript-community/ui-material-slider/vue';
import SpeedDialPlugin from '@nativescript-community/ui-material-speeddial/vue';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';
import TextFieldPlugin from '@nativescript-community/ui-material-textfield/vue';
import TextViewPlugin from '@nativescript-community/ui-material-textview/vue';
import { Application, Trace } from '@nativescript/core';
import { isIOS } from '@nativescript/core/platform';
import Vue from 'nativescript-vue';
// import { getExamples } from './examples';
import * as views from './views';
Trace.addCategories(Trace.categories.Transition);
Trace.addCategories(Trace.categories.Navigation);
Trace.enable();

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
Vue.use(BottomNavigationPlugin);
Vue.use(SpeedDialPlugin);

// Vue.registerElement('Label', () => require('@nativescript-community/ui-label').Label);
Vue.registerElement('PreviousNextView', () => require('@nativescript/iqkeyboardmanager').PreviousNextView);
Vue.registerElement('TextViewWithHint', () => require('@nativescript/iqkeyboardmanager').TextViewWithHint);

installMixins();
if (isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setPrimaryColorVariant('#33B5E5');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
themer.createShape('cut', {
    cornerFamily: 'cut' as any,
    cornerSize: {
        value: 0.5,
        unit: '%'
    }
});

if (global.isAndroid) {
    Application.on(Application.displayedEvent, () => {
        Theme.setMode(Theme.Auto);
        androidx.appcompat.app.AppCompatDelegate.setDefaultNightMode(androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM);
    });
}

// for (let item of getExamples()) {
//     Vue.component(item.component.name, item.component);
// }

Vue.component(views.Home.name, views.Home);

Vue.config.silent = true;

Vue.config.errorHandler = (e, vm, info) => {
    console.log('vue error', e, e.stack);
};

Vue.config.warnHandler = function (msg, vm, trace) {
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
