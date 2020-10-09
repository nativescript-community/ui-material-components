/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/unified-signatures */
import { ActionOptions, AlertOptions, ConfirmOptions, LoginResult, PromptResult, LoginOptions as TNSLoginOptions, PromptOptions as TNSPromptOptions } from '@nativescript/core';
import { TextField, TextFieldProperties } from '@nativescript-community/ui-material-textfield';
import { MDCAlertControlerOptions } from './dialogs-common';

export interface PromptOptions extends TNSPromptOptions {
    autoFocus?: boolean;

    /**
     * Gets or sets the hint text to display in the input box.
     */
    hintText?: string;
    /**
     * Gets or sets the helper text to display in the input box.
     */
    helperText?: string;
    /**
     * Optional object to set any property to the textfield!
     */
    textFieldProperties?: Partial<TextFieldProperties>;
}

export interface LoginOptions extends TNSLoginOptions {
    autoFocus?: boolean;
    /**
     * Gets or sets the default text to display as hint in the user name input box.
     */
    userNameHint?: string;

    /**
     * Gets or sets the default text to display as hint in the password input box.
     */
    passwordHint?: string;

    /**
     * Optional object to set any property to the username textfield!
     */
    usernameTextFieldProperties?: Partial<TextFieldProperties>;

    /**
     * Optional object to set any property to the username textfield!
     */
    passwordTextFieldProperties?: Partial<TextFieldProperties>;

    /**
     * Optional function to choose if you can validate or not
     */
    beforeShow?: (options: LoginOptions & MDCAlertControlerOptions, usernameTextField: TextField, passwordTextField: TextField) => void;
}

export { MDCAlertControlerOptions };

/**
 * The alert() method displays an alert box with a specified message.
 * @param message Specifies the text to display in the alert box.
 */
export function alert(message: string | number | boolean): Promise<void>;

/**
 * The alert() method displays an alert box with a specified message.
 * @param options Specifies the options for the alert box.
 */
export function alert(options: AlertOptions & MDCAlertControlerOptions): Promise<void>;

/**
 * The confirm() method displays a dialog box with a specified message.
 * @param message Specifies the text to display in the confirm box.
 */
export function confirm(message: string): Promise<boolean>;

/**
 * The confirm() method displays a dialog box with a specified message.
 * @param options Specifies the options for the confirm box.
 */
export function confirm(options: ConfirmOptions & MDCAlertControlerOptions): Promise<boolean>;

/**
 * The prompt() method displays a dialog box that prompts the visitor for input.
 * @param message The text to display in the dialog box.
 * @param defaultText The default text to display in the input box. Optional.
 */
export function prompt(message: string, defaultText?: string): Promise<PromptResult>;

/**
 * The prompt() method displays a dialog box that prompts the visitor for input.
 * @param options The options for the dialog box.
 */
export function prompt(options: PromptOptions & MDCAlertControlerOptions): Promise<PromptResult>;

/**
 * The login() method displays a login dialog box that prompts the visitor for user name and password.
 * @param message The text to display in the dialog box.
 * @param userName The default text to display in the user name input box. Optional.
 * @param password The default text to display in the password input box. Optional.
 */
export function login(message: string, userName?: string, password?: string): Promise<LoginResult>;

/**
 * The login() method displays a login dialog box that prompts the visitor for user name and password.
 * @param options The options for the dialog box.
 */
export function login(options: LoginOptions & MDCAlertControlerOptions): Promise<LoginResult>;

/**
 * The action() method displays a action box that prompts the visitor to choose some action.
 * @param message The text to display in the dialog box.
 * @param cancelButtonText The text to display in the cancel button.
 * @param actions List of available actions.
 */
export function action(message: string, cancelButtonText: string, actions: string[]): Promise<string>;

/**
 * The action() method displays a action box that prompts the visitor to choose some action.
 * @param options The options for the dialog box.
 */
export function action(options: ActionOptions & MDCAlertControlerOptions): Promise<string>;

export class AlertDialog {
    constructor(options: AlertOptions & MDCAlertControlerOptions);
    show(resolve?);
    hide();
}
