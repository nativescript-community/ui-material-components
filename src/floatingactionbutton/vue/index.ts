import { FloatingActionButton } from '../floatingactionbutton';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDFloatingActionButton', () => FloatingActionButton, {});
        }
    }
};
