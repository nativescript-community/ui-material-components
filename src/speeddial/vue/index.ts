import { Label } from '@nativescript/core';
import { SpeedDial, SpeedDialItem } from '../index';

let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('MDSpeedDial', () => SpeedDial);
            Vue.registerElement('MDSpeedDialItem', () => SpeedDialItem);
        }
    }
};
