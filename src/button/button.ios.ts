import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import {
    Background,
    Color,
    Font,
    Screen,
    Utils,
    backgroundInternalProperty,
    borderBottomLeftRadiusProperty,
    borderBottomRightRadiusProperty,
    borderTopLeftRadiusProperty,
    borderTopRightRadiusProperty,
    fontInternalProperty,
} from '@nativescript/core';
import { ButtonBase } from './button-common';

let buttonScheme: MDCButtonScheme;
function getButtonScheme() {
    if (!buttonScheme) {
        buttonScheme = MDCButtonScheme.new();
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
                            right: inset.right,
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
                            right: inset.right,
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
                            right: inset.right,
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

    public createNativeView() {
        const view = MDCButton.new();
        const colorScheme = themer.getAppColorScheme();

        if (this.variant === 'text') {
            MDCTextButtonThemer.applySchemeToButton(getButtonScheme(), view);
            if (colorScheme) {
                MDCTextButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
        } else if (this.variant === 'flat') {
            if (colorScheme) {
                MDCButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
        } else if (this.variant === 'outline') {
            MDCOutlinedButtonThemer.applySchemeToButton(getButtonScheme(), view);
            if (colorScheme) {
                MDCOutlinedButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
        } else {
            // contained
            MDCContainedButtonThemer.applySchemeToButton(getButtonScheme(), view);
            if (colorScheme) {
                MDCContainedButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
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

    shapeScheme: MDCShapeScheme;
    private getShapeScheme() {
        if (!this.shapeScheme) {
            this.shapeScheme = MDCShapeScheme.new();
            const shapeCategory = MDCShapeCategory.new();
            this.shapeScheme.smallComponentShape = shapeCategory;
        }
        return this.shapeScheme;
    }

    private setBottomLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.bottomLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
    }
    private setBottomRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithRadius(value);
    }
    private setTopLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
    }
    private setTopRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.topRightCorner = MDCCornerTreatment.cornerWithRadius(value);
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
}
