import { BottomNavigation, TabContentItem, TabStrip, TabStripItem } from '../';

let installed = false;

export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDBottomNavigation', () => BottomNavigation, {
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
