import { Color, Frame, Page, Utils, View } from '@nativescript/core';
import { DismissReasons, SnackBarAction, SnackBarBase, SnackBarOptions } from './snackbar-common';

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
    private static _SNACKBAR_TEXT_ID;

    get SNACKBAR_TEXT_ID() {
        if (!SnackBar._SNACKBAR_TEXT_ID) {
            SnackBar._SNACKBAR_TEXT_ID = getMaterialR('id', 'snackbar_text');
        }
        return SnackBar._SNACKBAR_TEXT_ID;
    }
    private _snackbar: com.google.android.material.snackbar.Snackbar;
    private _snackbarCallback: any;
    constructor(options?: SnackBarOptions) {
        super(options);
    }

    public initSnack(options: SnackBarOptions, resolve?: Function) {
        options.hideDelay = options.hideDelay ? options.hideDelay : 3000;

        let attachView = options.view;
        if (!attachView) {
            attachView = Frame.topmost().currentPage;
            const modalViews = attachView._getRootModalViews();
            if (modalViews.length) {
                attachView = modalViews[modalViews.length - 1] as View;
            }
        }
        const page = attachView instanceof Page ? attachView : attachView.page;
        let nView = (page.nativeViewProtected as android.view.View).getParent();
        let nCoordinatorLayout: androidx.coordinatorlayout.widget.CoordinatorLayout = (page as any).nCoordinatorLayout;
        if (!nCoordinatorLayout && !(nView instanceof androidx.coordinatorlayout.widget.CoordinatorLayout) && nView instanceof android.view.ViewGroup) {
            nCoordinatorLayout = new androidx.coordinatorlayout.widget.CoordinatorLayout(attachView._context);

            if (options.view) {
                const nAttachedView = options.view.nativeViewProtected as android.view.View;
                const params = new android.widget.FrameLayout.LayoutParams(nAttachedView.getWidth(), nAttachedView.getHeight());
                params.gravity = android.view.Gravity.BOTTOM;
                const locationArray = Array.create('int', 2);
                options.view.nativeViewProtected.getLocationOnScreen(locationArray);
                params.bottomMargin = nView.getHeight() - locationArray[1] - nAttachedView.getHeight();
                nView.addView(nCoordinatorLayout, params);
            } else {
                (nView as any).addView(nCoordinatorLayout, new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT));
            }

            nView = nCoordinatorLayout;
        }
        this._snackbar = com.google.android.material.snackbar.Snackbar.make(nView as any, options.message, options.hideDelay);
        if (options.anchorView) {
            this._snackbar.setAnchorView(options.anchorView.nativeViewProtected);
        }
        // this._snackbar.setText(options.message);
        // this._snackbar.setDuration(options.hideDelay);

        // set text color of the TextView in the Android SnackBar
        if (options.textColor && Color.isValid(options.textColor)) {
            const color = (options.textColor instanceof Color ? options.textColor : new Color(options.textColor)).android;

            if ((this._snackbar as any).setTextColor) {
                (this._snackbar as any).setTextColor(color);
            } else {
                const mainTextView = this._snackbar.getView().findViewById(this.SNACKBAR_TEXT_ID) as android.widget.TextView;
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
            const tv = sbView.findViewById(this.SNACKBAR_TEXT_ID) as android.widget.TextView;
            tv.setMaxLines(options.maxLines);
        }

        // set RTL for snackbar
        // https://github.com/Akylas/nativescript-snackbar/issues/26
        if (options.isRTL === true) {
            const sbView = this._snackbar.getView();
            const tv = sbView.findViewById(this.SNACKBAR_TEXT_ID);
            tv.setLayoutDirection(android.view.View.LAYOUT_DIRECTION_RTL);
        }
        if (resolve) {
            const listener = new android.view.View.OnClickListener({
                onClick: (args) => {
                    resolve({
                        command: SnackBarAction.ACTION,
                        reason: _getReason(1),
                        event: args
                    });
                    if (this._snackbarCallback) {
                        this._snackbarCallback.cb = null;
                        this._snackbarCallback = null;
                    }
                    this._snackbar = null;
                }
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
                        event
                    });
                    (cb as any).resolve.resolve = null;
                }
                (cb as any).nListener = null;
                if (nCoordinatorLayout) {
                    const parent = nCoordinatorLayout.getParent() as android.view.ViewGroup;
                    // in case of the view being in background the parent might already be null
                    if (parent) {
                        parent.removeView(nCoordinatorLayout);
                    }
                    (page as any).nCoordinatorLayout = null;
                }
            },

            onShown(snackbar: com.google.android.material.snackbar.Snackbar) {}
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
                            reason: _getReason(3)
                        });
                    }, 200);
                    this._snackbar = null;
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
