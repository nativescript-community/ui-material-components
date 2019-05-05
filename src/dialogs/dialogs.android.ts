/**
 * Android specific dialogs functions implementation.
 */

import { android as androidApp } from 'tns-core-modules/application';
import { fromObject } from 'tns-core-modules/data/observable';
import { createViewFromEntry } from 'tns-core-modules/ui/builder/builder';
import { View } from 'tns-core-modules/ui/core/view/view';
import {
    ActionOptions,
    ALERT,
    CANCEL,
    capitalizationType,
    CONFIRM,
    ConfirmOptions,
    DialogOptions,
    getButtonColors,
    getLabelColor,
    inputType,
    isDialogOptions,
    LOGIN,
    LoginOptions,
    LoginResult,
    OK,
    PROMPT,
    PromptOptions,
    PromptResult
} from 'tns-core-modules/ui/dialogs';
import { MDCAlertControlerOptions } from './dialogs';
import { initTextInputEditText } from 'nativescript-material-textfield';

declare module 'tns-core-modules/ui/core/view/view' {
    interface View {
        _setupAsRootView(context: any): void;
        callLoaded(): void;
    }
}

function isString(value): value is string {
    return typeof value === 'string';
}

function createAlertDialog(options?: DialogOptions & MDCAlertControlerOptions): android.support.v7.app.AlertDialog.Builder {
    const activity = androidApp.foregroundActivity as globalAndroid.app.Activity;
    const alert = new android.support.v7.app.AlertDialog.Builder(activity);
    alert.setTitle(options && isString(options.title) ? options.title : null);
    alert.setMessage(options && isString(options.message) ? options.message : null);
    if (options.titleIcon) {
        alert.setIcon(options.titleIcon.android);
    }
    if (options && options.cancelable === false) {
        alert.setCancelable(false);
    }
    if (options.titleIcon) {
        alert.setIcon(options.titleIcon.android);
    }
    if (options.customTitleView) {
        alert.setCustomTitle(options.customTitleView.nativeViewProtected);
    }
    if (options.view) {
        const view =
            options.view instanceof View
                ? options.view
                : createViewFromEntry({
                      moduleName: options.view as string
                  });
        (activity as any)._currentModalCustomView = view;
        view._setupAsRootView(activity);
        view._isAddedToNativeVisualTree = true;
        view.callLoaded();

        // seems necessary to add a frame or the view wont correctly size itself
        const frame = new android.widget.FrameLayout(activity);
        frame.addView(view.nativeViewProtected);
        alert.setView(frame);
    }
    return alert;
}

function showDialog(builder: android.support.v7.app.AlertDialog.Builder, options: DialogOptions & MDCAlertControlerOptions, resolve?: Function) {
    const dlg = builder.show();
    const activity = androidApp.foregroundActivity as globalAndroid.app.Activity;
    if ((activity as any)._currentModalCustomView) {
        const view = (activity as any)._currentModalCustomView as View;
        const context = options.context || {};
        context.closeCallback = function(...originalArgs) {
            dlg.dismiss();
            if (resolve) {
                resolve(originalArgs);
            }
        };
        view.bindingContext = fromObject(context);
    }

    const labelColor = getLabelColor();
    if (labelColor) {
        const textViewId = dlg
            .getContext()
            .getResources()
            .getIdentifier('android:id/alertTitle', null, null);
        if (textViewId) {
            const tv = <android.widget.TextView>dlg.findViewById(textViewId);
            if (tv) {
                tv.setTextColor(labelColor.android);
            }
        }

        const messageTextViewId = dlg
            .getContext()
            .getResources()
            .getIdentifier('android:id/message', null, null);
        if (messageTextViewId) {
            const messageTextView = <android.widget.TextView>dlg.findViewById(messageTextViewId);
            if (messageTextView) {
                messageTextView.setTextColor(labelColor.android);
            }
        }
    }

    let { color, backgroundColor } = getButtonColors();

    if (color) {
        let buttons: android.widget.Button[] = [];
        for (let i = 0; i < 3; i++) {
            let id = dlg
                .getContext()
                .getResources()
                .getIdentifier('android:id/button' + i, null, null);
            buttons[i] = <android.widget.Button>dlg.findViewById(id);
        }

        buttons.forEach(button => {
            if (button) {
                if (color) {
                    button.setTextColor(color.android);
                }
                if (backgroundColor) {
                    button.setBackgroundColor(backgroundColor.android);
                }
            }
        });
    }
    return dlg;
}

