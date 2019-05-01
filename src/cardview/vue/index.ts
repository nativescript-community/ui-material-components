import { CardView } from 'nativescript-material-cardview';
const CardViewPlugin = {
    install(Vue) {
        Vue.registerElement('MDCardView', () => CardView, {});
    }
};

export default CardViewPlugin;
