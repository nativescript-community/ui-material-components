import { TextField as NTextField } from '@nativescript/core/ui/text-field';
import { Color } from '@nativescript/core/color';
import { CSSType } from '@nativescript/core/ui/core/view';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDTextField')
export abstract class TextFieldBase extends NTextField {
    constructor() {
        super();
    }
    abstract requestFocus();
    abstract clearFocus();

    @cssProperty helper: string;
    @cssProperty maxLength: number;
    @cssProperty errorColor: Color;
    @cssProperty floating: boolean;
    @cssProperty placeholderColor: Color;
    @cssProperty variant: 'outline' | 'underline' | 'filled' | 'none' = 'filled';
    @cssProperty error: string;
    @cssProperty strokeColor: Color;
    @cssProperty floatingColor: Color;
}
