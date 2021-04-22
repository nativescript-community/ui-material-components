import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorProperty, shapeProperty, themer } from '@nativescript-community/ui-material-core';
import {
    Background,
    Color,
    Font,
    ImageSource,
    Screen,
    Utils,
    backgroundInternalProperty,
    borderBottomLeftRadiusProperty,
    borderBottomRightRadiusProperty,
    borderTopLeftRadiusProperty,
    borderTopRightRadiusProperty,
    colorProperty,
    fontInternalProperty,
    CoreTypes,
} from '@nativescript/core';
import { textTransformProperty } from '@nativescript/core/ui/text-base';
import { ButtonBase, imageSourceProperty, srcProperty } from './button-common';

let buttonScheme: MDCContainerScheme;
function getButtonScheme() {
    if (!buttonScheme) {
        buttonScheme = MDCContainerScheme.new();
    }
    return buttonScheme;
}
declare class IObserverClass extends NSObject {
    static new(): IObserverClass;
    static alloc(): IObserverClass;
    _owner: WeakRef<Button>;
}

@NativeClass
class MDButtonObserverClass extends NSObject {
    _owner: WeakRef<Button>;
    public static initWithOwner(owner: Button) {
        const delegate = MDButtonObserverClass.new() as MDButtonObserverClass;
        delegate._owner = new WeakRef(owner);

        return delegate;
    }

    observeValueForKeyPathOfObjectChangeContext(path: string, tv: UITextView) {
        if (path === 'contentSize') {
            const owner = this._owner && this._owner.get();
            if (owner) {
                const inset = owner.nativeViewProtected.titleEdgeInsets;
                const top = Utils.layout.toDeviceIndependentPixels(owner.effectivePaddingTop + owner.effectiveBorderTopWidth);

                switch (owner.verticalTextAlignment) {
                    case 'initial': // not supported
                    case 'top':
                        owner.nativeViewProtected.titleEdgeInsets = {
                            top,
                            left: inset.left,
                            bottom: inset.bottom,
                            right: inset.right
                        };
                        break;

                    case 'middle': {
                        const height = tv.sizeThatFits(CGSizeMake(tv.bounds.size.width, 10000)).height;
                        let topCorrect = (tv.bounds.size.height - height * tv.zoomScale) / 2.0;
                        topCorrect = topCorrect < 0.0 ? 0.0 : topCorrect;
                        // tv.contentOffset = CGPointMake(0, -topCorrect);
                        owner.nativeViewProtected.titleEdgeInsets = {
                            top: top + topCorrect,
                            left: inset.left,
                            bottom: inset.bottom,
                            right: inset.right
                        };
                        break;
                    }

                    case 'bottom': {
                        const height = tv.sizeThatFits(CGSizeMake(tv.bounds.size.width, 10000)).height;
                        let bottomCorrect = tv.bounds.size.height - height * tv.zoomScale;
                        bottomCorrect = bottomCorrect < 0.0 ? 0.0 : bottomCorrect;
                        // tv.contentOffset = CGPointMake(0, -bottomCorrect);
                        owner.nativeViewProtected.titleEdgeInsets = {
                            top: top + bottomCorrect,
                            left: inset.left,
                            bottom: inset.bottom,
                            right: inset.right
                        };
                        break;
                    }
                }
            }
        }
    }
}
export class Button extends ButtonBase {
    private _observer: IObserverClass;
    nativeViewProtected: MDCButton;
    _ios: MDCButton;

    getDefaultElevation(): number {
        return 2;
    }

    getDefaultDynamicElevationOffset() {
        return 6;
    }

    applyShapeScheme() {
        MDCButtonShapeThemer.applyShapeSchemeToButton(this.shapeScheme, this.nativeViewProtected);
    }
    [borderBottomLeftRadiusProperty.setNative](value) {
        this.setBottomLeftCornerRadius(value);
        this.applyShapeScheme();
    }
    [borderBottomRightRadiusProperty.setNative](value) {
        this.setBottomRightCornerRadius(value);
        this.applyShapeScheme();
    }
    [borderTopLeftRadiusProperty.setNative](value) {
        this.setTopLeftCornerRadius(value);
        this.applyShapeScheme();
    }
    [borderTopRightRadiusProperty.setNative](value) {
        this.setTopRightCornerRadius(value);
        this.applyShapeScheme();
    }
    shapeScheme: MDCShapeScheme;
    private getShapeScheme() {
        if (!this.shapeScheme) {
            if (this.shape) {
                // we need to copy it as if we change border radius on this view
                // it will change for everyone else
                this.shapeScheme = MDCShapeScheme.new();
                const shapeScheme = themer.getShape(this.shape);
                this.shapeScheme.smallComponentShape = shapeScheme.smallComponentShape.copy();
            } else {
                this.shapeScheme = MDCShapeScheme.new();
                const shapeCategory = MDCShapeCategory.new();
                this.shapeScheme.smallComponentShape = shapeCategory;
            }
        }
        return this.shapeScheme;
    }

