import { View, Property } from 'tns-core-modules/ui/core/view';
import { Button } from 'tns-core-modules/ui/button';

export const srcCompatProperty = new Property<FloatingActionButtonBase, string>({
    name: 'srcCompat'
});
export const fabSizeProperty = new Property<FloatingActionButtonBase, number>({
    name: 'fabSize',
    valueConverter: v => parseFloat(v)
});
export const fabCustomSizeProperty = new Property<FloatingActionButtonBase, number>({
    name: 'fabCustomSize',
    valueConverter: v => parseFloat(v)
});
export abstract class FloatingActionButtonBase extends Button {
    constructor() {
        super();
        console.log('create FloatingActionButton common');
    }
    public srcCompat: string;
    public fabSize: number;
    public fabCustomSize: number;
}
fabSizeProperty.register(FloatingActionButtonBase);
fabCustomSizeProperty.register(FloatingActionButtonBase);
srcCompatProperty.register(FloatingActionButtonBase);
