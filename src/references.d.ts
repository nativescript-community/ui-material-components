/// <reference path="./typings/mdc.android.d.ts" />
/// <reference path="./typings/mdc.ios.d.ts" />

interface MDCAlertController {
    alertView: MDCAlertControllerView;
    mdc_dialogPresentationController: MDCDialogPresentationController;
}
interface MDCAlertControllerView extends UIView {
    customContentView: UIView;
    calculateContentSizeThatFitsWidth(width: number): CGSize;
}
