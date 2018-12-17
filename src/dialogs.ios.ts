import { ios as iosView, layout, View } from 'tns-core-modules/ui/core/view';

import { getRootView } from 'tns-core-modules/application';
import {
    ActionOptions,
    ALERT,
    CANCEL,
    capitalizationType,
    CONFIRM,
    ConfirmOptions,
    DialogOptions,
    getButtonColors,
    getCurrentPage,
    getLabelColor,
    getTextFieldColor,
    inputType,
    isDialogOptions,
    LOGIN,
    LoginOptions,
    LoginResult,
    OK,
    PROMPT,
    PromptOptions,
    PromptResult
} from 'tns-core-modules/ui/dialogs';
import { isDefined, isFunction, isString } from 'tns-core-modules/utils/types';
import { MDCAlertControlerOptions } from './dialogs';
import { themer } from './material';
import { createViewFromEntry } from 'tns-core-modules/ui/builder/builder';
import { screen } from 'tns-core-modules/platform/platform';
import { fromObject } from 'tns-core-modules/data/observable/observable';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { TextField } from './textfield';

const UNSPECIFIED = layout.makeMeasureSpec(0, layout.UNSPECIFIED);

class MDCAlertControllerImpl extends MDCAlertController {
    // Override an existing method from the base class.
    // We will obtain the method signature from the protocol.
    _customContentView?: View;
    _customContentViewContext?: any;
    _resolveFunction?: Function;
    get contentScrollView() {
        const alertView = this.view as MDCAlertControllerView;
        if (alertView) {
            const contentScrollView = alertView.subviews[0] as UIScrollView;
            return contentScrollView;
        }
        return null;
    }

    // viewWillAppear(animated: boolean) {
    //     super.viewWillAppear(animated);

    // }
    viewDidDisappear(animated: boolean) {
        super.viewDidDisappear(animated);
        if (this._resolveFunction) {
            this._resolveFunction();
            this._resolveFunction = null;
        }
    }

    addCustomViewToLayout() {
        const contentScrollView = this.contentScrollView;
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
        this.measureChild() // ensure custom view is measured for preferredContentSize
        // this._preferredContentSize = this.updatePreferredContentSize(this._preferredContentSize);
    }
    get customContentView() {
        return this._customContentView;
    }
    set customContentView(view: View) {
        this._customContentView = view;
        if (view) {
            view.viewController = this;
            if (this.viewLoaded) {
                this.addCustomViewToLayout();
            }
        }
    }
    _preferredContentSize: CGSize;
    get preferredContentSize() {
        const result = this._preferredContentSize;
        if (this._customContentView) {
            const scale = screen.mainScreen.scale;
            return CGSizeMake(result.width, result.height + this._customContentView.getMeasuredHeight() / scale);
            // result.height = this._customContentView.getMeasuredHeight() / scale;
        }
        return result;
    }
    set preferredContentSize(size: CGSize) {
        // if (this._customContentView && this._customContentView.nativeViewProtected) {
        //     this._preferredContentSize = this.updatePreferredContentSize(size);
        // } else {
            this._preferredContentSize = size;
        // }
    }
    measureChild() {
        let boundsSize = CGRectInfinite.size;
        boundsSize.width = this.preferredContentSize.width;
        View.measureChild(null, this._customContentView, layout.makeMeasureSpec(boundsSize.width, layout.AT_MOST), UNSPECIFIED);
    }
    // updatePreferredContentSize(preferredContentSize) {
    //     const scale = screen.mainScreen.scale;
    //     let boundsSize = CGRectInfinite.size;
    //     boundsSize.width = preferredContentSize.width;
    //     View.measureChild(null, this._customContentView, UNSPECIFIED, UNSPECIFIED);
    //     console.log('updatePreferredContentSize', preferredContentSize.width, preferredContentSize.height, this._customContentView.getMeasuredHeight() / scale);
    //     preferredContentSize.height = preferredContentSize.height + this._customContentView.getMeasuredHeight() / scale;
    //     return preferredContentSize;
    // }
    viewDidLayoutSubviews() {
        if (this._customContentView) {
            const contentScrollView = this.contentScrollView;
            const contentSize = contentScrollView.contentSize;

            const width = layout.toDevicePixels(contentSize.width);
            const originY = layout.toDevicePixels(contentSize.height);
            const widthSpec = layout.makeMeasureSpec(width, layout.AT_MOST);
            const heightSpec = UNSPECIFIED;

            this._customContentView.measure(widthSpec, heightSpec);
            const measuredHeight = this._customContentView.getMeasuredHeight();

            // console.log('viewDidLayoutSubviews', measuredHeight, this._customContentView.height);

            this._customContentView.layout(0, originY, width, layout.toDevicePixels(measuredHeight));
            const bounds = contentScrollView.frame;
            const boundsSize = bounds.size;
            contentSize.height = contentSize.height + measuredHeight;
            boundsSize.height = boundsSize.height + measuredHeight;
            contentScrollView.contentSize = contentSize;
            // contentScrollView.autoresizingMask = UIViewAutoresizing.FlexibleHeight;
            bounds.size = boundsSize;
            contentScrollView.frame = bounds;
            // this.preferredContentSize = this.updatePreferredContentSize(this.preferredContentSize);
        }
        super.viewDidLayoutSubviews();
    }
    viewDidLoad() {
        super.viewDidLoad();
        if (this._customContentView) {
            this.addCustomViewToLayout();
        }
    }
    viewDidUnload() {
        super.viewDidUnload();
        if (this.customContentView) {
            this._customContentView.callUnloaded();
            this._customContentView._tearDownUI(true);
            this._customContentView = null;
        }
    }
}

