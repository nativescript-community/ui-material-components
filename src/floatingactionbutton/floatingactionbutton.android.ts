import { dynamicElevationOffsetProperty, elevationProperty, rippleColorAlphaProperty, rippleColorProperty, shapeProperty, themer } from '@nativescript-community/ui-material-core';
import { createStateListAnimator, getColorStateList, isPostLollipop } from '@nativescript-community/ui-material-core/android/utils';
import { Background, Color, ImageSource, Length, backgroundInternalProperty, colorProperty } from '@nativescript/core';
import { textProperty } from '@nativescript/core/ui/text-base';
import { FloatingActionButtonBase, expandedProperty, imageSourceProperty, sizeProperty, srcProperty } from './floatingactionbutton-common';
import { getRippleColor } from '@nativescript-community/ui-material-core/index.android';

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

    createStateListAnimatorTimeout;
    createStateListAnimator() {
        if (!this.createStateListAnimatorTimeout) {
            this.createStateListAnimatorTimeout = setTimeout(() => {
                this.createStateListAnimatorTimeout = null;
                if(this.nativeViewProtected) {
                    createStateListAnimator(this, this.nativeViewProtected);
                }
            });
        }
    }
    [elevationProperty.setNative](value: number) {
        if (isPostLollipop) {
            this.createStateListAnimator();
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setElevation(this.nativeViewProtected, newValue);
        }
    }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        if (isPostLollipop) {
            this.createStateListAnimator();
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
                    this.nativeViewProtected.setBackgroundTintList(getColorStateList(value.color.android));
                }
                // } else {
                //     (this as any)._redrawNativeBackground(value);
                // }
            }
        }
    }
    [colorProperty.setNative](value: Color) {
        const color = !value || value instanceof Color ? value : new Color(value);
        this.nativeViewProtected.setIconTint(getColorStateList(color.android));
    }
    [rippleColorProperty.setNative](value: Color) {
        this.nativeViewProtected.setRippleColor(value? getColorStateList(getRippleColor(value, this.rippleColorAlpha)): null);
    }
    [rippleColorAlphaProperty.setNative](value: number) {
        if (this.rippleColor) {
            this[rippleColorProperty.setNative](this.rippleColor);
        }
    }
    [expandedProperty.setNative](value: boolean) {
        if (value) {
            this.nativeViewProtected.extend();
        } else {
            this.nativeViewProtected.shrink();
        }
    }
    defaultAppearanceModel;
    [shapeProperty.setNative](shape: string) {
        const appearanceModel = themer.getShape(shape);
        if (!shape) {
            if (this.defaultAppearanceModel) {
                this.nativeViewProtected.setShapeAppearanceModel(this.defaultAppearanceModel);
            }
        } else {
            if (!this.defaultAppearanceModel) {
                this.defaultAppearanceModel = this.nativeViewProtected.getShapeAppearanceModel();
            }
            this.nativeViewProtected.setShapeAppearanceModel(appearanceModel);
        }
    }
}
