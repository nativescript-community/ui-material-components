import { Button } from '../button';
const ButtonPlugin = {
    install(Vue) {
        Vue.registerElement('MDButton', () => Button, {});
    }
};

export default ButtonPlugin;
