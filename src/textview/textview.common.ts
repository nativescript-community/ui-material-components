import { cssProperty } from '@nativescript-community/ui-material-core';
import { CSSType, Color, EditableTextBase } from '@nativescript/core';

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
