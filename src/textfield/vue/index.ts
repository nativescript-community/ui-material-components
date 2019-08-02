import { TextField } from '../textfield';

let installed = false;
const TextFieldPlugin = {
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

export default TextFieldPlugin;
