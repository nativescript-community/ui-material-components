import { VerticalTextAlignment, verticalTextAlignmentProperty } from '@nativescript-community/text';
import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorAlphaProperty, rippleColorProperty, shapeProperty, themer } from '@nativescript-community/ui-material-core';
import { createStateListAnimator, getColorStateList, getHorizontalGravity, getVerticalGravity, inflateLayout, isPostLollipop } from '@nativescript-community/ui-material-core/android/utils';
import {
    Background,
    Color,
    CoreTypes,
    ImageSource,
    Length,
    Utils,
    androidDynamicElevationOffsetProperty,
    androidElevationProperty,
    backgroundInternalProperty,
    colorProperty,
    profile
} from '@nativescript/core';
import { textAlignmentProperty, textTransformProperty } from '@nativescript/core/ui/text-base';
import { ButtonBase, imageSourceProperty, srcProperty } from './button-common';

export class Button extends ButtonBase {
    nativeViewProtected: com.google.android.material.button.MaterialButton;
    nativeTextViewProtected: com.google.android.material.button.MaterialButton;

    public isLoading: boolean;

    @profile
    public createNativeView() {
        // let layoutId;
        const variant = this.variant;
        // let layoutIdName = 'ns_material_button';
        let layoutStringId: string;
        if (variant === 'text') {
            layoutStringId = 'ns_material_button_text';
        } else if (variant === 'flat') {
            layoutStringId = 'ns_material_button_flat';
        } else if (variant === 'outline') {
            layoutStringId = 'ns_material_button_outline';
        } else {
            layoutStringId = 'ns_material_button';
            // contained
            // we need to set the default through css or user would not be able to overload it through css...
            this.style['css:margin-left'] = 10;
            this.style['css:margin-right'] = 10;
            this.style['css:margin-top'] = 12;
            this.style['css:margin-bottom'] = 12;
        }
        if (this.src) {
            layoutStringId += '_icon';
        }
        const view = inflateLayout(this._context, layoutStringId) as com.google.android.material.button.MaterialButton;
        if (this.src) {
            view.setIconGravity(0x2); //com.google.android.material.button.MaterialButton.ICON_GRAVITY_TEXT_START
            // view.setIconSize(Utils.layout.toDevicePixels(24));
        }
        // if (variant === 'outline') {
        //     view.setStrokeWidth(1);
        //     if (!grayColorStateList) {
        //         grayColorStateList = getColorStateList(new Color('gray').android);
        //     }
        //     view.setStrokeColor(grayColorStateList);
        // }
        return view;
    }

    // initNativeView() {
    //     TextBase.prototype.initNativeView.call(this);
    //     const nativeView = this.nativeViewProtected;
    //     const clickListener = new android.view.View.OnClickListener({
    //         onClick:()=>{
    //     this._emit(ButtonBase.tapEvent);
    //         }
    //     });
    //     nativeView.setOnClickListener(clickListener);
    //     (<any>nativeView).clickListener = clickListener;
    // }
    [rippleColorProperty.setNative](value: Color) {
        this.nativeViewProtected.setRippleColor(value ? getColorStateList(getRippleColor(value, this.rippleColorAlpha)) : null);
    }
    [rippleColorAlphaProperty.setNative](value: number) {
        const rippleColor = this.rippleColor;
        if (rippleColor) {
            this.nativeViewProtected.setRippleColor(getColorStateList(getRippleColor(rippleColor, value)));
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

    getDefaultElevation(): number {
        return 2; // 2dp @dimen/mtrl_btn_elevation
    }

    getDefaultDynamicElevationOffset(): number {
        return 6; // 6dp @dimen/mtrl_btn_pressed_z
    }

    createStateListAnimatorTimeout;
    createStateListAnimator() {
        if (!this.createStateListAnimatorTimeout) {
            this.createStateListAnimatorTimeout = setTimeout(() => {
                this.createStateListAnimatorTimeout = null;
                if (this._context) {
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
    [androidElevationProperty.setNative](value: number) {
        // override to prevent override of elevation
    }
    [androidDynamicElevationOffsetProperty.setNative](value: number) {
        // override to prevent override of dynamicElevationOffset
    }

    setCornerRadius(value) {
        this.nativeViewProtected.setCornerRadius(value);
    }
    setStrokeWidth(value) {
        this.nativeViewProtected.setStrokeWidth(value);
    }
    [textTransformProperty.setNative](value: CoreTypes.TextTransformType) {
        this.nativeViewProtected.setAllCaps(value !== 'none');
    }
    [backgroundInternalProperty.getDefault]() {
        return null;
    }
    [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
        const view = this.nativeTextViewProtected;
        if (view) {
            if (value instanceof android.graphics.drawable.Drawable) {
                view.setBackgroundDrawable(value);
            } else {
                if (value.color) {
                    view.setBackgroundColor(value.color.android);
                }
                if (value.borderTopLeftRadius !== 0) {
                    this.setCornerRadius(value.borderTopLeftRadius);
                }
                if (value.borderTopWidth !== 0) {
                    view.setStrokeWidth(value.borderTopWidth);
                }
                if (value.borderTopColor) {
                    view.setStrokeColor(getColorStateList(value.borderTopColor.android));
                }
                if (value.image) {
                    this._createImageSourceFromSrc(value.image as any, false);
                }
            }
        }
    }

    [textAlignmentProperty.setNative](value: CoreTypes.TextAlignmentType) {
        this.nativeTextViewProtected.setGravity(getHorizontalGravity(value) | getVerticalGravity(this.verticalTextAlignment));
    }
    [verticalTextAlignmentProperty.setNative](value: VerticalTextAlignment) {
        this.nativeTextViewProtected.setGravity(getHorizontalGravity(this.textAlignment) | getVerticalGravity(value));
    }

    settingImageSourceAsIcon = false;
    [imageSourceProperty.setNative](value: ImageSource) {
        const nativeView = this.nativeViewProtected;
        if (value && value.android) {
            if (this.settingImageSourceAsIcon) {
                const fontSize = this.fontSize || nativeView.getTextSize();
                nativeView.setIconSize(Math.min(value.width, Utils.layout.toDevicePixels(fontSize)));
                // nativeView.setIconGravity(android.view.Gravity.RIGHT);
                nativeView.setIconPadding(0);
            } else {
                // nativeView.setIconGravity(android.view.Gravity.CENTER);
                nativeView.setIconPadding(0);
                // nativeView.setPadding(0, 0, 0, 0);
                nativeView.setIconTint(null);
                // nativeView.setText(null);
                nativeView.setIconSize(Math.max(Utils.layout.toDevicePixels(this.getMeasuredWidth()), Utils.layout.toDevicePixels(this.getMeasuredHeight())));
            }
            nativeView.setIcon(new android.graphics.drawable.BitmapDrawable(value.android));
        } else {
            nativeView.setIcon(null);
        }
    }

    setImageSource(value, asIcon = true) {
        this.settingImageSourceAsIcon = asIcon;
        this.imageSource = value;
    }

    [srcProperty.setNative](value: any) {
        this._createImageSourceFromSrc(value);
    }
    [colorProperty.setNative](value) {
        const color = value instanceof Color ? value.android : value;
        super[colorProperty.setNative](value);
        this.nativeViewProtected.setIconTint(getColorStateList(color));
    }
}
