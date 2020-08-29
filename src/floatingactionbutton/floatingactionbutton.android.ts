import { FloatingActionButtonBase, imageSourceProperty, sizeProperty, srcProperty } from './floatingactionbutton-common';
import { ImageSource } from '@nativescript/core';
import { dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { Color } from '@nativescript/core';
import { backgroundInternalProperty, colorProperty, Length } from '@nativescript/core/ui/page';
import { Background } from '@nativescript/core/ui/styling/background';

let MDCFabButton: typeof com.google.android.material.floatingactionbutton.FloatingActionButton;

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: com.google.android.material.floatingactionbutton.FloatingActionButton;

    public createNativeView() {
        if (!MDCFabButton) {
            MDCFabButton = com.google.android.material.floatingactionbutton.FloatingActionButton;
        }
        const view = new MDCFabButton(this._context);
        view.setSize(MDCFabButton.SIZE_NORMAL);
        return view;
    }

    [imageSourceProperty.setNative](value: ImageSource) {
        const nativeView = this.nativeViewProtected;
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
        const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this.nativeViewProtected.setCompatElevation(newValue);
    }

    [dynamicElevationOffsetProperty.setNative](value: number) {
        // const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this.nativeViewProtected.setTranslationZ(value);
    }

    [sizeProperty.setNative](value: string) {
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
    [colorProperty.setNative](value: Color) {
        this.nativeViewProtected.setSupportImageTintList(android.content.res.ColorStateList.valueOf(value.android));
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(color.android));
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(color.android));
    }
}
