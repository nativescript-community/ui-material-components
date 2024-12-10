import {
    Background,
    Button,
    Color,
    ControlStateChangeListener,
    CoreTypes,
    GestureTypes,
    PercentLength,
    TouchAction,
    TouchGestureEventData,
    Utils,
    View,
    backgroundInternalProperty
} from '@nativescript/core';
import { ShapeProperties, TypographyOptions } from '.';
import { CornerFamily, applyMixins } from './index.common';
import { cssProperty, dynamicElevationOffsetProperty, elevationProperty, rippleColorAlphaProperty, rippleColorProperty } from './cssproperties';
export * from './cssproperties';
export { applyMixins };

function createCornerFamily(cornerFamily: CornerFamily): MDCShapeCornerFamily {
    switch (cornerFamily) {
        case CornerFamily.CUT:
            return MDCShapeCornerFamily.Cut;
        default:
        case CornerFamily.ROUNDED:
            return MDCShapeCornerFamily.Rounded;
    }
}
function cornerTreatment(cornerFamily: CornerFamily, cornerSize: number | CoreTypes.LengthPercentUnit | CoreTypes.LengthPxUnit | CoreTypes.LengthDipUnit) {
    let corner: MDCCornerTreatment;
    if (typeof cornerSize === 'object') {
        if (cornerFamily === CornerFamily.CUT) {
            if (cornerSize.unit === '%') {
                corner = MDCCornerTreatment.cornerWithCutValueType(cornerSize.value, 1);
            } else {
                corner = MDCCornerTreatment.cornerWithCutValueType(Utils.layout.toDeviceIndependentPixels(PercentLength.toDevicePixels(cornerSize)), 0);
            }
        } else {
            if (cornerSize.unit === '%') {
                corner = MDCCornerTreatment.cornerWithRadiusValueType(cornerSize.value, 1);
            } else {
                corner = MDCCornerTreatment.cornerWithRadiusValueType(Utils.layout.toDeviceIndependentPixels(PercentLength.toDevicePixels(cornerSize)), 0);
            }
        }
    } else {
        if (cornerFamily === CornerFamily.ROUNDED) {
            corner = MDCCornerTreatment.cornerWithRadius(Utils.layout.toDeviceIndependentPixels(PercentLength.toDevicePixels(cornerSize)));
        } else {
            corner = MDCCornerTreatment.cornerWithCut(Utils.layout.toDeviceIndependentPixels(PercentLength.toDevicePixels(cornerSize)));
        }
    }
    return corner;
}

function getIOSColor(value: string | Color) {
    return (value instanceof Color ? value : new Color(value)).ios;
}
export class Themer {
    appColorScheme: MDCSemanticColorScheme;
    appTypoScheme: MDCTypographyScheme;
    primaryColor: string | Color;
    backgroundColor: string | Color;
    onBackgroundColor: string | Color;
    onPrimaryColor: string | Color;
    secondaryColor: string | Color;
    accentColor: string | Color;
    primaryColorVariant: string | Color;
    surfaceColor: string | Color;
    onSurfaceColor: string | Color;
    constructor() {
        // create a default one to prevent multiple creations on widget side
        this.appColorScheme = MDCSemanticColorScheme.alloc().init().initWithDefaults(MDCColorSchemeDefaults.Material201907);
        if (this.appColorScheme.primaryColor) {
            this.appColorScheme.primaryColorVariant = this.appColorScheme.primaryColor.colorWithAlphaComponent(0.24);
        }
    }
    getOrcreateAppColorScheme() {
        if (!this.appColorScheme) {
            this.appColorScheme = MDCSemanticColorScheme.new();
        }
        return this.appColorScheme;
    }
    getAppColorScheme() {
        return this.appColorScheme;
    }
    setPrimaryColor(value: string | Color) {
        this.primaryColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        colorTheme.primaryColor = getIOSColor(value);
        this.appColorScheme.primaryColorVariant = this.appColorScheme.primaryColor.colorWithAlphaComponent(0.24);
    }
    getPrimaryColor(): string | Color {
        return this.primaryColor;
    }

