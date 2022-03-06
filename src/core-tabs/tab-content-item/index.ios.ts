// Requires
import { TabContentItemBase } from './tab-content-item-common';

export * from './tab-content-item-common';

export class TabContentItem extends TabContentItemBase {
    // used to store native value
    private __controller: UIViewController;

    public setViewController(controller: UIViewController, nativeView: UIView) {
        this.__controller = controller;
        this.setNativeView(nativeView);
    }

    public disposeNativeView() {
        this.__controller = undefined;
        this.setNativeView(undefined);
    }
}
