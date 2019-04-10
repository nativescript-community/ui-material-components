import { FloatingActionButton } from '../floatingactionbutton';
const FloatingActionButtonPlugin = {
    install(Vue) {
        Vue.registerElement('MDFloatingActionButton', () => FloatingActionButton, {});
    }
};

export default FloatingActionButtonPlugin;
