import { ActivityIndicator } from '../activityindicator';
let installed = false;
const ActivityIndicatorPlugin = {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDActivityIndicator', () => ActivityIndicator, {});
        }
    }
};

export default ActivityIndicatorPlugin;
