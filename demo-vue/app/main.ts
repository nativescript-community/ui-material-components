import Vue from 'nativescript-vue';
import ActivityIndicatorPlugin from 'nativescript-material-activityindicator/vue';
import ButtonPlugin from 'nativescript-material-button/vue';
import CardViewPlugin from 'nativescript-material-cardview/vue';
import FloatingActionButtonPlugin from 'nativescript-material-floatingactionbutton/vue';
import ProgressPlugin from 'nativescript-material-progress/vue';
import RipplePlugin from 'nativescript-material-ripple/vue';
import SliderPlugin from 'nativescript-material-slider/vue';
import TextFieldPlugin from 'nativescript-material-textfield/vue';
import { isIOS } from 'tns-core-modules/platform';
// import { install as installBottomSheet } from 'nativescript-material-bottomsheet';

// installBottomSheet();

Vue.use(ActivityIndicatorPlugin);
Vue.use(ButtonPlugin);
Vue.use(CardViewPlugin);
Vue.use(FloatingActionButtonPlugin);
Vue.use(ProgressPlugin);
Vue.use(RipplePlugin);
Vue.use(SliderPlugin);
Vue.use(TextFieldPlugin);

import { themer } from 'nativescript-material-core';
if (isIOS) {
    themer.setPrimaryColor('#33B5E5');
    themer.setPrimaryColorVariant('#33B5E5');
    themer.setAccentColor('#33B5E5');
}

// import { getExamples } from './examples';
import * as views from './views';

// for (let item of getExamples()) {
//     Vue.component(item.component.name, item.component);
// }

Vue.component(views.Home.name, views.Home);

Vue.config.silent = true;

new Vue({
    template: `
      <Frame>
        <Home />
      </Frame>
    `
}).$start();