function addButtonsToAlertController(alertController: MDCAlertController, options: ConfirmOptions, callback?: Function): void {
    if (!options) {
        return;
    }

    if (isString(options.cancelButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(options.cancelButtonText, MDCActionEmphasis.Low, () => {
                raiseCallback(callback, false);
            })
        );
    }

    if (isString(options.neutralButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(options.neutralButtonText, MDCActionEmphasis.Low, () => {
                raiseCallback(callback, undefined);
            })
        );
    }

    if (isString(options.okButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(options.okButtonText, MDCActionEmphasis.Low, () => {
                raiseCallback(callback, true);
            })
        );
    }
}

function raiseCallback(callback, result) {
    if (isFunction(callback)) {
        callback(result);
    }
}

function createAlertController(options: DialogOptions & MDCAlertControlerOptions, resolve?: Function) {
    const alertController = MDCAlertControllerImpl.new() as MDCAlertControllerImpl;

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
    }
    if (options.titleIconTintColor) {
        alertController.titleIconTintColor = options.titleIconTintColor.ios;
    }
    if (options.messageColor) {
        alertController.messageColor = options.messageColor.ios;
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
                ? (options.view as View)
                : createViewFromEntry({
                      moduleName: options.view as string
                  });
        alertController.customContentView = view;
        (alertController as any)._resolveFunction = resolve;
        const context = options.context || {};
        context.closeCallback = function(...originalArgs) {
            alertController.dismissModalViewControllerAnimated(true);
            (alertController as any)._resolveFunction = null;
            if (resolve) {
                resolve(originalArgs);
            }
        };
        alertController._customContentViewContext = context;
        // view.bindingContext = fromObject(context);
    }

    // const transitionController = MDCDialogTransitionController.alloc().init()
    // alertController.modalPresentationStyle = UIModalPresentationStyle.Custom;
    // alertController.transitioningDelegate = transitionController;
    return alertController as MDCAlertController;
}

export function alert(arg: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            const options = !isDialogOptions(arg) ? { title: ALERT, okButtonText: OK, message: arg + '' } : arg;
            const alertController = createAlertController(options, resolve);

            addButtonsToAlertController(alertController, options, result => {
                (alertController as any)._resolveFunction = null;
                resolve(result);
            });

            showUIAlertController(alertController);
        } catch (ex) {
            reject(ex);
        }
    });
}

