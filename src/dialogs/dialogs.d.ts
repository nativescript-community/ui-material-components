import { ActionOptions, AlertOptions, ConfirmOptions, LoginOptions, LoginResult, PromptOptions, PromptResult } from 'tns-core-modules/ui/dialogs';
import { Font } from 'tns-core-modules/ui/styling/font';
import { Color } from 'tns-core-modules/color/color';
import { TextAlignment, View } from 'tns-core-modules/ui/text-base/text-base';
import { ImageSource } from 'tns-core-modules/image-source/image-source';
import { Page } from 'tns-core-modules/ui/page/page';


declare module 'tns-core-modules/ui/dialogs' {
    function isDialogOptions(arg): boolean;
    function getTextFieldColor(): Color;
    function getLabelColor(): Color;
    function getButtonColors(): { color: Color; backgroundColor: Color };
    function getCurrentPage(): Page;
    const STRING: string;
    const PROMPT: string;
    const CONFIRM: string;
    const ALERT: string;
    const LOGIN: string;
    const OK: string;
    const CANCEL: string;
}


export * from 'tns-core-modules/ui/dialogs';


export interface MDCAlertControlerOptions {
    buttonFont?: Font;
    buttonInkColor?: Color;
    buttonTitleColor?: Color;
    cornerRadius?: number;
    elevation?: number;
    messageColor?: Color;
    messageFont?: Font;
    scrimColor?: Color;
    titleAlignment?: TextAlignment;
    titleColor?: Color;
    titleFont?: Font;
    titleIcon?: ImageSource;
    titleIconTintColor?: Color;
    customTitleView?: View;
    view?: View | string;
    context?: any;
    closeCallback?: Function;
}

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
export function action(message: string, cancelButtonText: string, actions: Array<string>): Promise<string>;

/**
 * The action() method displays a action box that prompts the visitor to choose some action.
 * @param options The options for the dialog box.
 */
export function action(options: ActionOptions & MDCAlertControlerOptions): Promise<string>;
