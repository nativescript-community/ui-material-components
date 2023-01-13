import { themer } from '@nativescript-community/ui-material-core';
import { TextField } from '@nativescript-community/ui-material-textfield';
import {
    ActionOptions,
    Application,
    Builder,
    CSSUtils,
    ConfirmOptions,
    DialogOptions,
    DialogStrings,
    LoginResult,
    PercentLength,
    PromptResult,
    Screen,
    StackLayout,
    Utils,
    View,
    capitalizationType,
    fromObject,
    getCurrentPage,
    inputType
} from '@nativescript/core';
import { LoginOptions, MDCAlertControlerOptions, PromptOptions } from './dialogs';
import { isDialogOptions } from './dialogs-common';

export { capitalizationType, inputType };

@NativeClass
class UIViewAutoSizeUIViewAutoSize extends UIView {
    _view: View;
    systemLayoutSizeFittingSizeWithHorizontalFittingPriorityVerticalFittingPriority(boundsSize: CGSize) {
        const view = this._view;
        if (!view) {
            return CGSizeZero;
        }
        const actualWidth = Math.min(boundsSize.width, Screen.mainScreen.widthPixels);
        const widthSpec = Utils.layout.makeMeasureSpec(Utils.layout.toDevicePixels(actualWidth), Utils.layout.EXACTLY);
        const heighthSpec = Utils.layout.makeMeasureSpec(Utils.layout.toDevicePixels(boundsSize.height), Utils.layout.UNSPECIFIED);
        const measuredSize = View.measureChild(null, view, widthSpec, heighthSpec);
        const newWidth = Utils.layout.toDevicePixels(actualWidth);
        view.setMeasuredDimension(newWidth, measuredSize.measuredHeight);
        const size = CGSizeMake(Utils.layout.toDeviceIndependentPixels(measuredSize.measuredWidth), Utils.layout.toDeviceIndependentPixels(measuredSize.measuredHeight));
        return size;
    }
    layoutSubviews() {
        const view = this._view;
        if (!view) {
            return;
        }
        const size = this.frame.size;
        View.layoutChild(null, view, 0, 0, Utils.layout.toDevicePixels(size.width), Utils.layout.toDevicePixels(size.height));
    }
}

function createUIViewAutoSizeUIViewAutoSize(view: View) {
    const self = UIViewAutoSizeUIViewAutoSize.new() as UIViewAutoSizeUIViewAutoSize;
    view._setupAsRootView({});
    view._isAddedToNativeVisualTree = true;
    view.callLoaded();
    self._view = view;
    self.addSubview(view.nativeViewProtected);
    (view.nativeViewProtected as UIView).autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    return self;
}
@NativeClass
class MDCDialogPresentationControllerDelegateImpl extends NSObject {
    static ObjCProtocols = [MDCDialogPresentationControllerDelegate];
    _callback: Function;
    public static initWithCallback(callback: Function) {
        const delegate = MDCDialogPresentationControllerDelegateImpl.new() as MDCDialogPresentationControllerDelegateImpl;
        delegate._callback = callback;

        return delegate;
    }
    dialogPresentationControllerDidDismiss(controller: MDCDialogPresentationController) {
        const callback = this._callback;
        if (callback) {
            callback();
        }
    }
}
@NativeClass
class MDCAlertControllerImpl extends MDCAlertController {
    autoFocusTextField?: TextField;
    _resolveFunction?: Function;
    _disableContentInsets: boolean;
    viewDidAppear(animated: boolean) {
        super.viewDidAppear(animated);
        if (this.autoFocusTextField) {
            this.autoFocusTextField.requestFocus();
            this.view.setNeedsLayout();
            this.autoFocusTextField = null;
        }
    }
    viewDidLoad() {
        super.viewDidLoad();
        if (this._disableContentInsets) {
            (this.view as MDCAlertControllerView).contentInsets = UIEdgeInsetsZero;
        }
    }
    viewDidUnload() {
        super.viewDidUnload();
        if (this.accessoryView instanceof UIViewAutoSizeUIViewAutoSize) {
            const view = this.accessoryView._view;
            view.callUnloaded();
            view._tearDownUI(true);
            view._isAddedToNativeVisualTree = false;
            this.accessoryView._view = null;
        }
    }
}

