import { dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from '@nativescript-community/ui-material-core';
import { createStateListAnimator, isPostLollipop } from '@nativescript-community/ui-material-core/android/utils';
import { Background, Color, ImageSource, Length, backgroundInternalProperty, colorProperty } from '@nativescript/core';
import { textProperty } from '@nativescript/core/ui/text-base';
import { FloatingActionButtonBase, expandedProperty, imageSourceProperty, sizeProperty, srcProperty } from './floatingactionbutton-common';

let MDCFabButton: typeof com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton;

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton;
    defaultPadding: number;
    public createNativeView() {
        if (!MDCFabButton) {
            MDCFabButton = com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton;
        }
        const view = new MDCFabButton(this._context);
        this.defaultPadding = view.getPaddingTop();
        return view;
    }

    [imageSourceProperty.setNative](value: ImageSource) {
        const nativeView = this.nativeViewProtected;
        if (value && value.android) {
            nativeView.setIcon(new android.graphics.drawable.BitmapDrawable(value.android));
        } else {
            nativeView.setIcon(null);
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
        if (isPostLollipop()) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setElevation(this.nativeViewProtected, newValue);
        }
    }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        if (isPostLollipop()) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setTranslationZ(this.nativeViewProtected, newValue);
        }
    }
    [textProperty.setNative](value: string) {
        this.nativeViewProtected.setText(value);
    }
    [sizeProperty.setNative](value: string) {
        switch (value) {
            case 'mini':
                this.nativeViewProtected.setPadding(30, 30, 30, 30);
                break;
            case 'auto':
            default:
                this.nativeViewProtected.setPadding(this.defaultPadding, this.defaultPadding, this.defaultPadding, this.defaultPadding);
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
        this.nativeViewProtected.setIconTint(android.content.res.ColorStateList.valueOf(value.android));
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(color.android));
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(color.android));
    }
    [expandedProperty.setNative](value: boolean) {
        if (value) {
            this.nativeViewProtected.extend();
        } else {
            this.nativeViewProtected.shrink();
        }
    }
}
