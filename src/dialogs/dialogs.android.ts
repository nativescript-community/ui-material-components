import { TextField } from '@nativescript-community/ui-material-textfield';
import {
    ActionOptions,
    Application,
    Builder,
    CSSUtils,
    ConfirmOptions,
    DialogOptions,
    DialogStrings,
    LoginResult,
    PromptResult,
    StackLayout,
    Utils,
    View,
    capitalizationType,
    fromObject,
    inputType,
} from '@nativescript/core';
import { LoginOptions, MDCAlertControlerOptions, PromptOptions } from './dialogs';
import { isDialogOptions } from './dialogs-common';

export { capitalizationType, inputType };

function isString(value): value is string {
    return typeof value === 'string';
}

function createAlertDialogBuilder(options?: DialogOptions & MDCAlertControlerOptions): androidx.appcompat.app.AlertDialog.Builder {
    const activity = Application.android.foregroundActivity || (Application.android.startActivity as globalAndroid.app.Activity);
    const builder = new androidx.appcompat.app.AlertDialog.Builder(activity);
    builder.setTitle(options && isString(options.title) ? options.title : null);
    builder.setMessage(options && isString(options.message) ? options.message : null);
    if (options.titleIcon) {
        builder.setIcon(options.titleIcon.android);
    }
    if (options && options.cancelable === false) {
        builder.setCancelable(false);
        builder.setOnKeyListener(new android.content.DialogInterface.OnKeyListener({
            onKey( dialog,  keyCode,  event) {
                // Prevent dialog close on back press button
                return keyCode === android.view.KeyEvent.KEYCODE_BACK;
            }
        }));
    }
    if (options.titleIcon) {
        builder.setIcon(options.titleIcon.android);
    }
    if (options.customTitleView) {
        builder.setCustomTitle(options.customTitleView.nativeViewProtected);
    }
    if (options.view) {
        const view =
            options.view instanceof View
                ? options.view
                : Builder.createViewFromEntry({
                    moduleName: options.view as string,
                });

        view.cssClasses.add(CSSUtils.MODAL_ROOT_VIEW_CSS_CLASS);
        const modalRootViewCssClasses = CSSUtils.getSystemCssClasses();
        modalRootViewCssClasses.forEach((c) => view.cssClasses.add(c));

        (builder as any)._currentModalCustomView = view;
        view._setupAsRootView(activity);
        view._isAddedToNativeVisualTree = true;
        view.callLoaded();

        // seems necessary to add a frame or the view wont correctly size itself
        const frame = new android.widget.FrameLayout(activity);
        frame.addView(view.nativeViewProtected);
        builder.setView(frame);
    }
    return builder;
}

function showDialog(dlg: androidx.appcompat.app.AlertDialog, options: DialogOptions & MDCAlertControlerOptions, resolve?: Function) {
    if (options.titleColor) {
        const textViewId = dlg.getContext().getResources().getIdentifier('android:id/alertTitle', null, null);
        if (textViewId) {
            const tv = dlg.findViewById(textViewId) as android.widget.TextView;
            if (tv) {
                tv.setTextColor(options.titleColor.android);
            }
        }
        if (options.messageColor) {
            const messageTextViewId = dlg.getContext().getResources().getIdentifier('android:id/message', null, null);
            if (messageTextViewId) {
                const messageTextView = dlg.findViewById(messageTextViewId) as android.widget.TextView;
                if (messageTextView) {
                    messageTextView.setTextColor(options.messageColor.android);
                }
            }
        }
    }
    // const labelColor = getLabelColor();
    // if (labelColor) {
    //     const textViewId = dlg
    //         .getContext()
    //         .getResources()
    //         .getIdentifier('android:id/alertTitle', null, null);
    //     if (textViewId) {
    //         const tv = <android.widget.TextView>dlg.findViewById(textViewId);
    //         if (tv) {
    //             tv.setTextColor(labelColor.android);
    //         }
    //     }

    //     const messageTextViewId = dlg
    //         .getContext()
    //         .getResources()
    //         .getIdentifier('android:id/message', null, null);
    //     if (messageTextViewId) {
    //         const messageTextView = <android.widget.TextView>dlg.findViewById(messageTextViewId);
    //         if (messageTextView) {
    //             messageTextView.setTextColor(labelColor.android);
    //         }
    //     }
    // }

    // let { color, backgroundColor } = getButtonColors();

    if (options.buttonInkColor || options.buttonTitleColor) {
        const buttons: android.widget.Button[] = [];
        for (let i = 0; i < 3; i++) {
            const id = dlg
                .getContext()
                .getResources()
                .getIdentifier('android:id/button' + i, null, null);
            buttons[i] = dlg.findViewById(id) as android.widget.Button;
        }

        buttons.forEach((button) => {
            if (button) {
                button.setTextColor((options.buttonInkColor || options.buttonTitleColor).android);
            }
        });
    }
    dlg.show();
    return dlg;
}

