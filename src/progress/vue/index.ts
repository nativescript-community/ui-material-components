const ProgressPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDProgress',
      () => require('../progress').Progress,
      {}
    );
  }
};

export default ProgressPlugin;