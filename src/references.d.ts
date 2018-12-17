/// <reference path="./typings/mdc.android.d.ts" />
/// <reference path="./typings/mdc.ios.d.ts" />

interface MDCAlertController {
    alertView: MDCAlertControllerView;
}
interface MDCAlertControllerView {
    customContentView: UIView;
    calculateContentSizeThatFitsWidth(width: number): CGSize;
}
