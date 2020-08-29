import { Color, Page, Frame } from '@nativescript/core';
import { DismissReasons, SnackBarAction, SnackBarBase, SnackBarOptions } from './snackbar-common';
import { android as androidApp } from '@nativescript/core/application';

function _getReason(value: number) {
    switch (value) {
        // Indicates that the Snackbar was dismissed via a swipe.
        case com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback.DISMISS_EVENT_SWIPE:
            return DismissReasons.SWIPE;
        // Indicates that the Snackbar was dismissed via an action click.
        case com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback.DISMISS_EVENT_ACTION:
            return DismissReasons.ACTION;
        // Indicates that the Snackbar was dismissed via a swipe.
        case com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback.DISMISS_EVENT_TIMEOUT:
            return DismissReasons.TIMEOUT;
        // Indicates that the Snackbar was dismissed via a call to dismiss().
        case com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback.DISMISS_EVENT_MANUAL:
            return DismissReasons.MANUAL;
        // Indicates that the Snackbar was dismissed from a new Snackbar being shown.
        case com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback.DISMISS_EVENT_CONSECUTIVE:
            return DismissReasons.CONSECUTIVE;
        default:
            return DismissReasons.UNKNOWN;
    }
}

function getMaterialR(rtype: string, field: string): number {
    return +java.lang.Class.forName('com.google.android.material.R$' + rtype)
        .getDeclaredField(field)
        .get(null);
}

export class SnackBar extends SnackBarBase {
    // Use this to get the textview instance inside the snackbar
    private static SNACKBAR_TEXT_ID;

    get SNACKBAR_TEXT_ID() {
        if (!SnackBar.SNACKBAR_TEXT_ID) {
            SnackBar.SNACKBAR_TEXT_ID = getMaterialR('id', 'snackbar_text');
        }
        return SnackBar.SNACKBAR_TEXT_ID;
    }
    private _snackbar: com.google.android.material.snackbar.Snackbar;
    private _snackbarCallback: any;
    constructor(options?: SnackBarOptions) {
        super(options);
    }

    public initSnack(options: SnackBarOptions, resolve?: Function) {
        // options.actionText = options.actionText ? options.actionText : 'Close';
        options.hideDelay = options.hideDelay ? options.hideDelay : 3000;

        // const activity = androidApp.foregroundActivity || androidApp.startActivity as globalAndroid.app.Activity;
        let attachView = options.view || Frame.topmost().currentPage;
        while (attachView['_modal']) {
            attachView = attachView['_modal'];
        }
        let nView = attachView.nativeViewProtected as android.view.View;
        if (attachView instanceof Page) {
            // in case of a page we try to handle it correctly
            nView = nView.getParent().getParent() as any;
        }
        let nCoordinatorLayout: androidx.coordinatorlayout.widget.CoordinatorLayout;
        if (!(nView instanceof androidx.coordinatorlayout.widget.CoordinatorLayout) && nView instanceof android.view.ViewGroup) {
            nCoordinatorLayout = new androidx.coordinatorlayout.widget.CoordinatorLayout(attachView._context);
            (nView as android.view.ViewGroup).addView(
                nCoordinatorLayout,
                new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT)
            );
            nView = nCoordinatorLayout;
        }
        this._snackbar = com.google.android.material.snackbar.Snackbar.make(nView, options.message, options.hideDelay);

        this._snackbar.setText(options.message);
        this._snackbar.setDuration(options.hideDelay);

        // set text color of the TextView in the Android SnackBar
        if (options.textColor && Color.isValid(options.textColor)) {
            const color = (options.textColor instanceof Color ? options.textColor : new Color(options.textColor)).android;

            if ((this._snackbar as any).setTextColor) {
                (this._snackbar as any).setTextColor(color);
            } else {
                const mainTextView = this._snackbar.getView().findViewById(SnackBar.SNACKBAR_TEXT_ID) as android.widget.TextView;
                if (mainTextView) {
                    mainTextView.setTextColor(color);
                }
            }
            // this._snackbar.setTextColor(color);
        }