export function confirm(arg: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const options = !isDialogOptions(arg)
                ? {
                      title: CONFIRM,
                      okButtonText: OK,
                      cancelButtonText: CANCEL,
                      message: arg + ''
                  }
                : arg;
            const alertController = createAlertController(options);

            addButtonsToAlertController(alertController, options, r => {
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
        title: PROMPT,
        okButtonText: OK,
        cancelButtonText: CANCEL,
        inputType: inputType.text
    };

    if (arguments.length === 1) {
        if (isString(arg)) {
            options = defaultOptions;
            options.message = arg;
        } else {
            options = arg;
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.defaultText = arguments[1];
        }
    }

    return new Promise<PromptResult>((resolve, reject) => {
        try {
            // let textField: MDCTextField;

            const stackLayout = new StackLayout();
            stackLayout.padding = 4;
            const textField = new TextField();
            textField.text = options.defaultText;
            if (options) {
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
            stackLayout.addChild(textField)
            options.view = stackLayout;

            const alertController = createAlertController(options);
            addButtonsToAlertController(alertController, options, r => {
                resolve({ result: r, text: textField.text });
            });

            showUIAlertController(alertController);
        } catch (ex) {
            reject(ex);
        }
    });
}

export function login(): Promise<LoginResult> {
    let options: LoginOptions & MDCAlertControlerOptions;

    const defaultOptions = {
        title: LOGIN,
        okButtonText: OK,
        cancelButtonText: CANCEL
    };

    if (arguments.length === 1) {
        if (isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        } else {
            options = arguments[0];
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.userName = arguments[1];
        }
    } else if (arguments.length === 3) {
        if (isString(arguments[0]) && isString(arguments[1]) && isString(arguments[2])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.userName = arguments[1];
            options.password = arguments[2];
        }
    }

    return new Promise<LoginResult>((resolve, reject) => {
        try {
            const stackLayout = new StackLayout();
            stackLayout.padding = 4;
            const userNameTextField = new TextField();
            const passwordTextField = new TextField();
            userNameTextField.hint = 'Login';
            userNameTextField.text = options.userName;
            userNameTextField.hint = 'Password';
            passwordTextField.text = options.password;
            passwordTextField.secure = true;
            
            stackLayout.addChild(userNameTextField)
            stackLayout.addChild(passwordTextField)
            options.view = stackLayout;
            const alertController = createAlertController(options);

            const textFieldColor = getTextFieldColor();
            

            // alertController.addTextFieldWithConfigurationHandler(
            //     (arg: UITextField) => {
            //         arg.placeholder = "Login"
            //         arg.text = isString(options.userName)
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
            //         arg.text = isString(options.password)
            //             ? options.password
            //             : ""

            //         if (textFieldColor) {
            //             arg.textColor = arg.tintColor = textFieldColor.ios
            //         }
            //     }
            // )

            // userNameTextField = alertController.textFields.firstObject
            // passwordTextField = alertController.textFields.lastObject

            addButtonsToAlertController(alertController, options, r => {
                resolve({
                    result: r,
                    userName: userNameTextField.text,
                    password: passwordTextField.text
                });
            });

            showUIAlertController(alertController);
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
    } else {
        MDCAlertControllerThemer.applySchemeToAlertController(MDCAlertScheme.alloc().init(), alertController);
    }

    let currentView = getCurrentPage() || getRootView();

    if (currentView) {
        currentView = currentView.modal || currentView;

        let viewController: UIViewController = currentView.ios;

        if (!(currentView.ios instanceof UIViewController)) {
            const parentWithController = iosView.getParentWithViewController(currentView);
            viewController = parentWithController ? parentWithController.viewController : undefined;
        }

        if (viewController) {
            if (alertController.popoverPresentationController) {
                alertController.popoverPresentationController.sourceView = viewController.view;
                alertController.popoverPresentationController.sourceRect = CGRectMake(viewController.view.bounds.size.width / 2.0, viewController.view.bounds.size.height / 2.0, 1.0, 1.0);
                alertController.popoverPresentationController.permittedArrowDirections = 0;
            }

            const color = getButtonColors().color;
            if (color) {
                alertController.view.tintColor = color.ios;
            }

            const lblColor = getLabelColor();
            if (lblColor) {
                if (alertController.title) {
                    const title = NSAttributedString.alloc().initWithStringAttributes(alertController.title, {
                        [NSForegroundColorAttributeName]: lblColor.ios
                    } as any);
                    alertController.setValueForKey(title, 'attributedTitle');
                }
                if (alertController.message) {
                    const message = NSAttributedString.alloc().initWithStringAttributes(alertController.message, {
                        [NSForegroundColorAttributeName]: lblColor.ios
                    } as any);
                    alertController.setValueForKey(message, 'attributedMessage');
                }
            }

            viewController.presentModalViewControllerAnimated(alertController, true);
        }
    }
}

export function action(): Promise<string> {
    let options: ActionOptions;

    const defaultOptions = { title: null, cancelButtonText: CANCEL };

    if (arguments.length === 1) {
        if (isString(arguments[0])) {
            options = defaultOptions;
            options.message = arguments[0];
        } else {
            options = arguments[0];
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions;
            options.message = arguments[0];
            options.cancelButtonText = arguments[1];
        }
    } else if (arguments.length === 3) {
        if (isString(arguments[0]) && isString(arguments[1]) && isDefined(arguments[2])) {
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
            const alertController = createAlertController(options);

            if (options.actions) {
                for (i = 0; i < options.actions.length; i++) {
                    action = options.actions[i];
                    if (isString(action)) {
                        alertController.addAction(
                            MDCAlertAction.actionWithTitleEmphasisHandler(action, MDCActionEmphasis.Low, (arg: MDCAlertAction) => {
                                resolve(arg.title);
                            })
                        );
                    }
                }
            }

            if (isString(options.cancelButtonText)) {
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
