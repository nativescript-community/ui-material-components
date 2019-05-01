import { TextField } from 'nativescript-material-textfield';
const TextFieldPlugin = {
    install(Vue) {
        Vue.registerElement('MDTextField', () => TextField, {
            model: {
                prop: 'text',
                event: 'textChange'
            }
        });
    }
};

export default TextFieldPlugin;
