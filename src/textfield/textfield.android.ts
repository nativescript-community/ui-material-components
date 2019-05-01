import { TextFieldBase } from './textfield.common';
import { hintProperty, maxLengthProperty, placeholderColorProperty } from 'tns-core-modules/ui/editable-text-base/editable-text-base';

import * as application from 'application';
import { errorColorProperty, errorProperty, floatingProperty, helperProperty, highlightColorProperty } from './textfield_cssproperties';
import { Color } from 'tns-core-modules/color';
import { ad } from 'tns-core-modules/utils/utils';
import { getFocusedColorStateList, handleClearFocus } from 'nativescript-material-core/android/utils';
import { Background } from 'tns-core-modules/ui/styling/background';

declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _redrawNativeBackground(value: android.graphics.drawable.Drawable | Background): void;
    }
}

function getLayout(id: string) {
    const context: android.content.Context = application.android.context;
    return context.getResources().getIdentifier(id, 'layout', context.getPackageName());
}

interface TextInputEditText extends android.support.design.widget.TextInputEditText {
    // tslint:disable-next-line:no-misused-new
    new (context): TextInputEditText;
    owner: WeakRef<TextField>;
}
let TextInputEditText: TextInputEditText;

function initTextInputEditText() {
    if (TextInputEditText) {
        return;
    }
    @JavaProxy('org.nativescript.widgets.TextInputEditText')
    class TextInputEditTextImpl extends android.support.design.widget.TextInputEditText {
        public owner: WeakRef<TextField>;
        constructor(context: android.content.Context) {
            super(context);
            return global.__native(this);
        }
        dispatchKeyEventPreIme(event) {
            const imm = ad.getInputMethodManager();

            if (imm != null && imm.isActive() && event.getAction() === android.view.KeyEvent.ACTION_UP && event.getKeyCode() === android.view.KeyEvent.KEYCODE_BACK) {
                // when hiding the keyboard with the back button also blur
                const owner = this.owner && this.owner.get();
                if (owner) {
                    owner.clearFocus();
                    return true;
                }
            }
            return super.dispatchKeyEventPreIme(event);
        }
    }
    TextInputEditText = TextInputEditTextImpl as any;
}

export class TextField extends TextFieldBase {
    editText: android.support.design.widget.TextInputEditText;
    layoutView: android.support.design.widget.TextInputLayout;

    // nativeViewProtected: android.support.design.widget.TextInputLayout;
    constructor() {
        super();
    }
    get nativeTextViewProtected() {
        return this.editText as android.support.design.widget.TextInputEditText;
    }

    drawingBackground = false;
    get nativeViewProtected() {
        if (this.drawingBackground) {
            return this.editText;
        }
        return this.layoutView;
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
        let editText: TextInputEditText;

        initTextInputEditText();
        if (layoutId !== 0) {
            layout = this.layoutView = android.view.LayoutInflater.from(this._context).inflate(layoutId, null, false) as android.support.design.widget.TextInputLayout;
            editText = this.editText = (layout.getChildAt(0) as android.widget.FrameLayout).getChildAt(0) as TextInputEditText;
        } else {
            layout = this.layoutView = new android.support.design.widget.TextInputLayout(this._context);
            editText = this.editText = new TextInputEditText(layout.getContext());
            editText.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.FrameLayout.LayoutParams.MATCH_PARENT, android.widget.FrameLayout.LayoutParams.WRAP_CONTENT));
            layout.addView(editText);
        }
        editText.owner = new WeakRef(this);
        // this.editText.setSupportBackgroundTintList(android.content.res.ColorStateList.valueOf(new Color('orange').android));
        layout.setFocusableInTouchMode(true); // to prevent focus on view creation
        // layout.setFocusable(true);
        // layout.setAddStatesFromChildren(true);
        // layout.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
        // layout.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
        return layout;
    }

    _redrawNativeBackground(value: android.graphics.drawable.Drawable | Background): void {
        // trick for the background to be applied to the editText so that it removes the border line
        this.drawingBackground = true;
        super._redrawNativeBackground(value);
        this.drawingBackground = false;
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
    public requestFocus() {
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
    public clearFocus() {
        handleClearFocus(this.nativeViewProtected);
        this.dismissSoftInput();
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
        this.layoutView.setCounterEnabled(value > 0);
        this.layoutView.setCounterMaxLength(value);
    }

    [floatingProperty.setNative](value: boolean) {
        this.layoutView.setHintEnabled(!!value);
    }

    [highlightColorProperty.setNative](value: Color) {
        console.log('highlightColor', value);
        const color = value instanceof Color ? value.android : value;
        this.editText.setSupportBackgroundTintList(getFocusedColorStateList(color, this.style['variant']));
        // this.editText.setBackgroundTintList(android.content.res.ColorStateList.valueOf(color));
    }
}
