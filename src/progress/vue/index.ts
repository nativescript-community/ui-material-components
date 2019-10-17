import { Progress } from '../progress';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDProgress', () => Progress, {});
        }
    }
};