    setOnPrimaryColor(value) {
        this.onPrimaryColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        colorTheme.onPrimaryColor = getIOSColor(value);
    }
    getOnPrimaryColor() {
        return this.onPrimaryColor;
    }
    setSecondaryColor(value: string | Color) {
        this.secondaryColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        colorTheme.secondaryColor = getIOSColor(value);
    }
    getSecondaryColor(): string | Color {
        return this.secondaryColor;
    }

    setAccentColor(value: string | Color) {
        this.setSecondaryColor(value);
    }
    getAccentColor(): string | Color {
        return this.getSecondaryColor();
    }

    setSurfaceColor(value: string | Color) {
        this.surfaceColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        const color = getIOSColor(value);
        colorTheme.surfaceColor = color;
        colorTheme.onSurfaceColor = color;
    }
    getSurfaceColor(): string | Color {
        return this.surfaceColor;
    }
    setOnSurfaceColor(value: string | Color) {
        this.onSurfaceColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        colorTheme.onSurfaceColor = getIOSColor(value);
    }
    getOnSurfaceColor(): string | Color {
        return this.onSurfaceColor;
    }
    setPrimaryColorVariant(value: string | Color) {
        this.primaryColorVariant = value;
        this.getOrcreateAppColorScheme().primaryColorVariant = getIOSColor(value);
    }
    getPrimaryColorVariant(): string | Color {
        return this.primaryColorVariant;
    }

    setBackgroundColor(value: string | Color) {
        this.backgroundColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        colorTheme.backgroundColor = getIOSColor(value);
    }
    getBackgroundColor(): string | Color {
        return this.backgroundColor;
    }
    setOnBackgroundColor(value: string | Color) {
        this.onBackgroundColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        colorTheme.onBackgroundColor = getIOSColor(value);
    }
    getOnBackgroundColor(): string | Color {
        return this.onBackgroundColor;
    }

    getOrcreateAppTypographyScheme() {
        if (!this.appTypoScheme) {
            this.appTypoScheme = MDCTypographyScheme.new();
        }
        return this.appTypoScheme;
    }
    getAppTypographyScheme() {
        return this.appTypoScheme;
    }
    setButtonTypography(args: TypographyOptions) {
        // const typoTheme = this.getOrcreateAppTypographyScheme();
        // let currentFont = typoTheme.button;
        // if (args.fontFamily) {
        //     currentFont = currentFont.withFontFamily(args.fontFamily);
        // }
    }

    _shapes: {
        [k: string]: MDCShapeScheme;
    } = {};
    getShape(key: string) {
        return this._shapes[key] || null;
    }
    createShape(key: string, options: ShapeProperties) {
        const shapeScheme = MDCShapeScheme.new();
        const shapeCategory = MDCShapeCategory.new();

        if (options.cornerFamily && options.cornerSize !== undefined) {
            const corner = cornerTreatment(options.cornerFamily, options.cornerSize);
            shapeCategory.bottomLeftCorner = corner;
            shapeCategory.bottomRightCorner = corner;
            shapeCategory.topLeftCorner = corner;
            shapeCategory.topRightCorner = corner;
        }
        if (options.cornerSizeBottomLeft !== undefined) {
            shapeCategory.bottomLeftCorner = cornerTreatment(options.cornerFamilyBottomLeft || options.cornerFamily, options.cornerSizeBottomLeft);
        }
        if (options.cornerSizeBottomRight !== undefined) {
            shapeCategory.bottomRightCorner = cornerTreatment(options.cornerFamilyBottomRight || options.cornerFamily, options.cornerSizeBottomRight);
        }

        if (options.cornerSizeTopLeft !== undefined) {
            shapeCategory.topLeftCorner = cornerTreatment(options.cornerFamilyTopLeft || options.cornerFamily, options.cornerSizeTopLeft);
        }
        if (options.cornerSizeTopRight !== undefined) {
            shapeCategory.topRightCorner = cornerTreatment(options.cornerFamilyTopRight || options.cornerFamily, options.cornerSizeTopRight);
        }
        shapeScheme.smallComponentShape = shapeCategory;
        shapeScheme.mediumComponentShape = shapeCategory;
        shapeScheme.largeComponentShape = shapeCategory;
        this._shapes[key] = shapeScheme;
    }
}

export const themer = new Themer();

export function install() {}

