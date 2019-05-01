import { Button } from 'nativescript-material-button';
const ButtonPlugin = {
    install(Vue) {
        Vue.registerElement('MDButton', () => Button, {});
    }
};

export default ButtonPlugin;
