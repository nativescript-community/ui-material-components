import { Ripple } from 'nativescript-material-ripple';
const RipplePlugin = {
    install(Vue) {
        Vue.registerElement('MDRipple', () => Ripple, {});
    }
};

export default RipplePlugin;
