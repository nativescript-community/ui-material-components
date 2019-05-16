import { View } from 'tns-core-modules/ui/page/page';
import { ImageSource } from 'tns-core-modules/image-source/image-source';
import { TextAlignment } from 'tns-core-modules/ui/text-base/text-base';
import { Font } from 'tns-core-modules/ui/styling/font';
import { Color } from 'tns-core-modules/color';

declare module 'tns-core-modules/ui/core/view' {
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
    view?: View | string;
    context?: any;
    closeCallback?: Function;
}
