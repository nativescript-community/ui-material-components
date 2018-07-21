import { imageSourceProperty, srcProperty, FloatingActionButtonBase, elevationProperty } from './floatingactionbutton-common';
import { ImageSource } from 'tns-core-modules/image-source/image-source';

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: MDCFloatingButton;

    public _setNativeImage(nativeImage: UIImage) {
        // this.nativeViewProtected.setImageForState(nativeImage ? nativeImage.imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate) : nativeImage, UIControlState.Normal);
        this.nativeViewProtected.setImageForState(nativeImage, UIControlState.Normal);
    }
    public createNativeView() {
        let result = MDCFloatingButton.new();
        return result;
    }
    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setElevationForState(value * 2, UIControlState.Highlighted);
    }
    [imageSourceProperty.setNative](value: ImageSource) {
        this._setNativeImage(value ? value.ios : null);
    }

    [srcProperty.setNative](value: any) {
        this._createImageSourceFromSrc(value);
    }
}
