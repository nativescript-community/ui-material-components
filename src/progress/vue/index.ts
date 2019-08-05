import { Progress } from '../progress';

let installed = false;
const ProgressPlugin = {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDProgress', () => Progress, {});
        }
    }
};

export default ProgressPlugin;
