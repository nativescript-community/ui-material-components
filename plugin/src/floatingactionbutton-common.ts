import { View, Property, CssProperty, Style, paddingBottomProperty, paddingLeftProperty, paddingRightProperty, paddingTopProperty, Length } from 'tns-core-modules/ui/core/view';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { isDataURI, isFileOrResourcePath, RESOURCE_PREFIX } from 'tns-core-modules/utils/utils';
import { ImageSource, fromAsset, fromNativeSource, fromUrl } from 'tns-core-modules/image-source';

// export const srcCompatProperty = new Property<FloatingActionButtonBase, string>({
    // name: 'srcCompat'
// });
// export const fabSizeProperty = new Property<FloatingActionButtonBase, string>({
//     name: 'fabSize'
// });
// export const fabCustomSizeProperty = new Property<FloatingActionButtonBase, number>({
//     name: 'fabCustomSize',
//     valueConverter: v => parseFloat(v)
// });

export const imageSourceProperty = new Property<FloatingActionButtonBase, ImageSource>({ name: "imageSource" });


export const srcProperty = new Property<FloatingActionButtonBase, any>({ name: "src" });

export abstract class FloatingActionButtonBase extends View {
    constructor() {
        super();
        console.log('create FloatingActionButton common');
        this.style.width = this.style.height = 56;
        this.style.margin = 5;
    }
    public srcCompat: string;
    public fabSize: string;
    public fabCustomSize: number;
    public imageSource: ImageSource;
    public src: string | ImageSource;
    public isLoading: boolean;

    /**
     * @internal //copied from image common
     */
    protected _createImageSourceFromSrc(value: string | ImageSource | ImageAsset): void {
        console.log('_createImageSourceFromSrc', value);
        const originalValue = value;
        if (typeof value === 'string' || value instanceof String) {
            value = value.trim();
            this.imageSource = null;
            this['_url'] = value;

            this.isLoading = true;

            const source = new ImageSource();
            const imageLoaded = () => {
                let currentValue = this.src;
                if (currentValue !== originalValue) {
                    return;
                }
                this.imageSource = source;
                this.isLoading = false;
            };

            if (isDataURI(value)) {
                const base64Data = value.split(',')[1];
                if (base64Data !== undefined) {
                    // if (sync) {
                        source.loadFromBase64(base64Data);
                        imageLoaded();
                    // } else {
                    //     source.fromBase64(base64Data).then(imageLoaded);
                    // }
                }
            } else if (isFileOrResourcePath(value)) {
                if (value.indexOf(RESOURCE_PREFIX) === 0) {
                    const resPath = value.substr(RESOURCE_PREFIX.length);
                    // if (sync) {
                        source.loadFromResource(resPath);
                        imageLoaded();
                    // } else {
                    //     this.imageSource = null;
                    //     source.fromResource(resPath).then(imageLoaded);
                    // }
                } else {
                    if (sync) {
                        source.loadFromFile(value);
                        imageLoaded();
                    } else {
                        this.imageSource = null;
                        source.fromFile(value).then(imageLoaded);
                    }
                }
            } else {
                this.imageSource = null;
                fromUrl(value).then(r => {
                    if (this['_url'] === value) {
                        this.imageSource = r;
                        this.isLoading = false;
                    }
                });
            }
        } else if (value instanceof ImageSource) {
            // Support binding the imageSource trough the src property
            this.imageSource = value;
            this.isLoading = false;
        } else if (value instanceof ImageAsset) {
            fromAsset(value).then(result => {
                this.imageSource = result;
                this.isLoading = false;
            });
        } else {
            this.imageSource = fromNativeSource(value);
            this.isLoading = false;
        }
    }
}
// fabSizeProperty.register(FloatingActionButtonBase);
// fabCustomSizeProperty.register(FloatingActionButtonBase);
// srcCompatProperty.register(FloatingActionButtonBase);
imageSourceProperty.register(FloatingActionButtonBase);
srcProperty.register(FloatingActionButtonBase);

export const elevationProperty = new CssProperty<Style, number>({
    name: 'elevation',
    cssName: 'elevation',
    valueConverter: parseFloat
});
elevationProperty.register(Style);
export const fabSizeProperty = new CssProperty<Style, string>({
    name: 'size',
    cssName: 'size'
});
fabSizeProperty.register(Style);