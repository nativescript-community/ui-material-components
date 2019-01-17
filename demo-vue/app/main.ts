import Vue from 'nativescript-vue';
import CardViewPlugin from 'nativescript-material-cardview/vue';

Vue.use(CardViewPlugin);

import { getExamples } from './examples';
import * as views from './views';

for (let comp of getExamples()) {
  Vue.component(comp.name, comp);
}

Vue.component(views.Home.name, views.Home);

// Vue.config.silent = false;

new Vue({
  template: `
    <Frame>
      <Home />
    </Frame>
  `
}).$start();
