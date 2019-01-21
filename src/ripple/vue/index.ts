const RipplePlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDRipple',
      () => require('./..').Ripple,
      {}
    );
  }
};

export default RipplePlugin;