const SliderPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDSlider',
      () => require('../slider').Slider,
      {
        model: {
          prop: 'value',
          event: 'valueChange'
        }
      }
    );
  }
};

export default SliderPlugin;