function addButtonsToAlertController(alertController: MDCAlertController, options: ConfirmOptions & MDCAlertControlerOptions, callback?: Function, validationArgs?: (r) => any): void {
    if (!options) {
        return;
    }
    let onDoneCalled = false;
    function raiseCallback(callback, result) {
        if (options && options.shouldResolveOnAction && !options.shouldResolveOnAction(validationArgs ? validationArgs(result) : result)) {
            return;
        }
        if (onDoneCalled) {
            return;
        }
        onDoneCalled = true;
        if (Utils.isFunction(callback)) {
            callback(result);
        }
        alertController.dismissModalViewControllerAnimated(true);
    }
    let buttonsFont;

    function addButton(title, emphasis, result) {
        const action = MDCAlertAction.actionWithTitleEmphasisHandler(title, emphasis, () => {
            raiseCallback(callback, result);
        });
        alertController.addAction(action);
        if (options.buttonFont) {
            const titleLabel = alertController.buttonForAction(action).titleLabel;
            if (!buttonsFont) {
                buttonsFont = options.buttonFont.getUIFont(titleLabel.font);
            }
            titleLabel.font = buttonsFont;
        }
    }

    if (Utils.isString(options.cancelButtonText)) {
        addButton(options.cancelButtonText, MDCActionEmphasis.Low, false);
    }
    if (Utils.isString(options.neutralButtonText)) {
        addButton(options.neutralButtonText, MDCActionEmphasis.Low, undefined);
    }
    if (Utils.isString(options.okButtonText)) {
        addButton(options.okButtonText, MDCActionEmphasis.Low, true);
    }
}

function createAlertController(options: DialogOptions & MDCAlertControlerOptions, resolve?: Function) {
    const alertController = MDCAlertControllerImpl.alloc().init() as MDCAlertControllerImpl;
    alertController.mdc_adjustsFontForContentSizeCategory = true;

    if (options.title) {
        alertController.title = options.title;
    }
    if (options.message) {
        alertController.message = options.message;
    }
    // if (options.buttonFont) {
    //     alertController.buttonFont = options.buttonFont.getUIFont(alertController.buttonFont);
    // }

    if (options.view) {
        const view =
            options.view instanceof View
                ? options.view
                : Builder.createViewFromEntry({
                    moduleName: options.view as string
                });

        view.cssClasses.add(CSSUtils.MODAL_ROOT_VIEW_CSS_CLASS);
        const modalRootViewCssClasses = CSSUtils.getSystemCssClasses();
        modalRootViewCssClasses.forEach((c) => view.cssClasses.add(c));

        alertController._resolveFunction = resolve;
        const context = options.context || {};
        context.closeCallback = function (...originalArgs) {
            alertController.dismissModalViewControllerAnimated(true);
            if (alertController._resolveFunction && resolve) {
                alertController._resolveFunction = null;
                resolve.apply(this, originalArgs);
            }
        };
        view.bindingContext = fromObject(context);
        alertController.accessoryView = createUIViewAutoSizeUIViewAutoSize(view);

        // if no title or message disable contentInsets to be like android
        if (!options.title && !options.message) {
            if (alertController.view) {
                (alertController.view as MDCAlertControllerView).contentInsets = UIEdgeInsetsZero;
            } else {
                alertController._disableContentInsets = true;
            }
        }
        view.viewController = alertController; // needed to prevent a crash in layoutChild
    }
    const dialogPresentationControllerDelegate = MDCDialogPresentationControllerDelegateImpl.initWithCallback(() => {
        resolve && resolve();
        alertController._resolveFunction = null;
        alertController.mdc_dialogPresentationController.delegate = null;
    });
    alertController.mdc_dialogPresentationController.dialogPresentationControllerDelegate = dialogPresentationControllerDelegate;

    if (options && options.cancelable === false) {
        alertController.mdc_dialogPresentationController.dismissOnBackgroundTap = false;
    }
    if (options && options.dismissOnBackgroundTap === false) {
        alertController.mdc_dialogPresentationController.dismissOnBackgroundTap = false;
    }

    // const transitionController = MDCDialogTransitionController.alloc().init()
    // alertController.modalPresentationStyle = UIModalPresentationStyle.Custom;
    // alertController.transitioningDelegate = transitionController;
    return alertController;
}

