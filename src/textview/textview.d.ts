import { Color, EditableTextBase } from '@nativescript/core';

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
    helperColor: Color;
    counterMaxLength: number;
    errorColor: Color;
    floating: boolean;
    placeholderColor: Color;
    variant: string;
    error: string;

    focus();
    blur();
    requestFocus();
    clearFocus();
    setSelection(start: number, stop?: number);
}

export function initTextInputEditText(); // android only
