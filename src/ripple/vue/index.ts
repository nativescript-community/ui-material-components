import { Ripple } from '../ripple';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDRipple', () => Ripple, {});
        }
    }
};