function addButtonsToAlertDialog(alert: android.support.v7.app.AlertDialog.Builder, options: ConfirmOptions, callback: Function): void {
    if (!options) {
        return;
    }

    if (options.okButtonText) {
        alert.setPositiveButton(
            options.okButtonText,
            new android.content.DialogInterface.OnClickListener({
                onClick: function(dialog: android.content.DialogInterface, id: number) {
                    dialog.cancel();
                    callback(true);
                }
            })
        );
    }

    if (options.cancelButtonText) {
        alert.setNegativeButton(
            options.cancelButtonText,
            new android.content.DialogInterface.OnClickListener({
                onClick: function(dialog: android.content.DialogInterface, id: number) {
                    dialog.cancel();
                    callback(false);
                }
            })
        );
    }

    if (options.neutralButtonText) {
        alert.setNeutralButton(
            options.neutralButtonText,
            new android.content.DialogInterface.OnClickListener({
                onClick: function(dialog: android.content.DialogInterface, id: number) {
                    dialog.cancel();
                    callback(undefined);
                }
            })
        );
    }
    alert.setOnDismissListener(
        new android.content.DialogInterface.OnDismissListener({
            onDismiss: function() {
                callback(false);
            }
        })
    );
}

export function alert(arg: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            const options = !isDialogOptions(arg) ? { title: ALERT, okButtonText: OK, message: arg + '' } : arg;

            const alert = createAlertDialog(options);

            alert.setPositiveButton(
                options.okButtonText,
                new android.content.DialogInterface.OnClickListener({
                    onClick: function(dialog: android.content.DialogInterface, id: number) {
                        dialog.cancel();
                        resolve();
                    }
                })
            );
            const activity = androidApp.foregroundActivity as globalAndroid.app.Activity;
            alert.setOnDismissListener(
                new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function() {
                        resolve();
                        if ((activity as any)._currentModalCustomView) {
                            const view = (activity as any)._currentModalCustomView;
                            view.callUnloaded();
                            view._tearDownUI(true);
                            view._isAddedToNativeVisualTree = false;
                            (activity as any)._currentModalCustomView = null;
                        }
                    }
                })
            );

            showDialog(alert, options, resolve);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export class AlertDialog {
    dialog: android.support.v7.app.AlertDialog;
    constructor(private options: any) {}
    show() {
        if (!this.dialog) {
            const alert = createAlertDialog(this.options);

            const activity = androidApp.foregroundActivity as globalAndroid.app.Activity;
            alert.setOnDismissListener(
                new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function() {
                        if ((activity as any)._currentModalCustomView) {
                            const view = (activity as any)._currentModalCustomView;
                            view.callUnloaded();
                            view._tearDownUI(true);
                            view._isAddedToNativeVisualTree = false;
                            (activity as any)._currentModalCustomView = null;
                        }
                    }
                })
            );

            this.dialog = showDialog(alert, this.options);
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
            const options = !isDialogOptions(arg)
                ? {
                      title: CONFIRM,
                      okButtonText: OK,
                      cancelButtonText: CANCEL,
                      message: arg + ''
                  }
                : arg;
            const alert = createAlertDialog(options);

            addButtonsToAlertDialog(alert, options, function(result) {
                resolve(result);
            });

            showDialog(alert, options);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

function getLayout(id: string) {
    const context: android.content.Context = androidApp.context;
    return context.getResources().getIdentifier(id, 'layout', context.getPackageName());
}
export function prompt(arg: any): Promise<PromptResult> {
    let options: PromptOptions;

    const defaultOptions = {
        title: PROMPT,
        okButtonText: OK,
        cancelButtonText: CANCEL,
        inputType: inputType.text
    };

    if (arguments.length === 1) {
        if (isString(arg)) {
            options = defaultOptions;
            options.message = arg;
        } else {
            options = arg;
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
            const alert = createAlertDialog(options);
            initTextInputEditText();
            const layout = android.view.LayoutInflater.from(androidApp.foregroundActivity).inflate(getLayout('material_text_field'), null, false) as android.support.design.widget.TextInputLayout;
            const input = (layout.getChildAt(0) as android.widget.FrameLayout).getChildAt(0) as android.support.design.widget.TextInputEditText;

            if (options) {
                if (options.inputType === inputType.password) {
                    input.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD);
                } else if (options.inputType === inputType.email) {
                    input.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
                }

                switch (options.capitalizationType) {
                    case capitalizationType.all: {
                        input.setInputType(input.getInputType() | android.text.InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS);
                        break;
                    }
                    case capitalizationType.sentences: {
                        input.setInputType(input.getInputType() | android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES);
                        break;
                    }
                    case capitalizationType.words: {
                        input.setInputType(input.getInputType() | android.text.InputType.TYPE_TEXT_FLAG_CAP_WORDS);
                        break;
                    }
                }
            }

            input.setText((options && options.defaultText) || '');

            alert.setView(layout);

            const getText = function() {
                return input.getText().toString();
            };

            addButtonsToAlertDialog(alert, options, function(r) {
                resolve({ result: r, text: getText() });
            });

            showDialog(alert, options);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export function login(arg: any): Promise<LoginResult> {
    let options: LoginOptions;
    const defaultOptions = {
        title: LOGIN,
        okButtonText: OK,
        cancelButtonText: CANCEL
    };

    if (arguments.length === 1) {
        if (isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        } else {
            options = arguments[0];
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
            const context = androidApp.foregroundActivity;

            const alert = createAlertDialog(options);

            initTextInputEditText();
            const userNameLayout = android.view.LayoutInflater.from(androidApp.foregroundActivity).inflate(
                getLayout('material_text_field'),
                null,
                false
            ) as android.support.design.widget.TextInputLayout;
            const userNameInput = (userNameLayout.getChildAt(0) as android.widget.FrameLayout).getChildAt(0) as android.support.design.widget.TextInputEditText;
            userNameInput.setText(options.userName ? options.userName : '');

            const passwordLayout = android.view.LayoutInflater.from(androidApp.foregroundActivity).inflate(
                getLayout('material_text_field'),
                null,
                false
            ) as android.support.design.widget.TextInputLayout;
            const passwordInput = (passwordLayout.getChildAt(0) as android.widget.FrameLayout).getChildAt(0) as android.support.design.widget.TextInputEditText;
            passwordInput.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD);
            passwordInput.setText(options.password ? options.password : '');

            const layout = new android.widget.LinearLayout(context);
            layout.setOrientation(1);
            layout.addView(userNameLayout);
            layout.addView(passwordLayout);

            alert.setView(layout);

            addButtonsToAlertDialog(alert, options, function(r) {
                resolve({
                    result: r,
                    userName: userNameInput.getText().toString(),
                    password: passwordInput.getText().toString()
                });
            });

            showDialog(alert, options);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export function action(arg: any): Promise<string> {
    let options: ActionOptions;

    const defaultOptions = { title: null, cancelButtonText: CANCEL };

    if (arguments.length === 1) {
        if (isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        } else {
            options = arguments[0];
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
            const activity = androidApp.foregroundActivity || androidApp.startActivity;
            const alert = new android.support.v7.app.AlertDialog.Builder(activity);
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
                        onClick: function(dialog: android.content.DialogInterface, which: number) {
                            resolve(options.actions[which]);
                        }
                    })
                );
            }

            if (isString(options.cancelButtonText)) {
                alert.setNegativeButton(
                    options.cancelButtonText,
                    new android.content.DialogInterface.OnClickListener({
                        onClick: function(dialog: android.content.DialogInterface, id: number) {
                            dialog.cancel();
                            resolve(options.cancelButtonText);
                        }
                    })
                );
            }

            alert.setOnDismissListener(
                new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function() {
                        if (isString(options.cancelButtonText)) {
                            resolve(options.cancelButtonText);
                        } else {
                            resolve('');
                        }
                    }
                })
            );

            showDialog(alert, options);
        } catch (ex) {
            console.error(ex);
            reject(ex);
        }
    });
}
