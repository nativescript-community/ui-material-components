import { SegmentedBar, SegmentedBarItem } from '../index';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDSegmentedBar', () => SegmentedBar, {});
            Vue.registerElement('MDSegmentedBarItem', () => SegmentedBarItem, {});
        }
    }
};
