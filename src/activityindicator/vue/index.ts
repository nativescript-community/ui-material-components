import { ActivityIndicator } from 'nativescript-material-activityindicator';
const ActivityIndicatorPlugin = {
    install(Vue) {
        Vue.registerElement('MDActivityIndicator', () => ActivityIndicator, {});
    }
};

export default ActivityIndicatorPlugin;
