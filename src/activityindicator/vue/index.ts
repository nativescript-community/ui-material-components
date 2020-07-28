import { ActivityIndicator } from '..';
let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDActivityIndicator', () => ActivityIndicator, {});
        }
    }
};
