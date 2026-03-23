import { Color } from '@nativescript/core';
import { SwitchBase, onBackgroundColorProperty } from './index-common';
import { getColorStateList } from '@nativescript-community/ui-material-core/android/utils';
export class Switch extends SwitchBase {
    nativeViewProtected: com.google.android.material.materialswitch.MaterialSwitch;

    createNativeView() {
        return new com.google.android.material.materialswitch.MaterialSwitch(this._context);
    }

    [onBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setTrackTintList(color ? getColorStateList(color.android) :  null);
    }
}
