import { FloatingActionButton } from '../floatingactionbutton';

let installed = false;
const FloatingActionButtonPlugin = {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDFloatingActionButton', () => FloatingActionButton, {});
        }
    }
};

export default FloatingActionButtonPlugin;
