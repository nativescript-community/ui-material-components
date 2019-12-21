import { EditableTextBase } from '@nativescript/core/ui/editable-text-base';
import { Color } from '@nativescript/core/color/color';
import {
    AutocapitalizationType,
    FormattedString,
    KeyboardType,
    Length,
    ReturnKeyType,
    TextAlignment,
    TextDecoration,
    TextTransform,
    UpdateTextTrigger,
    WhiteSpace
} from '@nativescript/core/ui/editable-text-base/editable-text-base';

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type TextViewProperties = Partial<Pick<TextView, keyof TextView>>;
export class TextView extends EditableTextBase {
    /*
     * nativeView
     * @Android : com.google.android.material.textfield.TextInputLayout
     * @iOS : MDCMultilineTextField
     */
    nativeViewProtected: any;

    helper: string;
    maxLength: number;
    errorColor: Color;
    floating: boolean;
    placeholderColor: Color;
    variant: string;
    error: string;

    focus();
    blur();
    requestFocus();
    clearFocus();
}

export function initTextInputEditText(); // android only
