const TextFieldPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDTextField',
      () => require('../textfield').TextField,
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