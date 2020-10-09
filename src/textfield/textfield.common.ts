import { CSSType, Color, TextField as NTextField } from '@nativescript/core';
import { cssProperty } from '@nativescript-community/ui-material-core';

@CSSType('MDTextField')
export abstract class TextFieldBase extends NTextField {
    abstract requestFocus();
    abstract clearFocus();

    // those 2 are not released yet
    secureWithoutAutofill: boolean;
    closeOnReturn: boolean;

    @cssProperty helper: string;
    @cssProperty helperColor: Color;
    @cssProperty counterMaxLength: number;
    @cssProperty errorColor: Color;
    @cssProperty floating: boolean;
    @cssProperty placeholderColor: Color;
    @cssProperty variant: 'outline' | 'underline' | 'filled' | 'none' = 'filled';
    @cssProperty error: string;
    @cssProperty strokeColor: Color;
    @cssProperty strokeInactiveColor: Color;
    @cssProperty strokeDisabledColor: Color;
    @cssProperty floatingColor: Color;
    @cssProperty floatingInactiveColor: Color;
    @cssProperty buttonColor: Color;
    @cssProperty digits: string;
}
