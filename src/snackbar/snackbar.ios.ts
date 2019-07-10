import { Color } from 'color';
import { DismissReasons, SnackBarBase, SnackBarOptions } from './snackbar-common';
import { SnackBarAction } from './snackbar';

export class SnackBar extends SnackBarBase {
    private _snackbarManager: MDCSnackbarManager = null;
    private _isDismissedManual: boolean = false;

    constructor(options?: SnackBarOptions) {
        super(options);
    }

    private _setBackgroundColor(color) {
        if (color) {
            this._snackbarManager.snackbarMessageViewBackgroundColor = new Color(color).ios;
        }
    }

    private _setTextColor(color) {
        if (color) {
            this._snackbarManager.messageTextColor = new Color(color).ios;
        }
    }

    public simple(message: string, textColor?: string, backgroundColor?: string, maxLines?: number, isRTL?: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            const timeout = 3; // iOS uses seconds

            try {
                if (!message) {
                    reject('Snack text is required.');
                    return;
                }

                this._snackbarManager = MDCSnackbarManager.defaultManager;

                this._snackbarManager.messageTextColor = null;
                this._snackbarManager.snackbarMessageViewBackgroundColor = null;

                const snackBarMessage = (this._message = MDCSnackbarMessage.new());

                snackBarMessage.text = message;
                snackBarMessage.duration = timeout;
                snackBarMessage.completionHandler = () => {
                    resolve({
                        action: 'Dismiss',
                        reason: DismissReasons.TIMEOUT
                    });
                };

                if (textColor && Color.isValid(textColor)) {
                    this._setTextColor(textColor);
                }

                if (backgroundColor && Color.isValid(backgroundColor)) {
                    this._setBackgroundColor(backgroundColor);
                }
            } catch (ex) {
                reject(ex);
            }
        });
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
        options.actionText = options.actionText ? options.actionText : 'Close';
        options.hideDelay = (options.hideDelay ? options.hideDelay : 3000) / 1000; // iOS uses seconds

        /**
         * The MDCSnackbarMessageDurationMax set the max duration to 10s.
         * Any value above this will crash the app.
         * https://github.com/material-components/material-components-web/issues/153#issuecomment-269664203
         */
        if (options.hideDelay > 10) {
            options.hideDelay = 10;
        }

        this._snackbarManager = MDCSnackbarManager.defaultManager;

        this._snackbarManager.messageTextColor = null;
        this._snackbarManager.snackbarMessageViewBackgroundColor = null;

        const message = MDCSnackbarMessage.alloc().init();
        const button = MDCSnackbarMessageAction.alloc().init();

        button.title = options.actionText;

        message.text = options.message;
        message.duration = options.hideDelay;
        message.action = button;
        message.completionHandler = (userInitiated: boolean) => {
            this._shown = false;
            resolve({
                action: SnackBarAction.DISMISS,
                reason: userInitiated ? DismissReasons.ACTION : DismissReasons.TIMEOUT
            });
        };

        if (options.textColor && Color.isValid(options.textColor)) {
            this._setTextColor(options.textColor);
        }

        if (options.actionTextColor && Color.isValid(options.actionTextColor)) {
            message.buttonTextColor = new Color(options.actionTextColor).ios;
        }

        if (options.backgroundColor && Color.isValid(options.backgroundColor)) {
            this._setBackgroundColor(options.backgroundColor);
        }

        this._snackbarManager.showMessage(message);
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
