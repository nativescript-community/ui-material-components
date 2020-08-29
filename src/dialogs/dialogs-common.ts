import { View } from '@nativescript/core/ui/core/view';
import { ImageSource } from '@nativescript/core/image-source/image-source';
import { TextAlignment, ViewBase } from '@nativescript/core/ui/text-base';
import { Font } from '@nativescript/core/ui/styling/font';
import { Color } from '@nativescript/core/color';

declare module '@nativescript/core/ui/core/view' {
    interface View {
        _setupAsRootView(context: any): void;
        callLoaded(): void;
        callUnloaded(): void;
    }
}

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
    view?: ViewBase | string;
    context?: any;
    closeCallback?: Function;
    shouldResolveOnAction?: (result) => boolean;
}

export function isDialogOptions(arg) {
    return typeof arg === 'object';
}
