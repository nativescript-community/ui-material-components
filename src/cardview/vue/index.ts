import { CardView } from '../cardview';

let installed = false;
const CardViewPlugin = {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDCardView', () => CardView, {});
        }
    }
};

export default CardViewPlugin;
