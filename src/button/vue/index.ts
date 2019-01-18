const ButtonPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDButton',
      () => require('./..').Button,
      {}
    );
  }
};

export default ButtonPlugin;