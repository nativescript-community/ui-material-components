import { ios as iosView } from "tns-core-modules/ui/core/view"

import { getRootView } from "tns-core-modules/application"
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
} from "tns-core-modules/ui/dialogs"
import { isDefined, isFunction, isString } from "tns-core-modules/utils/types"
import { MDCAlertControlerOptions } from "./dialog"
import { themer } from "./material"

function addButtonsToAlertController(
    alertController: MDCAlertController,
    options: ConfirmOptions,
    callback?: Function
): void {
    if (!options) {
        return
    }

    if (isString(options.cancelButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(
                options.cancelButtonText,
                MDCActionEmphasis.Low,
                () => {
                    raiseCallback(callback, false)
                }
            )
        )
    }

    if (isString(options.neutralButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(
                options.neutralButtonText,
                MDCActionEmphasis.Low,
                () => {
                    raiseCallback(callback, undefined)
                }
            )
        )
    }

    if (isString(options.okButtonText)) {
        alertController.addAction(
            MDCAlertAction.actionWithTitleEmphasisHandler(
                options.okButtonText,
                MDCActionEmphasis.Low,
                () => {
                    raiseCallback(callback, true)
                }
            )
        )
    }
}

function raiseCallback(callback, result) {
    if (isFunction(callback)) {
        callback(result)
    }
}

function createAlertController(
    options: DialogOptions & MDCAlertControlerOptions
) {
    const alertController = MDCAlertController.alertControllerWithTitleMessage(
        options.title,
        options.message
    )

    if (options.buttonFont) {
        alertController.buttonFont = options.buttonFont.getUIFont(
            alertController.buttonFont
        )
    }
    if (options.messageFont) {
        alertController.messageFont = options.messageFont.getUIFont(
            alertController.messageFont
        )
    }
    if (options.titleFont) {
        alertController.titleFont = options.titleFont.getUIFont(
            alertController.titleFont
        )
    }
    if (options.buttonInkColor) {
        alertController.buttonInkColor = options.buttonInkColor.ios
    }
    if (options.buttonTitleColor) {
        alertController.buttonTitleColor = options.buttonTitleColor.ios
    }
    if (options.scrimColor) {
        alertController.scrimColor = options.scrimColor.ios
    }
    if (options.titleColor) {
        alertController.titleColor = options.titleColor.ios
    }
    if (options.titleIconTintColor) {
        alertController.titleIconTintColor = options.titleIconTintColor.ios
    }
    if (options.messageColor) {
        alertController.messageColor = options.messageColor.ios
    }
    if (options.elevation) {
        alertController.elevation = options.elevation
    }
    if (options.cornerRadius) {
        alertController.cornerRadius = options.cornerRadius
    }
    if (options.titleIcon) {
        alertController.titleIcon = options.titleIcon.ios
    }
    if (options.titleAlignment) {
        switch (options.titleAlignment) {
            case "initial":
            case "left":
                alertController.titleAlignment = NSTextAlignment.Left
                break
            case "center":
                alertController.titleAlignment = NSTextAlignment.Center
                break
            case "right":
                alertController.titleAlignment = NSTextAlignment.Right
                break
        }
    }

    // const transitionController = MDCDialogTransitionController.alloc().init()
    // alertController.modalPresentationStyle = UIModalPresentationStyle.Custom;
    // alertController.transitioningDelegate = transitionController;
    return alertController as MDCAlertController
}

export function alert(arg: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        try {
            const options = !isDialogOptions(arg)
                ? { title: ALERT, okButtonText: OK, message: arg + "" }
                : arg
            const alertController = createAlertController(options)

            addButtonsToAlertController(alertController, options, () => {
                resolve()
            })

            showUIAlertController(alertController)
        } catch (ex) {
            reject(ex)
        }
    })
}

export function confirm(arg: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const options = !isDialogOptions(arg)
                ? {
                      title: CONFIRM,
                      okButtonText: OK,
                      cancelButtonText: CANCEL,
                      message: arg + ""
                  }
                : arg
            const alertController = createAlertController(options)

            addButtonsToAlertController(alertController, options, r => {
                resolve(r)
            })

            showUIAlertController(alertController)
        } catch (ex) {
            reject(ex)
        }
    })
}

