import { Slider } from '../slider';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDSlider', () => Slider, {
                model: {
                    prop: 'value',
                    event: 'valueChange'
                }
            });
        }
    }
};
