const CardViewPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDCardView',
      () => require('./..').CardView,
      {}
    );
  }
};

export default CardViewPlugin;