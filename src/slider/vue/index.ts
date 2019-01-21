const SliderPlugin = {

  install(Vue) {
    Vue.registerElement(
      'MDSlider',
      () => require('./..').Slider,
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