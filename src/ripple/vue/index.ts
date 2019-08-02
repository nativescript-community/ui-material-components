import { Ripple } from '../ripple';

let installed = false;
const RipplePlugin = {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDRipple', () => Ripple, {});
        }
    }
};

export default RipplePlugin;
