const TextFieldPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDTextField',
      () => require('./..').TextField,
      {
        model: {
          prop: 'text',
          event: 'textChange'
        }
      }
    );
  }
};

export default TextFieldPlugin;