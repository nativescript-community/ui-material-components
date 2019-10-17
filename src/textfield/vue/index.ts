import { TextField } from '../textfield';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDTextField', () => TextField, {
                model: {
                    prop: 'text',
                    event: 'textChange'
                }
            });
        }
    }
};
