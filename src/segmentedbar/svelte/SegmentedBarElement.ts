import { NativeElementPropType, NativeViewElementNode, registerElement, registerNativeViewElement } from '@nativescript-community/svelte-native/dom';
import { SegmentedBar, SegmentedBarItem } from '../index';

export default class SegmentedBarElement extends NativeViewElementNode<SegmentedBar> {
    constructor() {
        super('SegmentedBar', SegmentedBar, undefined, {
            items: NativeElementPropType.Array
        });
    }

    static register() {
        registerElement('SegmentedBar', () => new SegmentedBarElement());
        registerNativeViewElement('SegmentedBarItem', () => SegmentedBarItem, 'items');
    }
}
