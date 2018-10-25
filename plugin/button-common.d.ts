import { Property } from 'tns-core-modules/ui/core/view';
import { Button } from 'tns-core-modules/ui/button/button';
export declare abstract class ButtonBase extends Button {
    variant: string;
    constructor();
    elevation: number;
    rippleColor: string;
}
export declare const variantProperty: Property<ButtonBase, string>;