function prepareAndCreateAlertDialog(builder: androidx.appcompat.app.AlertDialog.Builder, options: ConfirmOptions & MDCAlertControlerOptions, callback?: Function, validationArgs?: (r) => any) {
    // onDismiss will always be called. Prevent calling callback multiple times
    let onDoneCalled = false;
    const onDone = function (result: boolean, dialog?: android.content.DialogInterface) {
        if (options && options.shouldResolveOnAction && !options.shouldResolveOnAction(validationArgs ? validationArgs(result) : result)) {
            return;
        }
        if (onDoneCalled) {
            return;
        }
        onDoneCalled = true;
        if (options.view instanceof View) {
            Utils.android.dismissSoftInput(options.view.nativeView);
        }
        if (dialog) {
            dialog.cancel();
        }
        callback && callback(result);
    };

    const activity = Application.android.foregroundActivity || (Application.android.startActivity as globalAndroid.app.Activity);
    builder.setOnDismissListener(
        new android.content.DialogInterface.OnDismissListener({
            onDismiss() {
                onDone(false);
                if ((builder as any)._currentModalCustomView) {
                    const view = (builder as any)._currentModalCustomView;
                    view.callUnloaded();
                    view._tearDownUI(true);
                    view._isAddedToNativeVisualTree = false;
                    (builder as any)._currentModalCustomView = null;
                }
            },
        })
    );
    const dlg = builder.create();
    if (!options) {
        return dlg;
    }
    if ((builder as any)._currentModalCustomView) {
        const view = (builder as any)._currentModalCustomView as View;
        const context = options.context || {};
        context.closeCallback = function (...originalArgs) {
            dlg.dismiss();
            if (callback) {
                callback.apply(this, originalArgs);
            }
        };
        view.bindingContext = fromObject(context);
    }

    if (options.okButtonText) {
        dlg.setButton(
            android.content.DialogInterface.BUTTON_POSITIVE,
            options.okButtonText,
            null,
            new android.content.DialogInterface.OnClickListener({
                onClick(dialog: android.content.DialogInterface, id: number) {
                    onDone(true, dialog);
                },
            })
        );
        // alert.setPositiveButton(

        // );
    }

    if (options.cancelButtonText) {
        dlg.setButton(
            android.content.DialogInterface.BUTTON_NEGATIVE,
            options.cancelButtonText,
            null,
            new android.content.DialogInterface.OnClickListener({
                onClick(dialog: android.content.DialogInterface, id: number) {
                    onDone(false, dialog);
                },
            })
        );
        // alert.setNegativeButton(
        //     options.cancelButtonText,
        //     new android.content.DialogInterface.OnClickListener({
        //         onClick: function(dialog: android.content.DialogInterface, id: number) {
        //             onDone(false, dialog);
        //         }
        //     })
        // );
    }

    if (options.neutralButtonText) {
        dlg.setButton(
            android.content.DialogInterface.BUTTON_NEUTRAL,
            options.neutralButtonText,
            null,
            new android.content.DialogInterface.OnClickListener({
                onClick(dialog: android.content.DialogInterface, id: number) {
                    onDone(undefined, dialog);
                },
            })
        );
        // alert.setNeutralButton(
        //     options.neutralButtonText,
        //     new android.content.DialogInterface.OnClickListener({
        //         onClick: function(dialog: android.content.DialogInterface, id: number) {
        //             onDone(undefined, dialog);
        //         }
        //     })
        // );
    }
    return dlg;
}

