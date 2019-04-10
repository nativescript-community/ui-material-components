import { Slider } from '../slider';
const SliderPlugin = {
    install(Vue) {
        Vue.registerElement('MDSlider', () => Slider, {
            model: {
                prop: 'value',
                event: 'valueChange'
            }
        });
    }
};

export default SliderPlugin;
