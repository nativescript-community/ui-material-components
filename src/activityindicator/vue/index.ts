const ActivityIndicatorPlugin = {
    install(Vue) {
        Vue.registerElement('MDActivityIndicator', () => require('../activityindicator').ActivityIndicator, {});
    }
};

export default ActivityIndicatorPlugin;