export function alert(arg: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            const defaultOptions = {
                title: DialogStrings.ALERT,
                okButtonText: DialogStrings.OK,
            };
            const options = !isDialogOptions(arg) ? Object.assign(defaultOptions, { message: arg + '' }) : Object.assign(defaultOptions, arg);

            const alert = createAlertDialogBuilder(options);

            const dlg = prepareAndCreateAlertDialog(alert, options);

            showDialog(dlg, options, resolve);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export class AlertDialog {
    dialog: androidx.appcompat.app.AlertDialog;
    constructor(private options: any) {}
    show(resolve?) {
        if (!this.dialog) {
            const alert = createAlertDialogBuilder(this.options);
            this.dialog = alert.create();
            this.dialog = prepareAndCreateAlertDialog(alert, this.options, resolve);
            showDialog(this.dialog, this.options);
        }
    }
    hide() {
        if (this.dialog) {
            this.dialog.cancel();
            this.dialog = null;
        }
    }
}

export function confirm(arg: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const defaultOptions = {
                title: DialogStrings.CONFIRM,
                okButtonText: DialogStrings.OK,
                cancelButtonText: DialogStrings.CANCEL,
            };
            const options = !isDialogOptions(arg)
                ? Object.assign(defaultOptions, {
                    message: arg + '',
                })
                : Object.assign(defaultOptions, arg);
            const alert = createAlertDialogBuilder(options);
            const dlg = prepareAndCreateAlertDialog(alert, options, resolve);
            showDialog(dlg, options, resolve);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export function prompt(arg: any): Promise<PromptResult> {
    let options: PromptOptions & MDCAlertControlerOptions;

    const defaultOptions = {
        title: DialogStrings.PROMPT,
        okButtonText: DialogStrings.OK,
        cancelButtonText: DialogStrings.CANCEL,
        inputType: inputType.text,
    };

    if (arguments.length === 1) {
        if (isString(arg)) {
            options = defaultOptions;
            options.message = arg;
        } else {
            options = Object.assign(defaultOptions, arg);
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.defaultText = arguments[1];
        }
    }

    return new Promise<PromptResult>((resolve, reject) => {
        try {
            const stackLayout = new StackLayout();
            stackLayout.padding = 4;
            const textField = new TextField();
            textField.hint = options.hintText;
            if (options) {
                if (options.textFieldProperties) {
                    Object.assign(textField, options.textFieldProperties);
                }
                if (options.defaultText) {
                    textField.text = options.defaultText;
                }
                if (options.defaultText) {
                    textField.hint = options.hintText;
                }
                if (options.helperText) {
                    textField.helper = options.helperText;
                }
                if (options.inputType === inputType.password) {
                    textField.secure = true;
                } else if (options.inputType === inputType.email) {
                    textField.keyboardType = 'email';
                } else if (options.inputType === inputType.number) {
                    textField.keyboardType = 'number';
                } else if (options.inputType === inputType.phone) {
                    textField.keyboardType = 'phone';
                }

                switch (options.capitalizationType) {
                    case capitalizationType.all: {
                        textField.autocapitalizationType = 'allcharacters';
                        break;
                    }
                    case capitalizationType.sentences: {
                        textField.autocapitalizationType = 'sentences';
                        break;
                    }
                    case capitalizationType.words: {
                        textField.autocapitalizationType = 'words';
                        break;
                    }
                }
            }
            stackLayout.addChild(textField);
            options.view = stackLayout;
            const alert = createAlertDialogBuilder(options);

            const dlg = prepareAndCreateAlertDialog(
                alert,
                options,
                function (r) {
                    resolve({ result: r, text: textField.text });
                },
                (r) => ({ result: r, text: textField.text })
            );

            showDialog(dlg, options, resolve);
            if (!!options.autoFocus) {
                textField.requestFocus();
            }
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export function login(arg: any): Promise<LoginResult> {
    let options: LoginOptions & MDCAlertControlerOptions;
    const defaultOptions = {
        title: DialogStrings.LOGIN,
        okButtonText: DialogStrings.OK,
        cancelButtonText: DialogStrings.CANCEL,
    };

    if (arguments.length === 1) {
        if (isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        } else {
            options = Object.assign(defaultOptions, arguments[0]);
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.userName = arguments[1];
        }
    } else if (arguments.length === 3) {
        if (isString(arguments[0]) && isString(arguments[1]) && isString(arguments[2])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.userName = arguments[1];
            options.password = arguments[2];
        }
    }

    return new Promise<LoginResult>((resolve, reject) => {
        try {
            const stackLayout = new StackLayout();
            stackLayout.padding = 4;
            const userNameTextField = new TextField();
            const passwordTextField = new TextField();
            userNameTextField.hint = options.userNameHint || 'Username';
            userNameTextField.text = options.userName;
            passwordTextField.hint = options.passwordHint || 'Password';
            passwordTextField.text = options.password;
            passwordTextField.secure = true;

            if (options.usernameTextFieldProperties) {
                Object.assign(userNameTextField, options.usernameTextFieldProperties);
            }
            if (options.passwordTextFieldProperties) {
                Object.assign(passwordTextField, options.passwordTextFieldProperties);
            }

            stackLayout.addChild(userNameTextField);
            stackLayout.addChild(passwordTextField);
            options.view = stackLayout;

            const alert = createAlertDialogBuilder(options);

            if (!!options.beforeShow) {
                options.beforeShow(options, userNameTextField, passwordTextField);
            }
            const dlg = prepareAndCreateAlertDialog(
                alert,
                options,
                function (r) {
                    resolve({
                        result: r,
                        userName: userNameTextField.text,
                        password: passwordTextField.text,
                    });
                },
                (r) => ({ result: r, userName: userNameTextField.text, password: passwordTextField.text })
            );
            showDialog(dlg, options, resolve);
            if (!!options.autoFocus) {
                userNameTextField.requestFocus();
            }
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export function action(arg: any): Promise<string> {
    let options: ActionOptions;

    const defaultOptions = { title: null, cancelButtonText: DialogStrings.CANCEL };

    if (arguments.length === 1) {
        if (isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        } else {
            options = Object.assign(defaultOptions, arguments[0]);
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.cancelButtonText = arguments[1];
        }
    } else if (arguments.length === 3) {
        if (isString(arguments[0]) && isString(arguments[1]) && typeof arguments[2] !== 'undefined') {
            options = defaultOptions;
            options.message = arguments[0];
            options.cancelButtonText = arguments[1];
            options.actions = arguments[2];
        }
    }

    return new Promise<string>((resolve, reject) => {
        try {
            const activity = Application.android.foregroundActivity || (Application.android.startActivity as globalAndroid.app.Activity);
            const alert = new androidx.appcompat.app.AlertDialog.Builder(activity);
            const message = options && isString(options.message) ? options.message : '';
            const title = options && isString(options.title) ? options.title : '';
            if (options && options.cancelable === false) {
                alert.setCancelable(false);
            }

            if (title) {
                alert.setTitle(title);
                if (!options.actions) {
                    alert.setMessage(message);
                }
            } else {
                alert.setTitle(message);
            }

            if (options.actions) {
                alert.setItems(
                    options.actions,
                    new android.content.DialogInterface.OnClickListener({
                        onClick(dialog: android.content.DialogInterface, which: number) {
                            resolve(options.actions[which]);
                        },
                    })
                );
            }

            const dlg = prepareAndCreateAlertDialog(alert, options, function (r) {
                if (r === false || r === undefined) {
                    resolve(options.cancelButtonText);
                }
                resolve(r);
            });
            showDialog(dlg, options, resolve);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}