export function getRippleColor(color: string | Color, alpha = 61.5): UIColor {
    if (color) {
        const temp = color instanceof Color ? color : new Color(color);
        if (temp.a !== 255) {
            return temp.ios;
        }
        // TODO: we cant use setAlpha until it is fixed in Nativescript or ios will be undefined
        return new Color(alpha || 61.5, temp.r, temp.g, temp.b).ios;
    }
    return null;
}

export function overrideViewBase() {
    const NSView = require('@nativescript/core').View;
    class ViewWithElevationAndRipple extends View {
        @cssProperty elevation: number;
        @cssProperty dynamicElevationOffset: number;
        @cssProperty rippleColor: Color;
        @cssProperty rippleColorAlpha: number;
        inkTouchController: MDCRippleTouchController;
        shadowLayer: MDCShadowLayer;
        // shadowView: UIView;

        nativeViewProtected: UIView;

        getOrCreateRippleController() {
            if (!this.inkTouchController) {
                // create the shadow Layer
                this.inkTouchController = MDCRippleTouchController.alloc().initWithView(this.nativeViewProtected);
                // this.inkTouchController.addInkView();
                // const colorScheme = themer.getAppColorScheme();
                // MDCInkColorThemer.applyColorSchemeToInkView(colorScheme, this.inkTouchController.defaultInkView);
                this.inkTouchController.rippleView.usesSuperviewShadowLayerAsMask = true;
                // if (this.style.backgroundInternal) {
                //     this.inkTouchController.rippleView.layer.cornerRadius = Utils.layout.toDeviceIndependentPixels(this.style.backgroundInternal.borderTopLeftRadius);
                // }
            }
            return this.inkTouchController;
        }
        getOrCreateShadowLayer() {
            if (!this.shadowLayer) {
                this._shadowElevations = this._shadowElevations || {};

                // create the shadow Layer
                //@ts-ignore
                // const shadowView = ShadowView.alloc().init();
                // this.shadowView = shadowView;
                // this.shadowView.userInteractionEnabled = false;
                // shadowView.clipsToBounds = false;
                const layer = (this.shadowLayer = MDCShadowLayer.alloc().init());
                // const layer = (this.shadowLayer = shadowView.layer);
                layer.shouldRasterize = true;
                layer.rasterizationScale = UIScreen.mainScreen.scale;
                // shadowView.frame = this.nativeViewProtected.layer.bounds;
                layer.frame = this.nativeViewProtected.layer.bounds;
                // this.nativeViewProtected.addSubview(shadowView);
                this.nativeViewProtected.layer.addSublayer(this.shadowLayer);
                // we need to set clipToBounds to false. For now it overrides user choice.
                this['clipToBounds'] = false;
                this.nativeViewProtected.clipsToBounds = false;
                layer.cornerRadius = this.nativeViewProtected.layer.cornerRadius;
                layer.mask = this.nativeViewProtected.layer.mask;
                // if (this.style.backgroundInternal) {
                //     layer.cornerRadius = Utils.layout.toDeviceIndependentPixels(this.style.backgroundInternal.borderTopLeftRadius);
                // }
                if (this.nativeViewProtected instanceof UIControl) {
                    this.startElevationStateChangeHandler();
                }
            }
            return this.shadowLayer;
        }

        updateLayers() {
            const layer = this.nativeViewProtected?.layer;
            if (layer) {
                const mask = layer.mask;
                if (layer && this.inkTouchController) {
                    this.inkTouchController.rippleView.layer.cornerRadius = layer.cornerRadius;
                    this.inkTouchController.rippleView.layer.mask = layer.mask;
                }
                if (layer && this.shadowLayer) {
                    this.shadowLayer.frame = this.nativeViewProtected.layer.bounds;
                    this.shadowLayer.cornerRadius = layer.cornerRadius;
                    this.shadowLayer.mask = layer.mask;
                }
                layer.mask = mask;
            }
        }
        _onSizeChanged(): void {
            this.updateLayers();
        }
        _setNativeClipToBounds() {
            if (this.shadowLayer) {
                this.nativeViewProtected.clipsToBounds = false;
            }
        }
        _shadowElevations: { [k: string]: number } = {};
        private _elevationStateChangedHandler: any;
        public onUnloaded() {
            if (this._elevationStateChangedHandler) {
                if (this._elevationStateChangedHandler.stop) {
                    this._elevationStateChangedHandler.stop();
                } else {
                    this.off('touch', this._elevationStateChangedHandler);
                }
            }
        }
        updateShadowElevation(state: string) {
            if (this.shadowLayer) {
                const elevation = this._shadowElevations[state];
                this.shadowLayer.elevation = elevation;
            }
        }

        public requestFocus() {
            this.focus();
        }
        public clearFocus() {
            this.nativeViewProtected.resignFirstResponder();
        }
        [rippleColorProperty.setNative](color: Color) {
            this.getOrCreateRippleController();
            this.inkTouchController.rippleView.rippleColor = getRippleColor(color, this.rippleColorAlpha);
        }
        [rippleColorAlphaProperty.setNative](value: number) {
            const rippleColor = this.rippleColor;
            if (rippleColor) {
                this[rippleColorProperty.setNative](rippleColor);
            }
        }

        startElevationStateChangeHandler() {
            if (!this._elevationStateChangedHandler) {
                if (this.nativeViewProtected instanceof UIControl) {
                    this._elevationStateChangedHandler =
                        this._elevationStateChangedHandler ||
                        new ControlStateChangeListener(this.nativeViewProtected, (s: string) => {
                            this.updateShadowElevation(s);
                        });
                    this._elevationStateChangedHandler.start();
                } else {
                    this._elevationStateChangedHandler =
                        this._elevationStateChangedHandler ||
                        ((args: TouchGestureEventData) => {
                            switch (args.action) {
                                case TouchAction.up:
                                    this.updateShadowElevation('normal');
                                    break;
                                case TouchAction.down:
                                    this.updateShadowElevation('highlighted');
                                    break;
                            }
                        });
                    this.on('touch', this._elevationStateChangedHandler);
                }
            }
        }

        getDefaultElevation(): number {
            return this instanceof Button ? 2 : 0;
        }

        getDefaultDynamicElevationOffset() {
            return this instanceof Button ? 6 : 0;
        }
        [elevationProperty.getDefault](): number {
            return this.getDefaultElevation();
        }
        [elevationProperty.setNative](value: number) {
            this.getOrCreateShadowLayer();
            let dynamicElevationOffset = this.dynamicElevationOffset;
            if (typeof dynamicElevationOffset === 'undefined' || dynamicElevationOffset === null) {
                dynamicElevationOffset = this.getDefaultDynamicElevationOffset();
            }
            if (dynamicElevationOffset !== 0) {
                this.startElevationStateChangeHandler();
            }
            this._shadowElevations['normal'] = value;
            this._shadowElevations['highlighted'] = value + dynamicElevationOffset;
            this.shadowLayer.elevation = value;
        }

        [dynamicElevationOffsetProperty.getDefault](): number {
            return this.getDefaultDynamicElevationOffset();
        }
        [dynamicElevationOffsetProperty.setNative](value: number) {
            this.getOrCreateShadowLayer();
            this.startElevationStateChangeHandler();
            let elevation = this.elevation;
            if (typeof elevation === 'undefined' || elevation === null) {
                elevation = this.getDefaultElevation();
            }
            this._shadowElevations['normal'] = elevation;
            this._shadowElevations['highlighted'] = value + elevation;
        }

        [backgroundInternalProperty.setNative](value) {
            const layer = this.nativeViewProtected.layer;
            if (this.inkTouchController) {
                this.inkTouchController.rippleView.layer.cornerRadius = layer.cornerRadius;
                this.inkTouchController.rippleView.layer.mask = layer.mask;
            }
            if (this.shadowLayer) {
                this.shadowLayer.cornerRadius = layer.cornerRadius;
                this.shadowLayer.mask = layer.mask;
            }
        }

        _redrawNativeBackground(value) {
            this.updateLayers();
        }
    }
    // we need mixins to be applied after (run default implementation first) because of _setNativeClipToBounds.
    // it needs to be applied after for shadows to be drawn correctly
    applyMixins(NSView, [ViewWithElevationAndRipple], {
        after: true
    });
}

let mixinInstalled = false;
export function installMixins() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        overrideViewBase();
    }
}
