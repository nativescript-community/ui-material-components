import { getRippleColor, themer } from 'nativescript-material-core/core';
import { dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { Color } from '@nativescript/core/color';
import { ImageSource } from '@nativescript/core/image-source';
import { colorProperty } from '@nativescript/core/ui/page';
import { expandedProperty, FloatingActionButtonBase, imageSourceProperty, srcProperty } from './floatingactionbutton-common';

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: MDCFloatingButton;

    getDefaultElevation(): number {
        return 6;
    }

    getDefaultDynamicElevationOffset() {
        return 6;
    }
    public _setNativeImage(nativeImage: UIImage) {
        // this.nativeViewProtected.setImageForState(nativeImage ? nativeImage.imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate) : nativeImage, UIControlState.Normal);

        this.nativeViewProtected.setImageForState(nativeImage, UIControlState.Normal);
    }
    public createNativeView() {
        const result = MDCFloatingButton.floatingButtonWithShape(this.size === 'mini' ? MDCFloatingButtonShape.Mini : MDCFloatingButtonShape.Default);
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCFloatingButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, result);
        }
        return result;
    }
    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
        let dynamicElevationOffset = this.dynamicElevationOffset;
        if (typeof dynamicElevationOffset === 'undefined' || dynamicElevationOffset === null) {
            dynamicElevationOffset = this.getDefaultDynamicElevationOffset();
        }
        if (this.dynamicElevationOffset === undefined) {
            this.nativeViewProtected.setElevationForState(value + dynamicElevationOffset, UIControlState.Highlighted);
        }
    }

    [dynamicElevationOffsetProperty.setNative](value: number) {
        let elevation = this.elevation;
        if (typeof elevation === 'undefined' || elevation === null) {
            elevation = this.getDefaultElevation();
        }
        this.nativeViewProtected.setElevationForState(value + elevation, UIControlState.Highlighted);
    }
    [imageSourceProperty.setNative](value: ImageSource) {
        this._setNativeImage(value ? value.ios : null);
    }

    [srcProperty.setNative](value: any) {
        this._createImageSourceFromSrc(value);
    }
    [colorProperty.setNative](value: Color) {
        this.nativeViewProtected.tintColor = value.ios;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkColor = getRippleColor(color);
    }
    [expandedProperty.setNative](value: boolean) {
        // UIView.animateWithDurationAnimations(0.25, () => {
        this.nativeViewProtected.mode = value ? MDCFloatingButtonMode.Expanded : MDCFloatingButtonMode.Normal;
        // this.nativeViewProtected.setTitleForState(value ? this.text : null, UIControlState.Normal);
        this.nativeViewProtected.sizeToFit();
        // });

        // this.nativeViewProtected.titleForState = value ? MDCFloatingButtonMode.Expanded : MDCFloatingButtonMode.Normal;
    }
}
