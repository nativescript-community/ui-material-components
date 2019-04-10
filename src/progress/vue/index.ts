import { Progress } from '../progress';
const ProgressPlugin = {
    install(Vue) {
        Vue.registerElement('MDProgress', () => Progress, {});
    }
};

export default ProgressPlugin;
