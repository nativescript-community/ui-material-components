const TextFieldPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDTextField',
      () => require('./..').TextField,
      {}
    );
  }
};

export default TextFieldPlugin;