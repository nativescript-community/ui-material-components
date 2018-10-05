import { TextField as NTextField } from 'tns-core-modules/ui/text-field/text-field';
import { Color } from 'tns-core-modules/color/color';
export declare abstract class TextField extends NTextField {
    constructor();
    abstract blur(): any;
    helper: string;
    maxLength: number;
    errorColor: Color;
    floating: boolean;
    placeholderColor: Color;
    variant: string;
    error: string;
}
