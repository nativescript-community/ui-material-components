import { TextField as NTextField } from 'tns-core-modules/ui/text-field/text-field';
import { Color } from 'tns-core-modules/color/color';

export class TextField extends NTextField {
    /*
    * nativeView
    * @Android : android.support.design.widget.TextInputLayout
    * @iOS : MDCTextField
    */
    nativeViewProtected : any

    helper: string;
    maxLength: number;
    errorColor: Color;
    floating: boolean;
    placeholderColor: Color;
    variant: string;
    error: string;
        
    focus();
    blur();
}
