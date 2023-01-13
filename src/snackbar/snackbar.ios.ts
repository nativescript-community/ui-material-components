import { getRippleColor, themer } from '@nativescript-community/ui-material-core';
import { Application, Color, Frame, Page } from '@nativescript/core';
import { DismissReasons, SnackBarAction, SnackBarBase, SnackBarOptions } from './snackbar-common';

export class SnackBar extends SnackBarBase {
    static _snackbarManager: MDCSnackbarManager = MDCSnackbarManager.defaultManager;
    static _messages;

    constructor(options?: SnackBarOptions) {
        super(options);
    }

    private _shown = false;
    private _message: MDCSnackbarMessage;
    private _dismissReason: DismissReasons;

    public show() {
        return new Promise((resolve, reject) => {
            try {
                this.initSnack(this._options, resolve);
                if (!this._shown) {
                    SnackBar._snackbarManager.showMessage(this._message);
                    this._shown = true;
                }
            } catch (ex) {
                reject(ex);
            }
        });
    }

    prepareView(message: MDCSnackbarMessage, messageView: MDCSnackbarMessageView) {
        const options = this._options;
        const accentColor = themer.getAccentColor();
        if (accentColor) {
            const buttons = messageView.actionButtons;
            const color = (accentColor instanceof Color ? accentColor : new Color(accentColor)).ios;
            buttons.enumerateObjectsUsingBlock((button) => {
                button.setTitleColorForState(color, UIControlState.Normal);
                button.setTitleColorForState(color, UIControlState.Highlighted);
                button.inkColor = getRippleColor(accentColor);
            });
        }

        if (options.textColor && Color.isValid(options.textColor)) {
            messageView.messageTextColor = (options.textColor instanceof Color ? options.textColor : new Color(options.textColor)).ios;
        }

        if (options.actionTextColor && Color.isValid(options.actionTextColor)) {
            const color = (options.actionTextColor instanceof Color ? options.actionTextColor : new Color(options.actionTextColor)).ios;
            const buttons = messageView.actionButtons;
            buttons.enumerateObjectsUsingBlock((button) => {
                button.setTitleColorForState(color, UIControlState.Normal);
                button.setTitleColorForState(color, UIControlState.Highlighted);
                button.inkColor = getRippleColor(options.actionTextColor);
            });
        }

        if (options.backgroundColor && Color.isValid(options.backgroundColor)) {
            messageView.snackbarMessageViewBackgroundColor = (options.backgroundColor instanceof Color ? options.backgroundColor : new Color(options.backgroundColor)).ios;
        }

        let nAttachedView: UIView;
        if (options.view) {
            nAttachedView = options.view.nativeViewProtected;
        } else {
            let viewController = Application.ios.rootController;

            while (viewController && viewController.presentedViewController) {
                viewController = viewController.presentedViewController;
            }
            nAttachedView = viewController.view;
        }

        if (nAttachedView) {
            message.presentationHostViewOverride = nAttachedView;
        }

        if (options.anchorView) {
            const totalHeight = nAttachedView ? nAttachedView.frame.origin.y + nAttachedView.frame.size.height : UIApplication.sharedApplication.keyWindow.rootViewController.view.bounds.size.height;
            const result = (options.anchorView.nativeViewProtected as UIView).convertPointToView(CGPointZero, nAttachedView);
            SnackBar._snackbarManager.setBottomOffset(totalHeight - result.y);
        } else {
            SnackBar._snackbarManager.setBottomOffset(0);
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
                reason: this._dismissReason !== undefined ? this._dismissReason : userInitiated ? DismissReasons.ACTION : DismissReasons.TIMEOUT
            });
        };
    }

    public dismiss(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (SnackBar._snackbarManager) {
                try {
                    SnackBar._snackbarManager.dismissAndCallCompletionBlocksWithCategory(null);
                    this._dismissReason = DismissReasons.MANUAL;
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
