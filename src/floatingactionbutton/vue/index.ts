const FloatingActionButtonPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDFloatingActionButton',
      () => require('./..').FloatingActionButton,
      {}
    );
  }
};

export default FloatingActionButtonPlugin;