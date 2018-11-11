import * as common from './textfield.common';
import {
    Color,
    hintProperty,
    maxLengthProperty,
    placeholderColorProperty
} from 'tns-core-modules/ui/editable-text-base/editable-text-base';

import * as application from 'application';
import { errorColorProperty, errorProperty, floatingProperty, helperProperty } from './cssproperties';

function getLayout(id: string) {
    const context: android.content.Context = application.android.context;
    return context.getResources().getIdentifier(id, 'layout', context.getPackageName());
}

export class TextField extends common.TextField {
    editText: android.support.design.widget.TextInputEditText;
    layoutView: android.support.design.widget.TextInputLayout;

    nativeViewProtected: android.support.design.widget.TextInputLayout;
    constructor() {
        super();
    }
    get nativeTextViewProtected() {
        return this.editText as android.support.design.widget.TextInputEditText;
    }

    public createNativeView() {

        let layoutIdName = 'material_text_field';
        if (this.style['variant'] === 'filled') {
            layoutIdName = 'material_text_field_filled';
        } else if (this.style['variant'] === 'outline') {
            layoutIdName = 'material_text_field_outline';
        }
        const layoutId = getLayout(layoutIdName);

        let layout: android.support.design.widget.TextInputLayout;
        let editText: android.support.design.widget.TextInputEditText;

        if (layoutId !== 0) {
            layout = (this.layoutView = android.view.LayoutInflater.from(this._context).inflate(layoutId, null, false) as android.support.design.widget.TextInputLayout);
            editText = (this.editText = (layout.getChildAt(0) as android.widget.FrameLayout).getChildAt(0) as android.support.design.widget.TextInputEditText);
        } else {
            layout = (this.layoutView = new android.support.design.widget.TextInputLayout(this._context));
            editText = (this.editText = new android.support.design.widget.TextInputEditText(layout.getContext()));
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
            setTimeout(() => { this.layoutView.setDescendantFocusability(oldDesc); }, 0);
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
