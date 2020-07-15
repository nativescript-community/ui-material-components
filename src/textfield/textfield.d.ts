import { Color } from '@nativescript/core/color';
import { TextField as NTextField } from '@nativescript/core/ui/text-field';

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
    digits: string;

    focus();
    blur();
    requestFocus();
    clearFocus();
    setSelection(start: number, stop?: number);
}

export function initTextInputEditText(); // android only
