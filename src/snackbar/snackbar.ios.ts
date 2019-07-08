import { Color } from 'color';
import { DismissReasons, SnackBarOptions } from './snackbar-common';

export class SnackBar {
    private _snackbar: MDCSnackbarManager = null;
    private _isDismissedManual: boolean = false;

    private _setBackgroundColor(color) {
        if (color) {
            this._snackbar.snackbarMessageViewBackgroundColor = new Color(color).ios;
        }
    }

    private _setTextColor(color) {
        if (color) {
            this._snackbar.messageTextColor = new Color(color).ios;
        }
    }

    public simple(snackText: string, textColor?: string, backgroundColor?: string, maxLines?: number, isRTL?: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            const timeout = 3; // iOS uses seconds

            try {
                if (!snackText) {
                    reject('Snack text is required.');
                    return;
                }

                this._snackbar = MDCSnackbarManager.defaultManager;

                this._snackbar.messageTextColor = null;
                this._snackbar.snackbarMessageViewBackgroundColor = null;

                const message = MDCSnackbarMessage.alloc().init();

                message.text = snackText;
                message.duration = timeout;
                message.completionHandler = () => {
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

                this._snackbar.showMessage(message);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    public action(options: SnackBarOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
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

                this._snackbar = MDCSnackbarManager.defaultManager;

                this._snackbar.messageTextColor = null;
                this._snackbar.snackbarMessageViewBackgroundColor = null;

                const message = MDCSnackbarMessage.alloc().init();
                const button = MDCSnackbarMessageAction.alloc().init();

                button.title = options.actionText;

                message.text = options.snackText;
                message.duration = options.hideDelay;
                message.action = button;
                message.completionHandler = (userInitiated: boolean) => {
                    resolve({
                        action: 'Dismiss',
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

                this._snackbar.showMessage(message);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    public dismiss(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!!this._snackbar) {
                try {
                    this._isDismissedManual = true;
                    this._snackbar.dismissAndCallCompletionBlocksWithCategory(null);

                    // Return AFTER the item is dismissed, 200ms delay
                    setTimeout(() => {
                        resolve({
                            action: 'Dismiss',
                            reason: DismissReasons.MANUAL
                        });
                    }, 200);
                } catch (ex) {
                    reject(ex);
                }
            } else {
                resolve({
                    action: 'None',
                    message: 'No actionbar to dismiss'
                });
            }
        });
    }
}
