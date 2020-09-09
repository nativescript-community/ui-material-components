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
    PromptResult,
    StackLayout,
    Utils,
    View,
    capitalizationType,
    fromObject,
    getCurrentPage,
    inputType,
} from '@nativescript/core';
import { LoginOptions, MDCAlertControlerOptions, PromptOptions } from './dialogs';
import { isDialogOptions } from './dialogs-common';

export { capitalizationType, inputType };

const UNSPECIFIED = Utils.layout.makeMeasureSpec(0, Utils.layout.UNSPECIFIED);

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
declare class IMDCAlertControllerImpl extends MDCAlertController {
    autoFocusTextField?: TextField;
    customContentView?: View;
    _customContentViewContext?: any;
    _resolveFunction?: Function;
    actions: NSArray<any>;
    viewLayedOut: boolean;
}
// @NativeClass
const MDCAlertControllerImpl = (MDCAlertController as any).extend({
    // autoFocusTextField?: TextField;
    // _customContentView?: View;
    // _customContentViewContext?: any;
    // _resolveFunction?: Function;
    // actions: NSArray<any>;
    // viewLayedOut = false;
    get preferredContentSize() {
        console.log('get preferredContentSize');
        // const superResult = this.super.preferredContentSize;
        const superResult = Object.getOwnPropertyDescriptor(MDCAlertController.prototype, 'preferredContentSize').get.call(this);
        const measuredHeight = this._customContentView ? this._customContentView.getMeasuredHeight() : 0; // pixels
        const hasTitleOrMessage = this.title || this.message;
        let result: CGSize;
        if (hasTitleOrMessage) {
            result = CGSizeMake(superResult.width, Math.round(superResult.height + Utils.layout.toDeviceIndependentPixels(measuredHeight)));
        } else if (this.actions.count > 0) {
            result = CGSizeMake(superResult.width, Math.round(Utils.layout.toDeviceIndependentPixels(superResult.height) + Utils.layout.toDeviceIndependentPixels(measuredHeight)));
        } else {
            result = CGSizeMake(superResult.width, Math.floor(Utils.layout.toDeviceIndependentPixels(measuredHeight)));
        }
        return result;
    },
    set preferredContentSize(x) {
        Object.getOwnPropertyDescriptor(MDCAlertController.prototype, 'preferredContentSize').set.apply(this, arguments);
        // this.super.preferredContentSize = x;
    },
    get contentScrollView() {
        const alertView = this.view as MDCAlertControllerView;
        if (alertView) {
            return alertView.subviews[0] as UIScrollView;
        }
        return null;
    },

    addCustomViewToLayout() {
        const contentScrollView = this.contentScrollView as UIView;
        const view = this._customContentView;
        view._setupAsRootView({});
        view._isAddedToNativeVisualTree = true;
        view.callLoaded();
        if (this._customContentViewContext) {
            view.bindingContext = fromObject(this._customContentViewContext);
            this._customContentViewContext = null;
        }
        const nativeViewProtected = this._customContentView.nativeViewProtected;
        if (contentScrollView && nativeViewProtected) {
            contentScrollView.addSubview(nativeViewProtected);
        }
    },
    get customContentView() {
        return this._customContentView;
    },
    set customContentView(view: View) {
        this._customContentView = view;
        if (view) {
            view.viewController = this;
            if (this.viewLoaded) {
                this.addCustomViewToLayout();
            }
        }
    },

    getSuperPreferredContentSize() {
        return Object.getOwnPropertyDescriptor(MDCAlertController.prototype, 'preferredContentSize').get.call(this);
        // return this.super.preferredContentSize;
        // const proto = MDCAlertControllerImpl.prototype;
        // return Object.getOwnPropertyDescriptor(proto, 'preferredContentSize').get.apply(this);
    },
    measureChild() {
        const contentScrollView = this.contentScrollView;
        const contentSize = contentScrollView.contentSize;
        if (contentSize.width === 0) {
            return false;
        }
        const width = contentSize.width || this.getSuperPreferredContentSize().width;
        const widthSpec = Utils.layout.makeMeasureSpec(Utils.layout.toDevicePixels(width), Utils.layout.EXACTLY);
        View.measureChild(null, this._customContentView, widthSpec, UNSPECIFIED);
        return true;
    },
    layoutCustomView() {
        const view = this._customContentView;
        if (view) {
            if (!this.measureChild()) {
                return false;
            }
            this.viewLayedOut = true;
            const hasTitleOrMessage = this.title || this.message;

            const contentScrollView = this.contentScrollView;
            const contentSize = contentScrollView.contentSize;
            let originY = 0;
            if (hasTitleOrMessage) {
                const index = contentScrollView.subviews.indexOfObject(view.nativeViewProtected);
                if (index === -1) {
                    originY = Utils.layout.toDevicePixels(contentSize.height);
                } else {
                    const viewOnTopFrame = contentScrollView.subviews.objectAtIndex(index - 1).frame;
                    // the +24 is MDCDialogContentInsets
                    originY = Utils.layout.toDevicePixels(viewOnTopFrame.origin.y + viewOnTopFrame.size.height + 24);
                }
            }

            const measuredWidth = view.getMeasuredWidth(); // pixels
            const measuredHeight = view.getMeasuredHeight(); // pixels
            View.layoutChild(null, view, 0, originY, measuredWidth, originY + measuredHeight);

            const size = this.getSuperPreferredContentSize();
            const pW = size.width;
            const pH = size.height;
            // TODO: for a reload of the preferredContentSize. Find a better solution!
            this.preferredContentSize = CGSizeMake(pW, pH + 0.00000000001);
            this.preferredContentSize = CGSizeMake(pW, pH);
            return true;
        } else {
            this.viewLayedOut = true;
        }
        return false;
    },
    updateContentViewSize() {
        const view = this._customContentView;
        if (!view) {
            return;
        }
        const contentScrollView = this.contentScrollView;
        contentScrollView.clipsToBounds = true;
        const contentSize = contentScrollView.contentSize;
        const bounds = contentScrollView.frame;
        const boundsSize = bounds.size;

        const measuredHeight = view.getMeasuredHeight(); // pixels
        contentSize.height = contentSize.height + measuredHeight;
        boundsSize.height = boundsSize.height + measuredHeight;

        contentScrollView.contentSize = contentSize;
        bounds.size = boundsSize;
        contentScrollView.frame = bounds;
    },

    viewWillLayoutSubviews() {
        this.viewLayedOut = false;
        this.super.viewWillLayoutSubviews();
        // in some case the the content scrollview is not "layed out when calling layoutCustomView"
        // so we keep track of that in viewLayedOut
        this.layoutCustomView();
    },
    viewDidLayoutSubviews() {
        // if the content scrollview was not layed out we need to call setNeedsLayout again...
        if (!this.viewLayedOut) {
            this.layoutCustomView();
            this.view.setNeedsLayout();
        }
        this.updateContentViewSize();
    },
    viewDidAppear() {
        if (this.autoFocusTextField) {
            this.autoFocusTextField.requestFocus();
            this.autoFocusTextField = null;
        }
    },
    viewDidLoad() {
        this.super.viewDidLoad();
        if (this._customContentView) {
            this.addCustomViewToLayout();
            this.view.setNeedsLayout();
        }
    },
    viewDidUnload() {
        this.super.viewDidUnload();
        if (this.customContentView) {
            this._customContentView.callUnloaded();
            this._customContentView._tearDownUI(true);
            this._customContentView._isAddedToNativeVisualTree = false;
            this._customContentView = null;
        }
    },
});

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
    }

    if (Utils.isString(options.cancelButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(options.cancelButtonText, MDCActionEmphasis.Low, () => {
                raiseCallback(callback, false);
            })
        );
    }

    if (Utils.isString(options.neutralButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(options.neutralButtonText, MDCActionEmphasis.Low, () => {
                raiseCallback(callback, undefined);
            })
        );
    }

    if (Utils.isString(options.okButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(options.okButtonText, MDCActionEmphasis.Low, () => {
                raiseCallback(callback, true);
            })
        );
    }
}

