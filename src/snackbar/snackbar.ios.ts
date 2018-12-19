import { DismissReasons, SnackBarOptions } from './snackbar-common';

export class SnackBar {
    private _snackbar: MDCSnackbarMessage = null;
    private _isDismissedManual: boolean = false;

    public simple(snackText: string) {
        return new Promise((resolve, reject) => {
            const timeout = 3;

            try {
                MDCSnackbarManager.messageFont = null;
                //   MDCSnackbarManager.buttonFont = null;
                //   [MDCSnackbarManager setButtonTitleColor:null forState:UIControlStateNormal];
                //   [MDCSnackbarManager setButtonTitleColor:null forState:UIControlStateHighlighted];
                // MDCSnackbarManager.messageTextColor = nil;
                // this._snackbar = MDCSnackbarMessage.alloc().init();
                // this._snackbar.text = snackText;
                // this._snackbar.duration = timeout;
                // this._snackbar.action = ()=>{}
                // this._snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                //     snackText,
                //     null,
                //     timeout,
                //     args => {
                //         // Action, Do Nothing, just close it
                //         this._snackbar.dismiss(); // Force close
                //         resolve({
                //             command: 'Dismiss',
                //             reason: DismissReasons.MANUAL,
                //             event: args
                //         });
                //     },
                //     args => {
                //         // Dismissal, Do Nothing
                //         resolve({
                //             command: 'Dismiss',
                //             reason: DismissReasons.TIMEOUT,
                //             event: args
                //         });
                //     }
                // );

                // this._snackbar.show();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    public action(options: SnackBarOptions) {
        return new Promise((resolve, reject) => {
            try {
                if (!options.hideDelay) options.hideDelay = 3000;

                // this._snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                //     options.snackText,
                //     options.actionText,
                //     options.hideDelay / 1000,
                //     args => {
                //         resolve({
                //             command: 'Action',
                //             event: args
                //         });
                //     },
                //     args => {
                //         const reason = this._isDismissedManual ? DismissReasons.MANUAL : DismissReasons.TIMEOUT;

                //         this._isDismissedManual = false; // reset
                //         resolve({
                //             command: 'Dismiss',
                //             reason: reason,
                //             event: args
                //         });
                //     }
                // );

                // this._snackbar.show();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    public dismiss(options) {
        return new Promise((resolve, reject) => {
            if (!!this._snackbar) {
                try {
                    this._isDismissedManual = true;
                    // this._snackbar.dismiss();

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
