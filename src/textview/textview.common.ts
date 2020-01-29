import { EditableTextBase } from '@nativescript/core/ui/editable-text-base';
import { Color } from '@nativescript/core/color';
import { CSSType } from '@nativescript/core/ui/core/view';
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
    @cssProperty floatingColor: Color;
    @cssProperty buttonColor: Color;
}