function createAlertController(options: DialogOptions & MDCAlertControlerOptions, resolve?: Function) {
    const alertController = MDCAlertControllerImpl.alloc().init() as IMDCAlertControllerImpl;
    // const buttonColor = getButtonColors().color;
    // if (buttonColor) {
    //     alertController.view.tintColor = buttonColor.ios;
    // }
    // const lblColor = getLabelColor();

    if (options.title) {
        alertController.title = options.title;
    }
    if (options.message) {
        alertController.message = options.message;
    }
    if (options.buttonFont) {
        alertController.buttonFont = options.buttonFont.getUIFont(alertController.buttonFont);
    }
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
        // } else if (lblColor) {
        // alertController.messageColor = lblColor.ios;
    }
    if (options.elevation) {
        alertController.elevation = options.elevation;
    }
    if (options.cornerRadius) {
        alertController.cornerRadius = options.cornerRadius;
    } else {
        alertController.cornerRadius = 2;
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

    if (options.view) {
        const view =
            options.view instanceof View
                ? options.view
                : Builder.createViewFromEntry({
                    moduleName: options.view as string,
                });

        view.cssClasses.add(CSSUtils.MODAL_ROOT_VIEW_CSS_CLASS);
        const modalRootViewCssClasses = CSSUtils.getSystemCssClasses();
        modalRootViewCssClasses.forEach((c) => view.cssClasses.add(c));

        alertController.customContentView = view;
        alertController._resolveFunction = resolve;
        const context = options.context || {};
        context.closeCallback = function (...originalArgs) {
            alertController.dismissModalViewControllerAnimated(true);
            if (alertController._resolveFunction && resolve) {
                alertController._resolveFunction = null;
                resolve.apply(this, originalArgs);
            }
        };
        alertController._customContentViewContext = context;
        // view.bindingContext = fromObject(context);
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

    // const transitionController = MDCDialogTransitionController.alloc().init()
    // alertController.modalPresentationStyle = UIModalPresentationStyle.Custom;
    // alertController.transitioningDelegate = transitionController;
    return alertController;
}

export function alert(arg: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            const defaultOptions = {
                // title: ALERT,
                okButtonText: DialogStrings.OK,
            };
            const options = !isDialogOptions(arg) ? Object.assign(defaultOptions, { message: arg + '' }) : Object.assign(defaultOptions, arg);
            const alertController = createAlertController(options, resolve);

            addButtonsToAlertController(alertController, options, (result) => {
                alertController._resolveFunction = null;
                resolve(result);
            });

            showUIAlertController(alertController);
        } catch (ex) {
            reject(ex);
        }
    });
}

