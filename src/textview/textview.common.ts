import { Color } from '@nativescript/core';
import { CSSType } from '@nativescript/core';
import { EditableTextBase } from '@nativescript/core';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDTextView')
export abstract class TextViewBase extends EditableTextBase {

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
    @cssProperty strokeInactiveColor: Color;
    @cssProperty floatingColor: Color;
    @cssProperty floatingInactiveColor: Color;
    @cssProperty buttonColor: Color;
}
