import { Button, CSSType, Color, ImageAsset, ImageSource, Property, Utils } from '@nativescript/core';
import { cssProperty } from '@nativescript-community/ui-material-core';
import { VerticalTextAlignment } from '@nativescript-community/text';

@CSSType('MDButton')
export abstract class ButtonBase extends Button {
    public variant: string = 'contained';
    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
    @cssProperty rippleColor: Color;
    @cssProperty verticalTextAlignment: VerticalTextAlignment;
    @cssProperty shape: string;

    public imageSource: ImageSource;
    public src: string | ImageSource;
    public isLoading: boolean;
    /**
     * @internal //copied from image common
     */
    protected async _createImageSourceFromSrc(value: string | ImageSource | ImageAsset) {
        const originalValue = value;
        if (typeof value === 'string' || value instanceof String) {
            value = value.trim();
            this.imageSource = null;
            this['_url'] = value;

            this.isLoading = true;

            let source: ImageSource;
            const imageLoaded = () => {
                const currentValue = this.src;
                if (currentValue !== originalValue) {
                    return;
                }
                this.imageSource = source;
                this.isLoading = false;
            };

            if (Utils.isDataURI(value)) {
                const base64Data = value.split(',')[1];
                if (base64Data !== undefined) {
                    source = await ImageSource.fromBase64(base64Data);
                    imageLoaded();
                }
            } else if (Utils.isFileOrResourcePath(value)) {
                if (value.indexOf(Utils.RESOURCE_PREFIX) === 0) {
                    const resPath = value.substr(Utils.RESOURCE_PREFIX.length);
                    source = await ImageSource.fromResource(resPath);
                    imageLoaded();
                } else {
                    source = await ImageSource.fromFile(value);
                    imageLoaded();
                }
            } else {
                this.imageSource = null;
                source = await ImageSource.fromUrl(value);
                imageLoaded();
            }
        } else if (value instanceof ImageSource) {
            // Support binding the imageSource trough the src property
            this.imageSource = value;
            this.isLoading = false;
        } else if (value instanceof ImageAsset) {
            ImageSource.fromAsset(value).then((result) => {
                this.imageSource = result;
                this.isLoading = false;
            });
        } else {
            // native source
            this.imageSource = new ImageSource(value);
            this.isLoading = false;
        }
    }
}

export const variantProperty = new Property<ButtonBase, string>({
    name: 'variant'
});
variantProperty.register(ButtonBase);
export const imageSourceProperty = new Property<ButtonBase, ImageSource>({ name: 'imageSource' });

export const srcProperty = new Property<ButtonBase, any>({
    name: 'src'
});
imageSourceProperty.register(ButtonBase);
srcProperty.register(ButtonBase);
