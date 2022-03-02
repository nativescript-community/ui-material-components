import { TabContentItem, TabStrip, TabStripItem, Tabs } from '..';

let installed = false;

export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDTabs', () => Tabs, {
                model: {
                    prop: 'selectedIndex',
                    event: 'selectedIndexChange'
                },
                component: require('./component').default
            });
            Vue.registerElement('MDTabContentItem', () => TabContentItem, {});
            Vue.registerElement('MDTabStripItem', () => TabStripItem, {});
            Vue.registerElement('MDTabStrip', () => TabStrip, {});
        }
    }
};