export class AlertDialog {
    alertController: MDCAlertController;
    presentingController: UIViewController;
    constructor(private options: any) {}
    show() {
        if (!this.alertController) {
            this.alertController = createAlertController(this.options);

            // addButtonsToAlertController(this.alertController, options, result => {
            //     (this.alertController as any)._resolveFunction = null;
            //     resolve(result);
            // });

            this.presentingController = showUIAlertController(this.alertController);
        }
    }
    hide() {
        if (this.presentingController) {
            this.presentingController.dismissViewControllerAnimatedCompletion(true, null);
            this.presentingController = null;
            this.alertController = null;
        }
    }
}

export function confirm(arg: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const defaultOptions = {
                // title: CONFIRM,
                okButtonText: DialogStrings.OK,
                cancelButtonText: DialogStrings.CANCEL,
            };
            const options = !isDialogOptions(arg)
                ? Object.assign(defaultOptions, {
                    message: arg + '',
                })
                : Object.assign(defaultOptions, arg);
            const alertController = createAlertController(options, resolve);

            addButtonsToAlertController(alertController, options, (r) => {
                resolve(r);
            });

            showUIAlertController(alertController);
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
        inputType: inputType.text,
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
            // let textField: MDCTextField;

            const stackLayout = new StackLayout();
            const textField = new TextField();
            textField.hint = options.hintText;
            textField.marginTop = 2;
            textField.marginBottom = 2;
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
                    // textField.keyboardType = 'text';
                    // input.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD);
                } else if (options.inputType === inputType.email) {
                    textField.keyboardType = 'email';
                    // input.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
                } else if (options.inputType === inputType.number) {
                    textField.keyboardType = 'number';
                    // input.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                } else if (options.inputType === inputType.phone) {
                    textField.keyboardType = 'phone';
                    //   input.setInputType(android.text.InputType.TYPE_CLASS_PHONE);
                }

                switch (options.capitalizationType) {
                    case capitalizationType.all: {
                        textField.autocapitalizationType = 'allcharacters';
                        break;
                    }
                    case capitalizationType.sentences: {
                        textField.autocapitalizationType = 'sentences';
                        // input.setInputType(input.getInputType() | android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES);
                        break;
                    }
                    case capitalizationType.words: {
                        textField.autocapitalizationType = 'words';
                        // input.setInputType(input.getInputType() | android.text.InputType.TYPE_TEXT_FLAG_CAP_WORDS);
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
            if (!!options.autoFocus) {
                alertController.autoFocusTextField = textField;
            }
            showUIAlertController(alertController);
        } catch (ex) {
            reject(ex);
        }
    });
}

