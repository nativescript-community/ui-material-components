const SliderPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDSlider',
      () => require('./..').Slider,
      {}
    );
  }
};

export default SliderPlugin;