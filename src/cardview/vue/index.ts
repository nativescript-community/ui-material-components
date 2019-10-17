import { CardView } from '../cardview';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDCardView', () => CardView, {});
        }
    }
};
