import { View } from '@nativescript/core';

export declare class SnackBar {
    /**
     * Shows a simple SnackBar.
     * @param {string} - The SnackBar text.
     * @param {string} - The color of the snackbar text.backgroundColor
     * @param {string} - The background color of the snackbar.
     * @param {number} - The max lines for the text of the snackbar. * Android Only *
     * @param {boolean} - Set RTL for the textview of the snackbar. * Android Only *
     */
    simple(message: string, textColor?: string, backgroundColor?: string, maxLines?: number, isRTL?: boolean): Promise<any>;

    /**
     * Show a SnackBar with Action
     */
    action(options: SnackBarOptions): Promise<any>;

    /**
     * Manually Dismiss an active SnackBar.
     */
    dismiss(): Promise<any>;

    showSnack(
        options: SnackBarOptions
    ): Promise<{
        action: SnackBarAction;
        reason: DismissReasons;
    }>;
}

export function showSnack(options: SnackBarOptions);

export interface SnackBarOptions {
    /**
     * The action button text of the snackbar.
     */
    actionText?: string;

    /**
     * The text of the snackbar.
     */
    message: string;

    /**
     * Delay in ms to hide the snackbar.
     * Note: iOS only allows a maximum of 10s. If the value is more than that for iOS, the hideDelay will be set to 10s
     */
    hideDelay?: number;

    /**
     * Action Text Color of the snackbar.
     */
    actionTextColor?: string;

    /**
     * Text Color of the snackbar.
     */
    textColor?: string;

    /**
     * Background Color of the snackbar.
     */
    backgroundColor?: string;
    /**
     * *Android Only*
     * Set the maxLines if you are displaying a long string of text and it will wrap.
     */
    maxLines?: number;

    /**
     * *Android Only*
     * Use RTL for textview of snackbar.
     */
    isRTL?: boolean;
    /**
     * *Android Only*
     * optional View to attach the snack to
     */
    view?: View;
}

export enum DismissReasons {
    SWIPE = 'Swipe',
    ACTION = 'Action',
    TIMEOUT = 'Timeout',
    MANUAL = 'Manual',
    CONSECUTIVE = 'Consecutive',
}

export enum SnackBarAction {
    NONE = 'None',
    DISMISS = 'Dismiss',
}
