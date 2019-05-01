import { FloatingActionButton } from 'nativescript-material-floatingactionbutton';
const FloatingActionButtonPlugin = {
    install(Vue) {
        Vue.registerElement('MDFloatingActionButton', () => FloatingActionButton, {});
    }
};

export default FloatingActionButtonPlugin;
