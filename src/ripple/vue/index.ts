import { Ripple } from '../ripple';
const RipplePlugin = {
    install(Vue) {
        Vue.registerElement('MDRipple', () => Ripple, {});
    }
};

export default RipplePlugin;
