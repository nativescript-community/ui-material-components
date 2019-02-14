const RipplePlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDRipple',
      () => require('../ripple').Ripple,
      {}
    );
  }
};

export default RipplePlugin;