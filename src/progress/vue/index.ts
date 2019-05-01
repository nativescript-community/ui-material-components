import { Progress } from 'nativescript-material-progress';
const ProgressPlugin = {
    install(Vue) {
        Vue.registerElement('MDProgress', () => Progress, {});
    }
};

export default ProgressPlugin;
