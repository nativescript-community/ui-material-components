import { TextFieldBase } from './textfield.common';
import { hintProperty, maxLengthProperty, placeholderColorProperty } from 'tns-core-modules/ui/editable-text-base/editable-text-base';

import * as application from 'application';
import { errorColorProperty, errorProperty, floatingProperty, helperProperty } from './textfield_cssproperties';
import { Color } from 'tns-core-modules/color';

function getLayout(id: string) {
    const context: android.content.Context = application.android.context;
    return context.getResources().getIdentifier(id, 'layout', context.getPackageName());
}

export class TextField extends TextFieldBase {
    editText: com.google.android.material.textfield.TextInputEditText;
    layoutView: com.google.android.material.textfield.TextInputLayout;

    nativeViewProtected: com.google.android.material.textfield.TextInputLayout;
    constructor() {
        super();
    }
    get nativeTextViewProtected() {
        return this.editText as com.google.android.material.textfield.TextInputEditText;
    }

    public createNativeView() {
        let layoutIdName = 'material_text_field';
        if (this.style['variant'] === 'filled') {
            layoutIdName = 'material_text_field_filled';
        } else if (this.style['variant'] === 'outline') {
            layoutIdName = 'material_text_field_outline';
        }
        const layoutId = getLayout(layoutIdName);

        let layout: com.google.android.material.textfield.TextInputLayout;
        let editText: com.google.android.material.textfield.TextInputEditText;

        if (layoutId !== 0) {
            layout = this.layoutView = android.view.LayoutInflater.from(this._context).inflate(layoutId, null, false) as com.google.android.material.textfield.TextInputLayout;
            editText = this.editText = (layout.getChildAt(0) as android.widget.FrameLayout).getChildAt(0) as com.google.android.material.textfield.TextInputEditText;
        } else {
            layout = this.layoutView = new com.google.android.material.textfield.TextInputLayout(this._context);
            editText = this.editText = new com.google.android.material.textfield.TextInputEditText(layout.getContext());
            editText.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.FrameLayout.LayoutParams.MATCH_PARENT, android.widget.FrameLayout.LayoutParams.WRAP_CONTENT));
            layout.addView(editText);
        }
        layout.setFocusableInTouchMode(true); // to prevent focus on view creation
        // layout.setFocusable(true);
        // layout.setAddStatesFromChildren(true);
        // layout.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
        // layout.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
        return layout;
    }

    [hintProperty.getDefault](): string {
        return this.layoutView.getHint();
    }
    [hintProperty.setNative](value: string) {
        const text = value === null || value === undefined ? null : value.toString();
        this.layoutView.setHint(text);
    }

    [placeholderColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        (this.layoutView as any).setDefaultHintTextColor(android.content.res.ColorStateList.valueOf(color));
    }
    public focus(): boolean {
        if (this.layoutView) {
            // because of setFocusableInTouchMode fix we need this for focus to work
            const oldDesc = this.layoutView.getDescendantFocusability();
            this.layoutView.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
            // }
            this.layoutView.requestFocus();
            setTimeout(() => {
                this.layoutView.setDescendantFocusability(oldDesc);
            }, 0);
        }

        return false;
    }
    blur() {
        this.dismissSoftInput();
        this.nativeViewProtected.clearFocus();
    }

    [errorColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        (this.layoutView as any).setErrorTextColor(android.content.res.ColorStateList.valueOf(color));
    }

    [helperProperty.setNative](value: string) {
        (this.layoutView as any).setHelperText(!!value ? value : null);
    }
    [errorProperty.setNative](value: string) {
        this.layoutView.setError(!!value ? value : null);
        this.layoutView.setErrorEnabled(!!value);
    }

    [maxLengthProperty.setNative](value: number) {
        this.layoutView.setCounterMaxLength(value);
    }

    [floatingProperty.setNative](value: boolean) {}
}