export function alert(arg: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        try {
            const defaultOptions = {
                // title: ALERT,
                okButtonText: DialogStrings.OK
            };
            const options = !isDialogOptions(arg) ? Object.assign(defaultOptions, { message: arg + '' }) : Object.assign(defaultOptions, arg);
            const alertController = createAlertController(options, resolve);

            addButtonsToAlertController(alertController, options, (result) => {
                alertController._resolveFunction = null;
                resolve(result);
            });

            showUIAlertController(alertController, options);
        } catch (ex) {
            reject(ex);
        }
    });
}

export class AlertDialog {
    alertController: MDCAlertController;
    presentingController: UIViewController;
    constructor(private options: any) {}

    show(onClosed?) {
        if (!this.alertController) {
            this.alertController = createAlertController(this.options, onClosed);
            this.presentingController = showUIAlertController(this.alertController, this.options);
        }
    }
    async hide() {
        if (this.presentingController) {
            return new Promise<void>((resolve) => {
                this.presentingController.dismissViewControllerAnimatedCompletion(true, resolve);
                this.presentingController = null;
                this.alertController = null;
            });
        }
    }
}

export function confirm(arg: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const defaultOptions = {
                // title: CONFIRM,
                okButtonText: DialogStrings.OK,
                cancelButtonText: DialogStrings.CANCEL
            };
            const options = !isDialogOptions(arg)
                ? Object.assign(defaultOptions, {
                    message: arg + ''
                })
                : Object.assign(defaultOptions, arg);
            const alertController = createAlertController(options, resolve);

            addButtonsToAlertController(alertController, options, (r) => {
                resolve(r);
            });

            showUIAlertController(alertController, options);
        } catch (ex) {
            reject(ex);
        }
    });
}

export function prompt(arg: any): Promise<PromptResult> {
    let options: PromptOptions & MDCAlertControlerOptions;

    const defaultOptions = {
        // title: PROMPT,
        okButtonText: DialogStrings.OK,
        cancelButtonText: DialogStrings.CANCEL,
        inputType: inputType.text
    };

    if (arguments.length === 1) {
        if (Utils.isString(arg)) {
            options = defaultOptions;
            options.message = arg;
        } else {
            options = Object.assign(defaultOptions, arg);
        }
    } else if (arguments.length === 2) {
        if (Utils.isString(arguments[0]) && Utils.isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.defaultText = arguments[1];
        }
    }

    return new Promise<PromptResult>((resolve, reject) => {
        try {
            const stackLayout = new StackLayout();
            const textField = new TextField();
            textField.hint = options.hintText;
            if (options) {
                if (options.textFieldProperties) {
                    Object.assign(textField, options.textFieldProperties);
                }
                if (options.defaultText) {
                    textField.text = options.defaultText;
                }
                if (options.defaultText) {
                    textField.hint = options.hintText;
                }
                if (options.helperText) {
                    textField.helper = options.helperText;
                }
                if (options.inputType === inputType.password) {
                    textField.secure = true;
                } else if (options.inputType === inputType.email) {
                    textField.keyboardType = 'email';
                } else if (options.inputType === inputType.number) {
                    textField.keyboardType = 'number';
                } else if (options.inputType === inputType.phone) {
                    textField.keyboardType = 'phone';
                }

                switch (options.capitalizationType) {
                    case capitalizationType.all: {
                        textField.autocapitalizationType = 'allcharacters';
                        break;
                    }
                    case capitalizationType.sentences: {
                        textField.autocapitalizationType = 'sentences';
                        break;
                    }
                    case capitalizationType.words: {
                        textField.autocapitalizationType = 'words';
                        break;
                    }
                }
            }
            stackLayout.addChild(textField);
            options.view = stackLayout;

            const alertController = createAlertController(options, resolve);
            addButtonsToAlertController(
                alertController,
                options,
                (r) => {
                    alertController._resolveFunction = null;
                    resolve({ result: r, text: textField.text });
                },
                (r) => ({ result: r, text: textField.text })
            );
            if (options.autoFocus) {
                alertController.autoFocusTextField = textField;
            }
            showUIAlertController(alertController, options);
        } catch (ex) {
            reject(ex);
        }
    });
}

