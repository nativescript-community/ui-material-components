import { Color } from 'color';
import { getRippleColor, themer } from 'nativescript-material-core/core';
import { DismissReasons, SnackBarAction, SnackBarBase, SnackBarOptions } from './snackbar-common';

declare class SnackbarMessageView extends MDCSnackbarMessageView {
    message(): SnackbarMessage;
}
declare class SnackbarMessage extends MDCSnackbarMessage {
    viewClass(): typeof NSObject;
}

class MDCSnackbarManagerDelegateImpl extends NSObject implements MDCSnackbarManagerDelegate {
    public static ObjCProtocols = [MDCSnackbarManagerDelegate];

    private _owner: WeakRef<SnackBar>;

    public static initWithOwner(owner: WeakRef<SnackBar>): MDCSnackbarManagerDelegateImpl {
        const impl = <MDCSnackbarManagerDelegateImpl>MDCSnackbarManagerDelegateImpl.new();
        impl._owner = owner;
        return impl;
    }
    willPresentSnackbarWithMessageView(messageView: SnackbarMessageView) {
        const owner = this._owner.get();
        if (owner) {
            const options = owner._options;
            // console.log('willPresentSnackbarWithMessageView', messageView, messageView.message, options);

            const accentColor = themer.getAccentColor();
            if (accentColor) {
                const buttons = messageView.actionButtons;
                const color = (accentColor instanceof Color ? accentColor : new Color(accentColor)).ios;
                buttons.enumerateObjectsUsingBlock(button => {
                    button.setTitleColorForState(color, UIControlState.Normal);
                    button.setTitleColorForState(color, UIControlState.Highlighted);
                    button.inkColor = getRippleColor(accentColor);
                });
            }
            const colorScheme = themer.getAppColorScheme() as MDCColorScheming;
            if (colorScheme) {
                MDCSnackbarColorThemer.applySemanticColorSchemeToSnackbarManager(colorScheme, owner._snackbarManager);
            }

            if (options.textColor && Color.isValid(options.textColor)) {
                messageView.messageTextColor = (options.textColor instanceof Color ? options.textColor : new Color(options.textColor)).ios;
            }

            if (options.actionTextColor && Color.isValid(options.actionTextColor)) {
                const color = (options.actionTextColor instanceof Color ? options.actionTextColor : new Color(options.actionTextColor)).ios;
                const buttons = messageView.actionButtons;
                buttons.enumerateObjectsUsingBlock(button => {
                    button.setTitleColorForState(color, UIControlState.Normal);
                    button.setTitleColorForState(color, UIControlState.Highlighted);
                    button.inkColor = getRippleColor(options.actionTextColor);
                });

                // message.buttonTextColor =
            }

            if (options.backgroundColor && Color.isValid(options.backgroundColor)) {
                messageView.snackbarMessageViewBackgroundColor = (options.backgroundColor instanceof Color ? options.backgroundColor : new Color(options.backgroundColor)).ios;
            }
        }
    }
}

export class SnackBar extends SnackBarBase {
    public _snackbarManager: MDCSnackbarManager = null;
    private _isDismissedManual: boolean = false;

    constructor(options?: SnackBarOptions) {
        super(options);
    }

    // get snackbarManager() {
    //     if (!SnackBar._snackbarManager) {
    //         SnackBar._snackbarManager =  MDCSnackbarManager.defaultManager;
    //         SnackBar._snackbarManager.delegate
    //     }
    // }

    private _shown = false;
    private _message: MDCSnackbarMessage;

    public show() {
        return new Promise((resolve, reject) => {
            try {
                // if (!this._snackbar) {
                this.initSnack(this._options, resolve);
                // }
                if (!this._shown) {
                    this._snackbarManager.showMessage(this._message);
                    this._shown = true;
                }
            } catch (ex) {
                reject(ex);
            }
        });
        // if (!this._shown) {
        //     this._snackbarManager.showMessage(this._message);
        //     this._shown = true;
        // }
    }

    public initSnack(options: SnackBarOptions, resolve?: Function) {
        // options.actionText = options.actionText ? options.actionText : 'Close';
        options.hideDelay = (options.hideDelay ? options.hideDelay : 3000) / 1000; // iOS uses seconds

        /**
         * The MDCSnackbarMessageDurationMax set the max duration to 10s.
         * Any value above this will crash the app.
         * https://github.com/material-components/material-components-web/issues/153#issuecomment-269664203
         */
        if (options.hideDelay > 10) {
            options.hideDelay = 10;
        }
        const snackbarManager = (this._snackbarManager = MDCSnackbarManager.defaultManager);
        snackbarManager.delegate = MDCSnackbarManagerDelegateImpl.initWithOwner(new WeakRef(this));

        const message = (this._message = SnackbarMessage.new());
        if (options.actionText) {
            const button = MDCSnackbarMessageAction.new();
            button.title = options.actionText;
            message.action = button;
        } else {
            message.action = null;
        }

        message.text = options.message;
        message.duration = options.hideDelay;
        message.completionHandler = (userInitiated: boolean) => {
            this._shown = false;
            this._snackbarManager.delegate = null;
            resolve({
                action: SnackBarAction.DISMISS,
                reason: userInitiated ? DismissReasons.ACTION : DismissReasons.TIMEOUT
            });
        };
    }

    public dismiss(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!!this._snackbarManager) {
                try {
                    this._isDismissedManual = true;
                    this._snackbarManager.dismissAndCallCompletionBlocksWithCategory(null);
                    this._shown = false;

                    // Return AFTER the item is dismissed, 200ms delay
                    setTimeout(() => {
                        this._snackbarManager.delegate = null;
                        resolve({
                            action: SnackBarAction.DISMISS,
                            reason: DismissReasons.MANUAL
                        });
                    }, 200);
                } catch (ex) {
                    reject(ex);
                }
            } else {
                resolve({
                    action: SnackBarAction.NONE,
                    message: 'No actionbar to dismiss'
                });
            }
        });
    }
}

export function showSnack(options: SnackBarOptions) {
    return new SnackBar().showSnack(options);
}
