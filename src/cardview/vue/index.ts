import { CardView } from '../cardview';
const CardViewPlugin = {
    install(Vue) {
        Vue.registerElement('MDCardView', () => CardView, {});
    }
};

export default CardViewPlugin;
