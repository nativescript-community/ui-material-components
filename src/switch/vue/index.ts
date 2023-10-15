import { Switch } from '..';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDSwitch', () => Switch, {
                model: {
                    prop: 'checked',
                    event: 'checkedChange',
                }
            });
        }
    }
};
