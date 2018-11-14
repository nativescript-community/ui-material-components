import { ActivityIndicatorBase } from "./activityindicator-common";
declare module "tns-core-modules/ui/core/view" {
    interface View {
        _onSizeChanged(): any;
    }
}
export declare class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: MDCActivityIndicator;
    autoSize: boolean;
    readonly ios: MDCActivityIndicator;
    createNativeView(): MDCActivityIndicator;
    colorThemer: MDCSemanticColorScheme;
    getColorThemer(): MDCSemanticColorScheme;
    _onSizeChanged(): void;
    private updateStrokeRadius(width, height);
}
