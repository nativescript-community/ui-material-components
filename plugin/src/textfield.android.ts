import * as common from './textfield.common';
import {
    EditableTextBase,
    textProperty,
    hintProperty,
    placeholderColorProperty,
    Color,
    widthProperty,
    heightProperty,
    marginProperty,
    marginLeftProperty,
    minWidthProperty,
    marginBottomProperty,
    marginTopProperty,
    marginRightProperty,
    Length,
    PercentLength,
    maxLengthProperty
} from 'tns-core-modules/ui/editable-text-base/editable-text-base';
export const FrameLayout = android.widget.FrameLayout;
export const LinearLayout = android.widget.LinearLayout;

declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _configureEditText(editText);
        _onReturnPress();
        _dirtyTextAccumulator: string;
        _changeFromCode: boolean;
        _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean);
        _redrawNativeBackground(value: android.graphics.drawable.Drawable | Background);
    }
}
import { ad } from 'utils/utils';
import { Background } from 'tns-core-modules/ui/styling/background';
import { errorColorProperty, floatingProperty, helperTextProperty } from './cssproperties';

interface EditTextListeners extends android.text.TextWatcher, android.view.View.OnFocusChangeListener, android.widget.TextView.OnEditorActionListener {}

interface EditTextListenersClass {
    prototype: EditTextListeners;
    new (owner: EditableTextBase): EditTextListeners;
}

let EditTextListeners: EditTextListenersClass;

// https://github.com/NativeScript/NativeScript/issues/2942
export let dismissKeyboardTimeoutId: any;
export let dismissKeyboardOwner: WeakRef<EditableTextBase>;
function clearDismissTimer(): void {
    dismissKeyboardOwner = null;
    if (dismissKeyboardTimeoutId) {
        clearTimeout(dismissKeyboardTimeoutId);
        dismissKeyboardTimeoutId = null;
    }
}

function dismissSoftInput(owner: EditableTextBase): void {
    clearDismissTimer();
    if (!dismissKeyboardTimeoutId) {
        dismissKeyboardTimeoutId = setTimeout(() => {
            const owner = dismissKeyboardOwner && dismissKeyboardOwner.get();
            const activity = (owner && owner._context) as android.support.v7.app.AppCompatActivity;
            const nativeView = owner && owner.nativeViewProtected;
            dismissKeyboardTimeoutId = null;
            dismissKeyboardOwner = null;
            const focused = activity && activity.getCurrentFocus();
            if (!focused || !(focused instanceof android.widget.EditText)) {
                ad.dismissSoftInput(nativeView);
            }
        }, 10);
    }
}
function initializeEditTextListeners(): void {
    if (EditTextListeners) {
        return;
    }

    @Interfaces([android.text.TextWatcher, android.view.View.OnFocusChangeListener, android.widget.TextView.OnEditorActionListener])
    class EditTextListenersImpl extends java.lang.Object implements android.text.TextWatcher, android.view.View.OnFocusChangeListener, android.widget.TextView.OnEditorActionListener {
        constructor(private owner: TextField) {
            super();
            return global.__native(this);
        }

        public beforeTextChanged(text: string, start: number, count: number, after: number): void {
            //
        }

        public onTextChanged(text: string, start: number, before: number, count: number): void {
            // const owner = this.owner;
            // let selectionStart = owner.android.getSelectionStart();
            // owner.android.removeTextChangedListener(owner._editTextListeners);
            // owner.android.addTextChangedListener(owner._editTextListeners);
            // owner.android.setSelection(selectionStart);
        }

        public afterTextChanged(editable: android.text.IEditable): void {
            const owner = this.owner;
            if (!owner || owner._changeFromCode) {
                return;
            }

            switch (owner.updateTextTrigger) {
                case 'focusLost':
                    owner._dirtyTextAccumulator = editable.toString();
                    break;
                case 'textChanged':
                    textProperty.nativeValueChange(owner, editable.toString());
                    break;
                default:
                    throw new Error('Invalid updateTextTrigger: ' + owner.updateTextTrigger);
            }
        }

        public onFocusChange(view: android.view.View, hasFocus: boolean): void {
            const owner = this.owner;
            if (!owner) {
                return;
            }

            if (hasFocus) {
                clearDismissTimer();
                owner.notify({ eventName: EditableTextBase.focusEvent, object: owner });
            } else {
                if (owner._dirtyTextAccumulator || owner._dirtyTextAccumulator === '') {
                    textProperty.nativeValueChange(owner, owner._dirtyTextAccumulator);
                    owner._dirtyTextAccumulator = undefined;
                }

                owner.notify({ eventName: EditableTextBase.blurEvent, object: owner });
                dismissSoftInput(owner);
            }
        }

        public onEditorAction(textView: android.widget.TextView, actionId: number, event: android.view.KeyEvent): boolean {
            const owner = this.owner;
            if (!owner) {
                return false;
            }

            if (
                actionId === android.view.inputmethod.EditorInfo.IME_NULL ||
                actionId === android.view.inputmethod.EditorInfo.IME_ACTION_UNSPECIFIED ||
                actionId === android.view.inputmethod.EditorInfo.IME_ACTION_DONE ||
                actionId === android.view.inputmethod.EditorInfo.IME_ACTION_GO ||
                actionId === android.view.inputmethod.EditorInfo.IME_ACTION_SEARCH ||
                actionId === android.view.inputmethod.EditorInfo.IME_ACTION_SEND ||
                (event && event.getKeyCode() === android.view.KeyEvent.KEYCODE_ENTER)
            ) {
                // If it is TextField, close the keyboard. If it is TextView, do not close it since the TextView is multiline
                // https://github.com/NativeScript/NativeScript/issues/3111
                if (textView.getMaxLines() === 1) {
                    owner.dismissSoftInput();
                }

                owner._onReturnPress();
            }

            // If action is ACTION_NEXT then do not close keyboard
            if (actionId === android.view.inputmethod.EditorInfo.IME_ACTION_NEXT || actionId === android.view.inputmethod.EditorInfo.IME_ACTION_PREVIOUS) {
                owner._onReturnPress();
            }

            return false;
        }
    }

    EditTextListeners = EditTextListenersImpl;
}

