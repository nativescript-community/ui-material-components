import { Tabs } from '../tabs';

let installed = false;

export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDTabs', () => Tabs, {
                model: {
                    prop: 'selectedIndex',
                    event: 'selectedIndexChange',
                },
                component: require('./tabsComponent').default,
            });
        }
    },
};
