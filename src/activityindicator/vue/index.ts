const ActivityIndicatorPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDActivityIndicator',
      () => require('./..').ActivityIndicator,
      {}
    );
  }
};

export default ActivityIndicatorPlugin;