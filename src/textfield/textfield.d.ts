import { TextField as NTextField } from '@nativescript/core/ui/text-field/text-field';
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

export type TextFieldProperties = Partial<Pick<TextField, keyof TextField>>;
export class TextField extends NTextField {
    /*
     * nativeView
    * @Android : com.google.android.material.textfield.TextInputLayout
     * @iOS : MDCTextField
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