export function prompt(arg: any): Promise<PromptResult> {
    let options: PromptOptions

    const defaultOptions = {
        title: PROMPT,
        okButtonText: OK,
        cancelButtonText: CANCEL,
        inputType: inputType.text
    }

    if (arguments.length === 1) {
        if (isString(arg)) {
            options = defaultOptions
            options.message = arg
        } else {
            options = arg
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions
            options.message = arguments[0]
            options.defaultText = arguments[1]
        }
    }

    return new Promise<PromptResult>((resolve, reject) => {
        try {
            let textField: MDCTextField
            const alertController = createAlertController(options)

            // alertController.addTextFieldWithConfigurationHandler(
            //     (arg: UITextField) => {
            //         arg.text = isString(options.defaultText)
            //             ? options.defaultText
            //             : ""
            //         arg.secureTextEntry =
            //             options && options.inputType === inputType.password

            //         if (options && options.inputType === inputType.email) {
            //             arg.keyboardType = UIKeyboardType.EmailAddress
            //         } else if (
            //             options &&
            //             options.inputType === inputType["number"]
            //         ) {
            //             arg.keyboardType = UIKeyboardType.NumberPad
            //         } else if (
            //             options &&
            //             options.inputType === inputType["phone"]
            //         ) {
            //             arg.keyboardType = UIKeyboardType.PhonePad
            //         }

            //         let color = getTextFieldColor()
            //         if (color) {
            //             arg.textColor = arg.tintColor = color.ios
            //         }
            //     }
            // )
            textField = MDCTextField.new()
            const controller = MDCTextInputControllerUnderline.alloc().initWithTextInput(
                textField
            )

            textField.text = isString(options.defaultText)
                ? options.defaultText
                : ""
            textField.secureTextEntry =
                options && options.inputType === inputType.password

            if (options && options.inputType === inputType.email) {
                textField.keyboardType = UIKeyboardType.EmailAddress
            } else if (options && options.inputType === inputType["number"]) {
                textField.keyboardType = UIKeyboardType.NumberPad
            } else if (options && options.inputType === inputType["phone"]) {
                textField.keyboardType = UIKeyboardType.PhonePad
            }

            const color = getTextFieldColor()
            if (color) {
                textField.textColor = textField.tintColor = color.ios
            }

            const colorScheme = themer.getAppColorScheme()
            if (colorScheme) {
                MDCTextFieldColorThemer.applySemanticColorSchemeToTextInput(
                    colorScheme,
                    textField
                )
                MDCTextFieldColorThemer.applySemanticColorSchemeToTextInputController(
                    colorScheme,
                    controller
                )
            }
            // alertController.setupAlertView();
            // const alertView = alertController.alertView;
            // console.log('test', alertView);
            // const scrollView = alertView.subviews[0] as UIScrollView
            // scrollView.addSubview(textField)

            // textField = alertController.textFields.firstObject

            if (options) {
                switch (options.capitalizationType) {
                    case capitalizationType.all: {
                        textField.autocapitalizationType =
                            UITextAutocapitalizationType.AllCharacters
                        break
                    }
                    case capitalizationType.sentences: {
                        textField.autocapitalizationType =
                            UITextAutocapitalizationType.Sentences
                        break
                    }
                    case capitalizationType.words: {
                        textField.autocapitalizationType =
                            UITextAutocapitalizationType.Words
                        break
                    }
                    default: {
                        textField.autocapitalizationType =
                            UITextAutocapitalizationType.None
                    }
                }
            }

            addButtonsToAlertController(alertController, options, r => {
                resolve({ result: r, text: textField.text })
            })

            showUIAlertController(alertController)
        } catch (ex) {
            reject(ex)
        }
    })
}

export function login(): Promise<LoginResult> {
    let options: LoginOptions

    const defaultOptions = {
        title: LOGIN,
        okButtonText: OK,
        cancelButtonText: CANCEL
    }

    if (arguments.length === 1) {
        if (isString(arguments[0])) {
            options = defaultOptions
            options.message = arguments[0]
        } else {
            options = arguments[0]
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions
            options.message = arguments[0]
            options.userName = arguments[1]
        }
    } else if (arguments.length === 3) {
        if (
            isString(arguments[0]) &&
            isString(arguments[1]) &&
            isString(arguments[2])
        ) {
            options = defaultOptions
            options.message = arguments[0]
            options.userName = arguments[1]
            options.password = arguments[2]
        }
    }

    return new Promise<LoginResult>((resolve, reject) => {
        try {
            let userNameTextField: UITextField
            let passwordTextField: UITextField
            const alertController = createAlertController(options)

            const textFieldColor = getTextFieldColor()

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
                })
            })

            showUIAlertController(alertController)
        } catch (ex) {
            reject(ex)
        }
    })
}

