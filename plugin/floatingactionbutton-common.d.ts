import { Property, View } from 'tns-core-modules/ui/core/view';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { ImageSource } from 'tns-core-modules/image-source';
export declare const imageSourceProperty: Property<FloatingActionButtonBase, ImageSource>;
export declare const srcProperty: Property<FloatingActionButtonBase, any>;
export declare abstract class FloatingActionButtonBase extends View {
    constructor();
    elevation: number;
    srcCompat: string;
    fabSize: string;
    fabCustomSize: number;
    imageSource: ImageSource;
    src: string | ImageSource;
    isLoading: boolean;
    protected _createImageSourceFromSrc(value: string | ImageSource | ImageAsset): void;
}
