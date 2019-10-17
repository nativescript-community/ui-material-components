import { ActivityIndicator } from '../activityindicator';
let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDActivityIndicator', () => ActivityIndicator, {});
        }
    }
};
