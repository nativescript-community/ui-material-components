import { registerNativeViewElement } from 'svelte-native/dom';
import { Button } from '../button';

export default class ButtonPlugin {
    static register() {
        registerNativeViewElement('mdbutton', () => Button);
    }
}
