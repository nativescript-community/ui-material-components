const ButtonPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDButton',
      () => require('../button').Button,
      {}
    );
  }
};

export default ButtonPlugin;