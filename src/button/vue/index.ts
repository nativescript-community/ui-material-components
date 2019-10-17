import { Button } from '../button';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDButton', () => Button, {});
        }
    }
};