export function login(arg: any): Promise<LoginResult> {
    let options: LoginOptions & MDCAlertControlerOptions;

    const defaultOptions = {
        okButtonText: DialogStrings.OK,
        cancelButtonText: DialogStrings.CANCEL
    };

    if (arguments.length === 1) {
        if (Utils.isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        } else {
            options = Object.assign(defaultOptions, arguments[0]);
        }
    } else if (arguments.length === 2) {
        if (Utils.isString(arguments[0]) && Utils.isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.userName = arguments[1];
        }
    } else if (arguments.length === 3) {
        if (Utils.isString(arguments[0]) && Utils.isString(arguments[1]) && Utils.isString(arguments[2])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.userName = arguments[1];
            options.password = arguments[2];
        }
    }

    return new Promise<LoginResult>((resolve, reject) => {
        try {
            const stackLayout = new StackLayout();
            const userNameTextField = new TextField();
            userNameTextField.marginBottom = 10;
            const passwordTextField = new TextField();
            userNameTextField.hint = options.userNameHint || 'Username';
            userNameTextField.text = options.userName;
            passwordTextField.hint = options.passwordHint || 'Password';
            passwordTextField.text = options.password;
            passwordTextField.secure = true;

            if (options.usernameTextFieldProperties) {
                Object.assign(userNameTextField, options.usernameTextFieldProperties);
            }
            if (options.passwordTextFieldProperties) {
                Object.assign(passwordTextField, options.passwordTextFieldProperties);
            }

            stackLayout.addChild(userNameTextField);
            stackLayout.addChild(passwordTextField);
            options.view = stackLayout;
            const alertController = createAlertController(options, resolve);

            addButtonsToAlertController(
                alertController,
                options,
                (r) => {
                    resolve({
                        result: r,
                        userName: userNameTextField.text,
                        password: passwordTextField.text
                    });
                },
                (r) => ({ result: r, userName: userNameTextField.text, password: passwordTextField.text })
            );

            if (options.beforeShow) {
                options.beforeShow(options, userNameTextField, passwordTextField);
            }
            showUIAlertController(alertController, options);
            if (options.autoFocus) {
                alertController.autoFocusTextField = userNameTextField;
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

function showUIAlertController(alertController: MDCAlertController, options: DialogOptions & MDCAlertControlerOptions) {
    // themer needs to be applied after actions creation
    const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
    const scheme = MDCContainerScheme.alloc().init();
    if (colorScheme) {
        scheme.colorScheme = colorScheme;
    }
    alertController.applyThemeWithScheme(scheme);

    if (options.messageFont) {
        alertController.messageFont = options.messageFont.getUIFont(alertController.messageFont);
    }
    if (options.titleFont) {
        alertController.titleFont = options.titleFont.getUIFont(alertController.titleFont);
    }
    if (options.buttonInkColor) {
        alertController.buttonInkColor = options.buttonInkColor.ios;
    }
    if (options.buttonTitleColor) {
        alertController.buttonTitleColor = options.buttonTitleColor.ios;
    }
    if (options.scrimColor) {
        alertController.scrimColor = options.scrimColor.ios;
    }
    if (options.titleColor) {
        alertController.titleColor = options.titleColor.ios;
        // } else if (lblColor) {
        // alertController.titleColor = lblColor.ios;
    }
    if (options.titleIconTintColor) {
        alertController.titleIconTintColor = options.titleIconTintColor.ios;
    }
    if (options.messageColor) {
        alertController.messageColor = options.messageColor.ios;
    }
    if (options.elevation !== undefined) {
        alertController.elevation = options.elevation;
    }
    if (options.cornerRadius !== undefined) {
        alertController.cornerRadius = options.cornerRadius;
        // } else {
        // alertController.cornerRadius = 2;
    }
    if (options.titleIcon) {
        alertController.titleIcon = options.titleIcon.ios;
    }
    if (options.titleAlignment) {
        switch (options.titleAlignment) {
            case 'initial':
            case 'left':
                alertController.titleAlignment = NSTextAlignment.Left;
                break;
            case 'center':
                alertController.titleAlignment = NSTextAlignment.Center;
                break;
            case 'right':
                alertController.titleAlignment = NSTextAlignment.Right;
                break;
        }
    }

    let currentView = getCurrentPage() || Application.getRootView();

    if (currentView) {
        currentView = currentView.modal || currentView;

        let viewController = Application.ios.rootController;

        while (viewController && viewController.presentedViewController && !(viewController.presentedViewController instanceof MDCAlertControllerImpl)) {
            viewController = viewController.presentedViewController;
        }

        if (viewController) {
            if (alertController.popoverPresentationController) {
                alertController.popoverPresentationController.sourceView = viewController.view;
                alertController.popoverPresentationController.sourceRect = CGRectMake(viewController.view.bounds.size.width / 2.0, viewController.view.bounds.size.height / 2.0, 1.0, 1.0);
                alertController.popoverPresentationController.permittedArrowDirections = 0;
            }
            viewController.presentViewControllerAnimatedCompletion(alertController, true, null);
        }
        return viewController;
    }
    throw new Error('no_controller_to_show_dialog');
}

export function action(): Promise<string> {
    let options: ActionOptions;

    const defaultOptions = {
        // title: null,
        cancelButtonText: DialogStrings.CANCEL
    };

    if (arguments.length === 1) {
        if (Utils.isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        } else {
            options = Object.assign(defaultOptions, arguments[0]);
        }
    } else if (arguments.length === 2) {
        if (Utils.isString(arguments[0]) && Utils.isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.cancelButtonText = arguments[1];
        }
    } else if (arguments.length === 3) {
        if (Utils.isString(arguments[0]) && Utils.isString(arguments[1]) && Utils.isDefined(arguments[2])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.cancelButtonText = arguments[1];
            options.actions = arguments[2];
        }
    }

    return new Promise<string>((resolve, reject) => {
        try {
            let i: number;
            let action: string;
            const alertController = createAlertController(options, resolve);

            if (options.actions) {
                for (i = 0; i < options.actions.length; i++) {
                    action = options.actions[i];
                    if (Utils.isString(action)) {
                        alertController.addAction(
                            MDCAlertAction.actionWithTitleEmphasisHandler(action, MDCActionEmphasis.Low, (arg: MDCAlertAction) => {
                                resolve(arg.title);
                            })
                        );
                    }
                }
            }

            if (Utils.isString(options.cancelButtonText)) {
                alertController.addAction(
                    MDCAlertAction.actionWithTitleEmphasisHandler(options.cancelButtonText, MDCActionEmphasis.Low, (arg: MDCAlertAction) => {
                        resolve(arg.title);
                    })
                );
            }

            showUIAlertController(alertController, options);
        } catch (ex) {
            reject(ex);
        }
    });
}
