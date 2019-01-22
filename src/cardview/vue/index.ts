const CardViewPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDCardView',
      () => require('../cardview').CardView,
      {}
    );
  }
};

export default CardViewPlugin;