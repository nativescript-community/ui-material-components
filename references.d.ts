/// <reference path="./src/typings/mdc.android.d.ts" />
/// <reference path="./src/typings/mdc.ios.d.ts" />

/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./node_modules/tns-platform-declarations/android-28.d.ts" />

interface MDCAlertController {
    alertView: MDCAlertControllerView;
    mdc_dialogPresentationController: MDCDialogPresentationController;
}
interface MDCAlertControllerView extends UIView {
    customContentView: UIView;
    calculateContentSizeThatFitsWidth(width: number): CGSize;
}
