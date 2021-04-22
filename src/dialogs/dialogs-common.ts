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
    closeCallback?: Function;
    shouldResolveOnAction?: (result) => boolean;
}

export function isDialogOptions(arg) {
    return typeof arg === 'object';
}
