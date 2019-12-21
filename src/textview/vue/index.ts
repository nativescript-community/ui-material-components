import { TextView } from '../textview';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDTextView', () => TextView, {
                model: {
                    prop: 'text',
                    event: 'textChange'
                }
            });
        }
    }
};
