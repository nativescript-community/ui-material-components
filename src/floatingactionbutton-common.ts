import { CSSType, Property, View } from "tns-core-modules/ui/core/view"
import { ImageAsset } from "tns-core-modules/image-asset/image-asset"
import {
    isDataURI,
    isFileOrResourcePath,
    RESOURCE_PREFIX
} from "tns-core-modules/utils/utils"
import {
    fromAsset,
    fromNativeSource,
    fromUrl,
    ImageSource
} from "tns-core-modules/image-source"
import { cssProperty } from "./cssproperties"

export const imageSourceProperty = new Property<
    FloatingActionButtonBase,
    ImageSource
>({ name: "imageSource" })

export const srcProperty = new Property<FloatingActionButtonBase, any>({
    name: "src"
})

@CSSType("MDCFloatingActionButton")
export abstract class FloatingActionButtonBase extends View {
    constructor() {
        super()
        // console.log('create FloatingActionButton common');
        this.style.width = this.style.height = 56
        this.style.margin = 5
    }
    @cssProperty elevation: number

    public srcCompat: string
    public fabSize: string
    public fabCustomSize: number
    public imageSource: ImageSource
    public src: string | ImageSource
    public isLoading: boolean

    /**
     * @internal //copied from image common
     */
    protected _createImageSourceFromSrc(
        value: string | ImageSource | ImageAsset
    ): void {
        const originalValue = value
        if (typeof value === "string" || value instanceof String) {
            value = value.trim()
            this.imageSource = null
            this["_url"] = value

            this.isLoading = true

            const source = new ImageSource()
            const imageLoaded = () => {
                const currentValue = this.src
                if (currentValue !== originalValue) {
                    return
                }
                this.imageSource = source
                this.isLoading = false
            }

            if (isDataURI(value)) {
                const base64Data = value.split(",")[1]
                if (base64Data !== undefined) {
                    // if (sync) {
                    source.loadFromBase64(base64Data)
                    imageLoaded()
                    // } else {
                    //     source.fromBase64(base64Data).then(imageLoaded);
                    // }
                }
            } else if (isFileOrResourcePath(value)) {
                if (value.indexOf(RESOURCE_PREFIX) === 0) {
                    const resPath = value.substr(RESOURCE_PREFIX.length)
                    // if (sync) {
                    source.loadFromResource(resPath)
                    imageLoaded()
                    // } else {
                    //     this.imageSource = null;
                    //     source.fromResource(resPath).then(imageLoaded);
                    // }
                } else {
                    if (sync) {
                        source.loadFromFile(value)
                        imageLoaded()
                    } else {
                        this.imageSource = null
                        source.fromFile(value).then(imageLoaded)
                    }
                }
            } else {
                this.imageSource = null
                fromUrl(value).then(r => {
                    if (this["_url"] === value) {
                        this.imageSource = r
                        this.isLoading = false
                    }
                })
            }
        } else if (value instanceof ImageSource) {
            // Support binding the imageSource trough the src property
            this.imageSource = value
            this.isLoading = false
        } else if (value instanceof ImageAsset) {
            fromAsset(value).then(result => {
                this.imageSource = result
                this.isLoading = false
            })
        } else {
            this.imageSource = fromNativeSource(value)
            this.isLoading = false
        }
    }
}
imageSourceProperty.register(FloatingActionButtonBase)
srcProperty.register(FloatingActionButtonBase)