export class TextField extends common.TextField {
    // nativeViewProtected: android.support.design.widget.TextInputLayout;
    editText: android.support.design.widget.TextInputEditText;
    layoutView: android.support.design.widget.TextInputLayout;
    constructor() {
        super();
    }
    onResumeNativeUpdates() {
        super.onResumeNativeUpdates();
        this.editText.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT));
    }
    // [widthProperty.getDefault](): PercentLength {
    //     console.log('getting default width');
    //     return { value: 1, unit: '%' };
    // }
    [widthProperty.setNative](value: PercentLength) {
        // console.log('widthProperty.setNative', value);
        this._settingLayout = true;
        super[widthProperty.setNative](value);
        this._settingLayout = false;
    }
    [minWidthProperty.setNative](value) {
        this._settingLayout = true;
        super[minWidthProperty.setNative](value);
        this._settingLayout = false;
    }
    // [heightProperty.getDefault]() {
    //     this._settingLayout = true;
    //     const result = super[heightProperty.getDefault]();
    //     this._settingLayout = false;
    //     return result;
    // }
    [heightProperty.setNative](value: PercentLength) {
        this._settingLayout = true;
        super[heightProperty.setNative](value);
        this._settingLayout = false;
    }
    [marginLeftProperty.setNative](value) {
        this._settingLayout = true;
        super[marginLeftProperty.setNative](value);
        this._settingLayout = false;
    }
    [marginRightProperty.setNative](value) {
        this._settingLayout = true;
        super[marginRightProperty.setNative](value);
        this._settingLayout = false;
    }
    [marginTopProperty.setNative](value) {
        this._settingLayout = true;
        super[marginTopProperty.setNative](value);
        this._settingLayout = false;
    }
    [marginBottomProperty.setNative](value) {
        this._settingLayout = true;
        super[marginBottomProperty.setNative](value);
        this._settingLayout = false;
    }

    get nativeViewProtected() {
        // trick to get return the TextInputLayout when adding the view but the TextInputEditText when setting props as we subclass TextField
        if (this.viewInit && this._settingLayout) {
            // console.log('returning layout');
            return this.layoutView;
        }
        return this.editText;
    }

    get android(): android.support.design.widget.TextInputLayout {
        return this.nativeView;
    }

    public layoutNativeView(left: number, top: number, right: number, bottom: number): void {
        const oldValue = this._settingLayout;
        this._settingLayout = true;
        super.layoutNativeView(left, top, bottom, left);
        this._settingLayout = oldValue;
    }
    public createNativeView() {
        initializeEditTextListeners();
        const view = (this.layoutView = new android.support.design.widget.TextInputLayout(this._context));
        const editText = (this.editText = new android.support.design.widget.TextInputEditText(view.getContext()));
        this._configureEditText(editText);
        const listeners = new EditTextListeners(this);
        editText.addTextChangedListener(listeners);
        editText.setOnFocusChangeListener(listeners);
        editText.setOnEditorActionListener(listeners);
        (<any>editText).listener = listeners;
        view.setFocusable(true);
        view.setFocusableInTouchMode(true);
        view.addView(editText);
        return view;
    }

    viewInit = false;
    _settingLayout = false;
    public initNativeView() {
        super.initNativeView();
        this.viewInit = true;
    }

    public _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean): void {
        this._settingLayout = true;
        super._setupUI(context, atIndex, parentIsLoaded);
        this.editText.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT));
        this._settingLayout = false;
    }

    _redrawNativeBackground(value: android.graphics.drawable.Drawable | Background): void {
        this._settingLayout = true;
        super._redrawNativeBackground(value);
        this._settingLayout = false;
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
        this.layoutView.setDefaultHintTextColor(android.content.res.ColorStateList.valueOf(color));
    }

    blur() {
        this.dismissSoftInput();
        this.nativeViewProtected.clearFocus();
    }

    [errorColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        this.layoutView.setErrorTextColor(android.content.res.ColorStateList.valueOf(color));
    }

    [helperTextProperty.setNative](value: string) {
        this.layoutView.setHelperText(value);
    }

    [maxLengthProperty.setNative](value: number) {
        this.layoutView.setCounterMaxLength(value);
    }

    [floatingProperty.setNative](value: boolean) {}

}