        if (options.actionTextColor && Color.isValid(options.actionTextColor)) {
            const color = (options.actionTextColor instanceof Color ? options.actionTextColor : new Color(options.actionTextColor)).android;
            this._snackbar.setActionTextColor(color);
        }

        // set background color
        if (options.backgroundColor && Color.isValid(options.backgroundColor)) {
            const color = (options.backgroundColor instanceof Color ? options.backgroundColor : new Color(options.backgroundColor)).android;
            const sbView = this._snackbar.getView();
            sbView.setBackgroundColor(new Color(color).android);
        }

        // set maxLines for the textview
        // https://github.com/Akylas/nativescript-snackbar/issues/33
        if (options.maxLines) {
            const sbView = this._snackbar.getView();
            const tv = sbView.findViewById(SnackBar.SNACKBAR_TEXT_ID) as android.widget.TextView;
            tv.setMaxLines(options.maxLines);
        }

        // set RTL for snackbar
        // https://github.com/Akylas/nativescript-snackbar/issues/26
        if (options.isRTL === true) {
            const sbView = this._snackbar.getView();
            const tv = sbView.findViewById(SnackBar.SNACKBAR_TEXT_ID);
            tv.setLayoutDirection(android.view.View.LAYOUT_DIRECTION_RTL);
        }
        if (resolve) {
            const listener = new android.view.View.OnClickListener({
                onClick: (args) => {
                    resolve({
                        command: SnackBarAction.ACTION,
                        reason: _getReason(1),
                        event: args,
                    });
                    if (this._snackbarCallback) {
                        (this._snackbarCallback as any).cb = null;
                        this._snackbarCallback = null;
                    }
                    this._snackbar = null;
                },
            });

            // set the action text, click listener
            this._snackbar.setAction(options.actionText, listener);
        }
        const cb = (this._snackbarCallback = new com.nativescript.material.snackbar.SnackCallback());
        const callbackListener = new com.nativescript.material.snackbar.SnackCallback.SnackCallbackListener({
            onDismissed(snackbar: com.google.android.material.snackbar.Snackbar, event: number) {
                // if the dismiss was not caused by the action button click listener
                const resolve = (cb as any).resolve;
                if (event !== com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback.DISMISS_EVENT_ACTION && resolve) {
                    resolve({
                        command: SnackBarAction.DISMISS,
                        reason: _getReason(event),
                        event: event,
                    });
                    (cb as any).resolve.resolve = null;
                }
                (cb as any).nListener = null;
                if (nCoordinatorLayout) {
                    (nCoordinatorLayout.getParent() as android.view.ViewGroup).removeView(nCoordinatorLayout);
                }
            },

            onShown(snackbar: com.google.android.material.snackbar.Snackbar) {},
        });
        cb.setListener(callbackListener);
        (cb as any).nListener = callbackListener; // handles the resolve of the promise
        (cb as any).resolve = resolve; // handles the resolve of the promise
        this._snackbar.addCallback(cb);
    }

    public show() {
        return new Promise((resolve, reject) => {
            try {
                // if (!this._snackbar) {
                this.initSnack(this._options, resolve);
                // }
                if (this._snackbar && !this._snackbar.isShown()) {
                    this._snackbar.show();
                }
            } catch (ex) {
                reject(ex);
            }
        });
        // if (!this._snackbar) {
        //     this.initSnack(this._options);
        // }
        // if (this._snackbar && !this._snackbar.isShown()) {
        //     this._snackbar.show();
        // }
    }

    public dismiss() {
        return new Promise((resolve, reject) => {
            if (this._snackbar) {
                try {
                    this._snackbar.dismiss();
                    // return AFTER the item is dismissed, 200ms delay
                    setTimeout(() => {
                        resolve({
                            action: SnackBarAction.DISMISS,
                            reason: _getReason(3),
                        });
                    }, 200);
                    this._snackbar = null;
                } catch (ex) {
                    reject(ex);
                }
            } else {
                resolve({
                    action: SnackBarAction.NONE,
                    message: 'No actionbar to dismiss',
                });
            }
        });
    }
}

export function showSnack(options: SnackBarOptions) {
    return new SnackBar().showSnack(options);
}
