import { Color } from '@nativescript/core/color';
import { CSSType } from '@nativescript/core/ui/core/view';
import { TextField as NTextField } from '@nativescript/core/ui/text-field';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDTextField')
export abstract class TextFieldBase extends NTextField {
    abstract requestFocus();
    abstract clearFocus();

    // those 2 are not released yet
    secureWithoutAutofill:boolean
    closeOnReturn:boolean

    @cssProperty helper: string;
    @cssProperty maxLength: number;
    @cssProperty errorColor: Color;
    @cssProperty floating: boolean;
    @cssProperty placeholderColor: Color;
    @cssProperty variant: 'outline' | 'underline' | 'filled' | 'none' = 'filled';
    @cssProperty error: string;
    @cssProperty strokeColor: Color;
    @cssProperty strokeInactiveColor: Color;
    @cssProperty floatingColor: Color;
    @cssProperty floatingInactiveColor: Color;
    @cssProperty buttonColor: Color;
    @cssProperty digits: string;
}
