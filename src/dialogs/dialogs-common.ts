import { Color, CoreTypes, Font, ImageSource, View, ViewBase } from '@nativescript/core';

export interface MDCAlertControlerOptions {
    buttonFont?: Font;
    buttonInkColor?: Color;
    buttonTitleColor?: Color;
    cornerRadius?: number;
    elevation?: number;
    messageColor?: Color;
    messageFont?: Font;
    scrimColor?: Color;
    titleAlignment?: string;
    titleColor?: Color;
    titleFont?: Font;
    titleIcon?: ImageSource;
    titleIconTintColor?: Color;
    customTitleView?: View;
    view?: ViewBase | string;
    context?: any;
    dismissOnBackgroundTap?: boolean;
    closeCallback?: Function;
    shouldResolveOnAction?: (result) => boolean;
    iosForceClosePresentedViewController?: boolean // iOS only: if a viewController is already presenting this will close it.If set to false an error will be thrown
}

export function isDialogOptions(arg) {
    return typeof arg === 'object';
}

export const showingDialogs = [];
