import { BottomNavigationBar, BottomNavigationTab } from '../bottomnavigationbar';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDBottomNavigationBar', () => BottomNavigationBar, {});
            Vue.registerElement('MDBottomNavigationTab', () => BottomNavigationTab, {});
        }
    }
};
