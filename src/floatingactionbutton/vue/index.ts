const FloatingActionButtonPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDFloatingActionButton',
      () => require('../floatingactionbutton').FloatingActionButton,
      {}
    );
  }
};

export default FloatingActionButtonPlugin;