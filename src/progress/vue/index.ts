const ProgressPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDProgress',
      () => require('./..').Progress,
      {}
    );
  }
};

export default ProgressPlugin;