export function login(arg: any): Promise<LoginResult> {
    let options: LoginOptions & MDCAlertControlerOptions;

    const defaultOptions = {
        // title: LOGIN,
        okButtonText: DialogStrings.OK,
        cancelButtonText: DialogStrings.CANCEL,
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
            // stackLayout.margin = 4;
            const userNameTextField = new TextField();
            userNameTextField.marginTop = 2;
            userNameTextField.marginBottom = 2;
            const passwordTextField = new TextField();
            passwordTextField.marginTop = 2;
            passwordTextField.marginBottom = 2;
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

            // const textFieldColor = getTextFieldColor();

            // alertController.addTextFieldWithConfigurationHandler(
            //     (arg: UITextField) => {
            //         arg.placeholder = "Login"
            //         arg.text = Utils.isString(options.userName)
            //             ? options.userName
            //             : ""

            //         if (textFieldColor) {
            //             arg.textColor = arg.tintColor = textFieldColor.ios
            //         }
            //     }
            // )

            // alertController.addTextFieldWithConfigurationHandler(
            //     (arg: UITextField) => {
            //         arg.placeholder = "Password"
            //         arg.secureTextEntry = true
            //         arg.text = Utils.isString(options.password)
            //             ? options.password
            //             : ""

            //         if (textFieldColor) {
            //             arg.textColor = arg.tintColor = textFieldColor.ios
            //         }
            //     }
            // )

            // userNameTextField = alertController.textFields.firstObject
            // passwordTextField = alertController.textFields.lastObject

            addButtonsToAlertController(
                alertController,
                options,
                (r) => {
                    resolve({
                        result: r,
                        userName: userNameTextField.text,
                        password: passwordTextField.text,
                    });
                },
                (r) => ({ result: r, userName: userNameTextField.text, password: passwordTextField.text })
            );

            if (!!options.beforeShow) {
                options.beforeShow(options, userNameTextField, passwordTextField);
            }
            showUIAlertController(alertController);
            if (!!options.autoFocus) {
                alertController.autoFocusTextField = userNameTextField;
            }
        } catch (ex) {
            reject(ex);
        }
    });
}

function showUIAlertController(alertController: MDCAlertController) {
    // themer needs to be applied after actions creation

    const colorScheme: MDCSemanticColorScheme = themer.getAppColorScheme();
    if (colorScheme) {
        MDCAlertColorThemer.applySemanticColorSchemeToAlertController(colorScheme, alertController);
        // } else {
        // MDCAlertControllerThemer.applySchemeToAlertController(MDCAlertScheme.alloc().init(), alertController);
    }

    let currentView = getCurrentPage() || Application.getRootView();

    if (currentView) {
        currentView = currentView.modal || currentView;

        // for now we need to use the rootController because of a bug in {N}
        const viewController = Application.ios.rootController;

        // let viewController: UIViewController = currentView.ios;

        // if (!(currentView.ios instanceof UIViewController)) {
        //     const parentWithController = IOSHelper.getParentWithViewController(currentView);
        //     viewController = parentWithController ? parentWithController.viewController : undefined;
        // }
        // if (viewController && viewController.parentViewController) {
        //     while(viewController.parentViewController) {
        //         viewController = viewController.parentViewController
        //         viewController.parentViewController
        //     }
        // }

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
        cancelButtonText: DialogStrings.CANCEL,
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

            showUIAlertController(alertController);
        } catch (ex) {
            reject(ex);
        }
    });
}
