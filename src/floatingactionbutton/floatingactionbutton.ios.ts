import { FloatingActionButtonBase, imageSourceProperty, srcProperty } from './floatingactionbutton-common';
import { ImageSource } from 'tns-core-modules/image-source';
import { dynamicElevationOffsetProperty, elevationProperty } from 'nativescript-material-core/cssproperties';
import { themer } from 'nativescript-material-core/core';
import { Color } from 'tns-core-modules/color';
import { colorProperty } from 'tns-core-modules/ui/page';

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
        const result = MDCFloatingButton.new();
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
}
