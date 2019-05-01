import { ActivityIndicator } from '../activityindicator';
const ActivityIndicatorPlugin = {
    install(Vue) {
        Vue.registerElement('MDActivityIndicator', () => ActivityIndicator, {});
    }
};

export default ActivityIndicatorPlugin;
