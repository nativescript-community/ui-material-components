import { Property } from 'tns-core-modules/ui/core/view';
import { Button } from 'tns-core-modules/ui/button';
export declare const srcCompatProperty: Property<FloatingActionButtonBase, string>;
export declare const fabSizeProperty: Property<FloatingActionButtonBase, number>;
export declare const fabCustomSizeProperty: Property<FloatingActionButtonBase, number>;
export declare abstract class FloatingActionButtonBase extends Button {
    constructor();
    srcCompat: string;
    fabSize: number;
    fabCustomSize: number;
}
