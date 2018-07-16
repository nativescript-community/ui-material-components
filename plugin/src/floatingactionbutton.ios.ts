import {FloatingActionButtonBase, srcCompatProperty} from './floatingactionbutton.common';

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeView: UIView;

    constructor() {
        super();
    }

    // theme = UIBlurEffectStyle.Dark;

    get ios(): UIView {
        return this.nativeView;
    }

    public createNativeView() {
        let result = UIView.new();
        // result.effect = UIBlurEffect.effectWithStyle(this.theme);
        // result.effect.setValueForKeyPath(this.blurRadius, 'effectSettings.blurRadius');
        return result;
    }
    // [common.blurRadiusProperty.setNative](value: number) {
    //     this.blurRadius = value;
    //     if (this.nativeView) {
    //         (this.nativeView as UIVisualEffectView).effect.setValueForKeyPath(value, 'effectSettings.blurRadius');
    //     }
    // }
}
