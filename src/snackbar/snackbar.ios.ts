import { Color } from '@nativescript/core';
import { getRippleColor, themer } from 'nativescript-material-core/core';
import { DismissReasons, SnackBarAction, SnackBarBase, SnackBarOptions } from './snackbar-common';

export class SnackBar extends SnackBarBase {
    static _snackbarManager: MDCSnackbarManager = MDCSnackbarManager.defaultManager;
    static _messages;

    constructor(options?: SnackBarOptions) {
        super(options);
    }

    private _shown = false;
    private _message: MDCSnackbarMessage;

    public show() {
        return new Promise((resolve, reject) => {
            try {
                // if (!this._snackbar) {
                this.initSnack(this._options, resolve);
                // }
                if (!this._shown) {
                    SnackBar._snackbarManager.showMessage(this._message);
                    this._shown = true;
                }
            } catch (ex) {
                reject(ex);
            }
        });
    }

    prepareView(message: SnackbarMessage, messageView: SnackbarMessageView) {
        const options = this._options;
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
            MDCSnackbarColorThemer.applySemanticColorSchemeToSnackbarManager(colorScheme, SnackBar._snackbarManager);
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
        if (options.view) {
            console.log('attaching to custom view', options.view);
            SnackBar._snackbarManager.setPresentationHostView(options.view.nativeViewProtected);
        } else {
            SnackBar._snackbarManager.setPresentationHostView(null);
        }
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

        const message = (this._message = MDCSnackbarMessage.alloc().init());
        message.snackbarMessageWillPresentBlock = this.prepareView.bind(this);
        if (options.actionText) {
            const button = MDCSnackbarMessageAction.alloc().init();
            button.title = options.actionText;
            message.action = button;
        } else {
            message.action = null;
        }

        message.text = options.message;
        message.duration = options.hideDelay;
        message.completionHandler = (userInitiated: boolean) => {
            this._shown = false;
            resolve({
                action: SnackBarAction.DISMISS,
                reason: userInitiated ? DismissReasons.ACTION : DismissReasons.TIMEOUT
            });
        };
    }

    public dismiss(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!!SnackBar._snackbarManager) {
                try {
                    SnackBar._snackbarManager.dismissAndCallCompletionBlocksWithCategory(null);
                    this._shown = false;

                    // Return AFTER the item is dismissed, 200ms delay
                    setTimeout(() => {
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
