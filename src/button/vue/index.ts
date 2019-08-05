import { Button } from '../button';

let installed = false;
const ButtonPlugin = {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDButton', () => Button, {});
        }
    }
};

export default ButtonPlugin;
