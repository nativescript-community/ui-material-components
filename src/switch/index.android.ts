import { Color, PercentLength, heightProperty } from '@nativescript/core';
import { SwitchBase } from './index-common';

export class Switch extends SwitchBase {
    nativeViewProtected: com.google.android.material.progressindicator.LinearProgressIndicator;

    // added in 1.7.0
    createNativeView() {
        return new com.google.android.material.materialswitch.MaterialSwitch(this._context);
    }
}
