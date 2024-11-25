import { checkedProperty } from '@nativescript/core/ui/switch';
import { SwitchBase } from './index-common';

export class Switch extends SwitchBase {
    nativeViewProtected: com.google.android.material.materialswitch.MaterialSwitch;

    // added in 1.7.0
    createNativeView() {
        return new com.google.android.material.materialswitch.MaterialSwitch(this._context);
    }
}
