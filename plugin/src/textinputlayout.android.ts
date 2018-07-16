/// <reference path="../references.d.ts" />
import * as common from './textinputlayout.common';
import * as app from 'application';
import * as fs from 'file-system';
import * as utils from 'utils/utils';
import * as types from 'utils/types';
import * as imageSrc from 'image-source';
import * as platform from 'platform';
import { View, layout, PercentLength, Length } from 'ui/core/view';
import { Color } from 'color';
global.moduleMerge(common, exports);
export const FrameLayout = android.widget.FrameLayout;
declare global {
    namespace com {
        namespace google {
            namespace android {
                namespace material {
                    namespace textfield {
                        class TextInputLayout extends FrameLayout {
                            // setupWith(rootView): this;
                            // windowBackground(background): this;
                            // blurAlgorithm(algo): this;
                            // blurRadius(radius): this;
                            // setHasFixedTransformationMatrix(value): this;
                        }
                    }
                }
            }
        }
    }
}


export class TextInputLayout extends common.TextInputLayout {
    nativeViewProtected: com.google.android.material.textfield.TextInputLayout;
    constructor() {
        super();
    }

    get android(): com.google.android.material.textfield.TextInputLayout {
        return this.nativeView;
    }
    public createNativeView() {
        // const blurView = new eightbitlab.com.blurview.BlurView(this._context);
        // const decorView = this._context.getWindow().getDecorView();
        // ViewGroup you want to start blur from. Choose root as close to BlurView in hierarchy as possible.
        // const rootView = decorView.getRootView();
        // set background, if your root layout doesn't have one
        // const windowBackground = decorView.getBackground();

        // blurView
        //     .setupWith(rootView)
        //     .windowBackground(windowBackground)
        //     .blurAlgorithm(new eightbitlab.com.blurview.RenderScriptBlur(this._context))
        //     .blurRadius(this.blurRadius)
        //     .setHasFixedTransformationMatrix(true);
        // return blurView;
        return null;
    }

    viewInit = false;
    public initNativeView() {
        super.initNativeView();
        this.viewInit = true;
    }
    // [common.blurRadiusProperty.setNative](value: number) {
    //     this.blurRadius = value;
    //     if (this.nativeView) {
    //         (this.nativeView as eightbitlab.com.blurview.BlurView).blurRadius(this.blurRadius);
    //     }
    // }
}