function showUIAlertController(alertController: MDCAlertController) {
    // themer needs to be applied after actions creation

    const colorScheme: MDCSemanticColorScheme =
        themer.getAppColorScheme() || MDCAlertScheme.alloc().init()
    MDCAlertColorThemer.applySemanticColorSchemeToAlertController(
        colorScheme,
        alertController
    )

    let currentView = getCurrentPage() || getRootView()

    if (currentView) {
        currentView = currentView.modal || currentView

        let viewController: UIViewController = currentView.ios

        if (!(currentView.ios instanceof UIViewController)) {
            const parentWithController = iosView.getParentWithViewController(
                currentView
            )
            viewController = parentWithController
                ? parentWithController.viewController
                : undefined
        }

        if (viewController) {
            if (alertController.popoverPresentationController) {
                alertController.popoverPresentationController.sourceView =
                    viewController.view
                alertController.popoverPresentationController.sourceRect = CGRectMake(
                    viewController.view.bounds.size.width / 2.0,
                    viewController.view.bounds.size.height / 2.0,
                    1.0,
                    1.0
                )
                alertController.popoverPresentationController.permittedArrowDirections = 0
            }

            const color = getButtonColors().color
            if (color) {
                alertController.view.tintColor = color.ios
            }

            const lblColor = getLabelColor()
            if (lblColor) {
                if (alertController.title) {
                    const title = NSAttributedString.alloc().initWithStringAttributes(
                        alertController.title,
                        {
                            [NSForegroundColorAttributeName]: lblColor.ios
                        } as any
                    )
                    alertController.setValueForKey(title, "attributedTitle")
                }
                if (alertController.message) {
                    const message = NSAttributedString.alloc().initWithStringAttributes(
                        alertController.message,
                        {
                            [NSForegroundColorAttributeName]: lblColor.ios
                        } as any
                    )
                    alertController.setValueForKey(message, "attributedMessage")
                }
            }

            viewController.presentModalViewControllerAnimated(
                alertController,
                true
            )
        }
    }
}

export function action(): Promise<string> {
    let options: ActionOptions

    const defaultOptions = { title: null, cancelButtonText: CANCEL }

    if (arguments.length === 1) {
        if (isString(arguments[0])) {
            options = defaultOptions
            options.message = arguments[0]
        } else {
            options = arguments[0]
        }
    } else if (arguments.length === 2) {
        if (isString(arguments[0]) && isString(arguments[1])) {
            options = defaultOptions
            options.message = arguments[0]
            options.cancelButtonText = arguments[1]
        }
    } else if (arguments.length === 3) {
        if (
            isString(arguments[0]) &&
            isString(arguments[1]) &&
            isDefined(arguments[2])
        ) {
            options = defaultOptions
            options.message = arguments[0]
            options.cancelButtonText = arguments[1]
            options.actions = arguments[2]
        }
    }

    return new Promise<string>((resolve, reject) => {
        try {
            let i: number
            let action: string
            const alertController = createAlertController(options)

            if (options.actions) {
                for (i = 0; i < options.actions.length; i++) {
                    action = options.actions[i]
                    if (isString(action)) {
                        alertController.addAction(
                            MDCAlertAction.actionWithTitleEmphasisHandler(
                                action,
                                MDCActionEmphasis.Low,
                                (arg: MDCAlertAction) => {
                                    resolve(arg.title)
                                }
                            )
                        )
                    }
                }
            }

            if (isString(options.cancelButtonText)) {
                alertController.addAction(
                    MDCAlertAction.actionWithTitleEmphasisHandler(
                        options.cancelButtonText,
                        MDCActionEmphasis.Low,
                        (arg: MDCAlertAction) => {
                            resolve(arg.title)
                        }
                    )
                )
            }

            showUIAlertController(alertController)
        } catch (ex) {
            reject(ex)
        }
    })
}
