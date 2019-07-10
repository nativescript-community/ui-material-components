import { Color } from 'tns-core-modules/color';
import { topmost } from 'tns-core-modules/ui/frame';
import { DismissReasons, SnackBarOptions } from './snackbar-common';
import { View } from 'tns-core-modules/ui/core/view';

export class SnackBar {
    // Use this to get the textview instance inside the snackbar
    private static SNACKBAR_TEXT_ID = (com.google.android.material as any).R.id.snackbar_text;
    private _snackbar: com.google.android.material.snackbar.Snackbar;

    constructor() {}

    // TODO: use an object for the options
    public simple(snackText: string, textColor?: string, backgroundColor?: string, maxLines?: number, isRTL?: boolean, view?: View): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (!snackText) {
                    reject('Snack text is required.');
                    return;
                }

                const attachToView = (view && view.android) || topmost().currentPage.android;
                this._snackbar = com.google.android.material.snackbar.Snackbar.make(attachToView, snackText, 3000);

                this._snackbar.setText(snackText);

                // Brad - not using this bc it's almost too quick, ~1.5 seconds
                // this._snackbar.setDuration(
                //   com.google.android.material.snackbar.Snackbar.LENGTH_SHORT
                // );

                // set text color
                if (textColor && Color.isValid(textColor)) {
                    this._setTextColor(textColor);
                }

                // set background color
                if (backgroundColor && Color.isValid(backgroundColor)) {
                    this._setBackgroundColor(backgroundColor);
                }

                initializeSnackCallback();
                const cb = new SnackCallback(new WeakRef(this));
                (cb as any).resolve = resolve; // handles the resolve of the promise
                this._snackbar.addCallback(cb);

                // https://github.com/Akylas/nativescript-snackbar/issues/33
                if (maxLines) {
                    const sbView = this._snackbar.getView();
                    const tv = sbView.findViewById(SnackBar.SNACKBAR_TEXT_ID) as android.widget.TextView;
                    tv.setMaxLines(maxLines);
                }

                // set RTL for snackbar
                // https://github.com/Akylas/nativescript-snackbar/issues/26
                if (isRTL === true) {
                    const sbView = this._snackbar.getView();
                    const tv = sbView.findViewById(SnackBar.SNACKBAR_TEXT_ID);
                    tv.setLayoutDirection(android.view.View.LAYOUT_DIRECTION_RTL);
                }

                this._snackbar.show();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    public action(options: SnackBarOptions) {
        return new Promise((resolve, reject) => {
            try {
                options.actionText = options.actionText ? options.actionText : 'Close';
                options.hideDelay = options.hideDelay ? options.hideDelay : 3000;

                const attachToView = (options.view && options.view.android) || topmost().currentPage.android;
                this._snackbar = com.google.android.material.snackbar.Snackbar.make(attachToView, options.snackText, options.hideDelay);

                this._snackbar.setText(options.snackText);
                this._snackbar.setDuration(options.hideDelay);

                const listener = new android.view.View.OnClickListener({
                    onClick: args => {
                        resolve({
                            command: 'Action',
                            reason: this._getReason(1),
                            event: args
                        });
                    }
                });

                // set the action text, click listener
                this._snackbar.setAction(options.actionText, listener);

                // set text color of the TextView in the Android SnackBar
                if (options.textColor && Color.isValid(options.textColor)) {
                    this._setTextColor(options.textColor);
                }

                if (options.actionTextColor && Color.isValid(options.actionTextColor)) {
                    this._snackbar.setActionTextColor(new Color(options.actionTextColor).android);
                }

                // set background color
                if (options.backgroundColor && Color.isValid(options.backgroundColor)) {
                    this._setBackgroundColor(options.backgroundColor);
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
                initializeSnackCallback();
                const cb = new SnackCallback(new WeakRef(this));
                (cb as any).resolve = resolve; // handles the resolve of the promise
                this._snackbar.addCallback(cb);

                this._snackbar.show();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    public dismiss() {
        return new Promise((resolve, reject) => {
            if (this._snackbar) {
                try {
                    this._snackbar.dismiss();
                    // return AFTER the item is dismissed, 200ms delay
                    setTimeout(() => {
                        resolve({
                            action: 'Dismiss',
                            reason: this._getReason(3)
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

    public _getReason(value: number) {
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

    private _setBackgroundColor(color) {
        // set background color
        if (color) {
            const sbView = this._snackbar.getView();
            sbView.setBackgroundColor(new Color(color).android);
        }
    }

    private _setTextColor(color) {
        if (color) {
            const mainTextView = this._snackbar.getView().findViewById(SnackBar.SNACKBAR_TEXT_ID) as android.widget.TextView;
            mainTextView.setTextColor(new Color(color).android);
        }
    }
}

let SnackCallback: SnackCallback;

interface SnackCallback {
    // resolve: Function;
    new (owner: WeakRef<SnackBar>): com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback<com.google.android.material.snackbar.Snackbar>;
}
function initializeSnackCallback() {
    if (SnackCallback) {
        return;
    }

    class SnackCallbackImpl extends com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback<com.google.android.material.snackbar.Snackbar> {
        public resolve: Function = null;
        private _owner: WeakRef<SnackBar>;

        constructor(owner: WeakRef<SnackBar>) {
            super();
            this._owner = owner;
            return global.__native(this);
        }

        onDismissed(snackbar: com.google.android.material.snackbar.Snackbar, event: number) {
            // if the dismiss was not caused by the action button click listener
            if (event !== com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback.DISMISS_EVENT_ACTION) {
                this.resolve({
                    command: 'Dismiss',
                    reason: this._owner.get()._getReason(event),
                    event: event
                });
                this.resolve = null;
            }
        }

        onShown(snackbar: com.google.android.material.snackbar.Snackbar) {
            // console.log('callback onShown fired');
        }
    }

    SnackCallback = SnackCallbackImpl;
}
