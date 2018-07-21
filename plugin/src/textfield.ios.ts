import * as common from './textfield.common';
import { EditableTextBase, textProperty, hintProperty, placeholderColorProperty, Color, FormattedString } from 'tns-core-modules/ui/editable-text-base/editable-text-base';
import { maxLengthProperty, helperTextProperty, errorColorProperty, floatingProperty } from './cssproperties';

let colorScheme: MDCSemanticColorScheme;
function getColorScheme() {
    if (!colorScheme) {
        colorScheme = MDCSemanticColorScheme.new();
    }
    return colorScheme;
}

function splice(value: string, start: number, delCount: number, newSubStr: string) {
    return value.slice(0, start) + newSubStr + value.slice(start + Math.abs(delCount));
}
function _updateCharactersInRangeReplacementString(formattedText: FormattedString, rangeLocation: number, rangeLength: number, replacementString: string): void {
    let deletingText = !replacementString;
    let currentLocation = 0;
    for (let i = 0, length = formattedText.spans.length; i < length; i++) {
        let span = formattedText.spans.getItem(i);
        if (currentLocation <= rangeLocation && rangeLocation < currentLocation + span.text.length) {
            let newText = splice(span.text, rangeLocation - currentLocation, deletingText ? rangeLength : 0, replacementString);
            (span as any)._setTextInternal(newText);
            return;
        }
        currentLocation += span.text.length;
    }
}

declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _updateAttributedPlaceholder();
        // _configureEditText(editText);
        // _onReturnPress();
        // _dirtyTextAccumulator: string;
        // _changeFromCode: boolean;
        // _setupUI(context, atIndex?: number, parentIsLoaded?: boolean);
    }
}

class MDCTextFieldDelegateImpl extends NSObject implements UITextFieldDelegate {
    public static ObjCProtocols = [UITextFieldDelegate];

    private _owner: WeakRef<TextField>;
    private firstEdit: boolean;

    public static initWithOwner(owner: WeakRef<TextField>): MDCTextFieldDelegateImpl {
        const delegate = <MDCTextFieldDelegateImpl>MDCTextFieldDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    }

    public textFieldShouldBeginEditing(textField: UITextField): boolean {
        this.firstEdit = true;
        const owner = this._owner.get();
        if (owner) {
            return owner.editable;
        }

        return true;
    }

    public textFieldDidBeginEditing(textField: UITextField): void {
        const owner = this._owner.get();
        if (owner) {
            owner.notify({ eventName: TextField.focusEvent, object: owner });
        }
    }

    public textFieldDidEndEditing(textField: UITextField) {
        const owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === 'focusLost') {
                textProperty.nativeValueChange(owner, textField.text);
            }

            owner.dismissSoftInput();
        }
    }

    public textFieldShouldClear(textField: UITextField) {
        this.firstEdit = false;
        const owner = this._owner.get();
        if (owner) {
            textProperty.nativeValueChange(owner, '');
        }

        return true;
    }


    public textFieldShouldReturn(textField: UITextField): boolean {
        // Called when the user presses the return button.
        const owner = this._owner.get();
        if (owner) {
            owner.dismissSoftInput();
            owner.notify({ eventName: TextField.returnPressEvent, object: owner });
        }

        return true;
    }

    public textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacementString: string): boolean {
        const owner = this._owner.get();
        if (owner) {
            const delta = replacementString.length - range.length;
            if (delta > 0) {
                if (textField.text.length + delta > owner.maxLength) {
                    return false;
                }
            }

            if (owner.updateTextTrigger === 'textChanged') {
                if (textField.secureTextEntry && this.firstEdit) {
                    textProperty.nativeValueChange(owner, replacementString);
                } else {
                    if (range.location <= textField.text.length) {
                        const newText = NSString.stringWithString(textField.text).stringByReplacingCharactersInRangeWithString(range, replacementString);
                        textProperty.nativeValueChange(owner, newText);
                    }
                }
            }

            if (owner.formattedText) {
                _updateCharactersInRangeReplacementString(owner.formattedText, range.location, range.length, replacementString);
            }
        }

        this.firstEdit = false;
        return true;
    }
}

export class TextField extends common.TextField {
    _controller: MDCTextInputControllerUnderline;
    _ios: MDCTextField;
    _delegate: MDCTextFieldDelegateImpl;
    public createNativeView() {
        let view = (this._ios = MDCTextField.new());
        this._controller = MDCTextInputControllerUnderline.alloc().initWithTextInput(view);
        this._delegate = MDCTextFieldDelegateImpl.initWithOwner(new WeakRef(this));
        return view;
    }

    public dismissSoftInput() {
        if (this.nativeViewProtected.isFirstResponder) {
            super.dismissSoftInput();
        }
    }
    get ios(): MDCTextField {
        return this._ios;
    }

    public onLoaded() {
        super.onLoaded();
        this._ios.delegate = this._delegate;
    }

    public onUnloaded() {
        this._ios.delegate = null;
        super.onUnloaded();
    }

    blur() {
        this.dismissSoftInput();
    }

    [placeholderColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.floatingPlaceholderActiveColor = color;
        console.log('placeholderColorProperty', color, this.nativeViewProtected);
        this._updateAttributedPlaceholder();
    }
    [errorColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.errorColor = color;
        console.log('errorColorProperty', color, this.nativeViewProtected);
    }
    [helperTextProperty.setNative](value: string) {
        this._controller.helperText = value;
        console.log('helperTextProperty', value, this.nativeViewProtected);
    }
    [maxLengthProperty.setNative](value: number) {
        this._controller.characterCountMax = value;
        console.log('maxLengthProperty', value, this.nativeViewProtected);
    }
    [floatingProperty.setNative](value: boolean) {
        this._controller.floatingEnabled = value;
        console.log('floatingProperty', value, this.nativeViewProtected);
    }

}
