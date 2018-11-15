import { FloatingActionButtonBase, imageSourceProperty, srcProperty } from './floatingactionbutton-common';

import { ImageSource } from 'tns-core-modules/image-source';
import { elevationProperty } from './cssproperties';
import { backgroundInternalProperty } from 'tns-core-modules/ui/page/page';
import { Background } from 'tns-core-modules/ui/styling/background';

let MDCFabButton: typeof android.support.design.widget.FloatingActionButton;

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: android.support.design.widget.FloatingActionButton;

    get android(): android.support.design.widget.FloatingActionButton {
        return this.nativeViewProtected;
    }
    public createNativeView() {
        if (!MDCFabButton) {
            MDCFabButton = android.support.design.widget.FloatingActionButton;
        }
        const view = new MDCFabButton(this._context);
        return view;
    }

    [imageSourceProperty.setNative](value: ImageSource) {
        const nativeView = this.nativeViewProtected;
        // console.log('imageSourceProperty setNative', value && value.android);
        if (value && value.android) {
            nativeView.setImageBitmap(value.android);
        } else {
            nativeView.setImageBitmap(null);
        }
    }

    [srcProperty.setNative](value: any) {
        this._createImageSourceFromSrc(value);
    }
    public show() {
        this.nativeView.show();
    }
    public hide() {
        this.nativeView.hide();
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setCompatElevation(value);
    }

    get size(): string {
        return this.style['size'];
    }
    set size(value: string) {
        this.style['size'] = value;
        if (this.nativeViewProtected) {
            switch (value) {
                case 'auto':
                    this.nativeViewProtected.setSize(MDCFabButton.SIZE_AUTO);
                    break;
                case 'mini':
                    this.nativeViewProtected.setSize(MDCFabButton.SIZE_MINI);
                    break;
                default:
                    this.nativeViewProtected.setSize(MDCFabButton.SIZE_NORMAL);
                    break;
            }
        }
    }
    [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
                this.nativeViewProtected.setBackgroundDrawable(value);
            } else {
                
                // if (android.os.Build.VERSION.SDK_INT >= 21) {
                    if (value.color) {
                        this.nativeViewProtected.setBackgroundTintList(android.content.res.ColorStateList.valueOf(value.color.android));
                    }
                // } else {
                //     (this as any)._redrawNativeBackground(value);
                // }
            }
        }
    }
}
