/// <reference path="../references.d.ts" />
import * as common from './textinputlayout.common';
export declare const FrameLayout: typeof android.widget.FrameLayout;
declare global  {
    namespace com {
        namespace google {
            namespace android {
                namespace material {
                    namespace textfield {
                        class TextInputLayout extends FrameLayout {
                        }
                    }
                }
            }
        }
    }
}
export declare class TextInputLayout extends common.TextInputLayout {
    nativeViewProtected: com.google.android.material.textfield.TextInputLayout;
    constructor();
    readonly android: com.google.android.material.textfield.TextInputLayout;
    createNativeView(): any;
    viewInit: boolean;
    initNativeView(): void;
}