    private setBottomLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.bottomLeftCorner;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.smallComponentShape.bottomLeftCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.smallComponentShape.bottomLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setBottomRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.bottomRightCorner;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.smallComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.smallComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setTopLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.topLeftCorner;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.smallComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.smallComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setTopRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.topRightCorner;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.smallComponentShape.topRightCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.smallComponentShape.topRightCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }

    public createNativeView() {
        const view = MDCButton.new();
        view.imageView.contentMode = UIViewContentMode.ScaleAspectFit;

        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
        const scheme = MDCContainerScheme.new();
        scheme.colorScheme = colorScheme;
        if (this.variant === 'text') {
            // fixes a bug where N would set default UILabel system color
            // if no color in style which would break theming
            this.style['css:color'] = themer.getPrimaryColor() as Color;
            view.applyTextThemeWithScheme(scheme);
        } else if (this.variant === 'flat') {
            if (colorScheme) {
                MDCButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
        } else if (this.variant === 'outline') {
            view.applyOutlinedThemeWithScheme(scheme);
        } else {
            // contained
            view.applyContainedThemeWithScheme(scheme);
            // we need to set the default through css or user would not be able to overload it through css...
            this.style['css:margin-left'] = 10;
            this.style['css:margin-right'] = 10;
            this.style['css:margin-top'] = 12;
            this.style['css:margin-bottom'] = 12;
        }

        return view;
    }
    initNativeView() {
        super.initNativeView();
        this._observer = MDButtonObserverClass.initWithOwner(this);
        this.nativeViewProtected.addObserverForKeyPathOptionsContext(this._observer, 'contentSize', NSKeyValueObservingOptions.New, null);
    }
    disposeNativeView() {
        super.disposeNativeView();
        if (this._observer) {
            this.nativeViewProtected.removeObserverForKeyPath(this._observer, 'contentSize');
            this._observer = null;
        }
    }

    [textTransformProperty.setNative](value: CoreTypes.TextTransformType) {
        this.nativeViewProtected.uppercaseTitle = value !== 'none';
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkColor = getRippleColor(color);
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

    [backgroundInternalProperty.setNative](value: Background) {
        if (this.nativeViewProtected) {
            const scale = Screen.mainScreen.scale;
            // this.nativeViewProtected.backgroundColor = value.color ? value.color.ios : null;
            if (value.color) {
                this.nativeViewProtected.setBackgroundColorForState(value.color ? value.color.ios : null, UIControlState.Normal);
                if (this.variant === 'outline') {
                    this.nativeViewProtected.setBackgroundColorForState(new Color('transparent').ios, UIControlState.Disabled);
                }
            }

            this.nativeViewProtected.setBorderWidthForState(value.borderLeftWidth / scale, UIControlState.Normal);
            this.nativeViewProtected.setBorderColorForState(value.borderTopColor ? value.borderTopColor.ios : null, UIControlState.Normal);
            this.nativeViewProtected.layer.cornerRadius = value.borderTopLeftRadius / scale;
        }
    }

    _setNativeClipToBounds() {
        // const backgroundInternal = this.style.backgroundInternal;
        // this.nativeViewProtected.clipsToBounds =
        //     this.nativeViewProtected instanceof UIScrollView ||
        //     backgroundInternal.hasBorderWidth() ||
        //     backgroundInternal.hasBorderRadius();
    }

    [fontInternalProperty.setNative](value: Font | UIFont) {
        if (!(value instanceof Font) || !this.formattedText) {
            const nativeView = this.nativeViewProtected;
            const font = value instanceof Font ? value.getUIFont(nativeView.font) : value;
            nativeView.setTitleFontForState(font, UIControlState.Normal);
        }
    }
    public _setNativeImage(nativeImage: UIImage) {
        this.nativeViewProtected.setImageForState(nativeImage ? nativeImage.imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate) : nativeImage, UIControlState.Normal);
    }
    [imageSourceProperty.setNative](value: ImageSource) {
        this._setNativeImage(value ? value.ios : null);
    }

    [srcProperty.setNative](value: any) {
        this._createImageSourceFromSrc(value);
    }
    [colorProperty.setNative](value) {
        const color = value instanceof Color ? value.ios : value;
        super[colorProperty.setNative](value);
        this.nativeViewProtected.setImageTintColorForState(color, UIControlState.Normal);
    }
    [shapeProperty.setNative](shape: string) {
        // TODO: for now we cant change after set
        // this.shapeScheme = null;
        this.getShapeScheme();
        this.applyShapeScheme();
    }
}
