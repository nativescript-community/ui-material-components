import { Background, Button, Color, ControlStateChangeListener, GestureTypes, TouchAction, TouchGestureEventData, Utils, View, backgroundInternalProperty } from '@nativescript/core';
import { TypographyOptions } from '.';
import { applyMixins } from './index.common';
import { cssProperty, dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from './cssproperties';
export * from './cssproperties';
export { applyMixins };

export class Themer {
    appColorScheme: MDCSemanticColorScheme;
    appTypoScheme: MDCTypographyScheme;
    primaryColor: string | Color;
    secondaryColor: string | Color;
    accentColor: string | Color;
    primaryColorVariant: string | Color;
    surfaceColor: string | Color;
    onSurfaceColor: string | Color;
    constructor() {
        // create a default one to prevent multiple creations on widget side
        this.appColorScheme = MDCSemanticColorScheme.alloc().init().initWithDefaults(MDCColorSchemeDefaults.Material201804);
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
        const color = value instanceof Color ? value : new Color(value);
        colorTheme.primaryColor = color.ios;
        this.appColorScheme.primaryColorVariant = this.appColorScheme.primaryColor.colorWithAlphaComponent(0.24);
        // colorTheme.primaryColorVariant = new Color(61.2, color.r, color.g, color.b).ios; // default alpha is 0.24
    }
    getPrimaryColor(): string | Color {
        return this.primaryColor;
    }
    setSecondaryColor(value: string | Color) {
        this.secondaryColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        const color = value instanceof Color ? value : new Color(value);
        colorTheme.secondaryColor = color.ios;
    }
    getSecondaryColor(): string | Color {
        return this.secondaryColor;
    }

    setAccentColor(value: string | Color) {
        this.accentColor = value;
    }
    getAccentColor(): string | Color {
        return this.accentColor;
    }

    setSurfaceColor(value: string | Color) {
        this.surfaceColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        const color = value instanceof Color ? value : new Color(value);
        colorTheme.surfaceColor = color.ios;
        colorTheme.onSurfaceColor = color.ios;
    }
    getSurfaceColor(): string | Color {
        return this.surfaceColor;
    }
    setOnSurfaceColor(value: string | Color) {
        this.onSurfaceColor = value;
        const colorTheme = this.getOrcreateAppColorScheme();
        const color = value instanceof Color ? value : new Color(value);
        colorTheme.onSurfaceColor = color.ios;
    }
    getOnSurfaceColor(): string | Color {
        return this.onSurfaceColor;
    }
    setPrimaryColorVariant(value: string | Color) {
        this.primaryColorVariant = value;
        const color = value instanceof Color ? value : new Color(value);
        this.getOrcreateAppColorScheme().primaryColorVariant = color.ios;
    }
    getPrimaryColorVariant(): string | Color {
        return this.primaryColorVariant;
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
}

export const themer = new Themer();

export function install() {

}

export function getRippleColor(color: string | Color): UIColor {
    if (color) {
        const temp = typeof color === 'string' ? new Color(color) : color;
        // return UIColor.colorWithRedGreenBlueAlpha(temp.r / 255, temp.g / 255, temp.b, temp.a !== 255 ? temp.a / 255 : 0.14);
        return new Color(temp.a !== 255 ? temp.a : 61.5, temp.r, temp.g, temp.b).ios; // default alpha is 0.24
    }
    return null;
}

class ViewWithElevationAndRipple extends View {
    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
    @cssProperty rippleColor: Color;
    inkTouchController: MDCRippleTouchController;
    shadowLayer: MDCShadowLayer;

    nativeViewProtected: UIView;

    getOrCreateRippleController() {
        if (!this.inkTouchController) {
            // create the shadow Layer
            this.inkTouchController = MDCRippleTouchController.alloc().initWithView(this.nativeViewProtected);
            // this.inkTouchController.addInkView();
            // const colorScheme = themer.getAppColorScheme();
            // MDCInkColorThemer.applyColorSchemeToInkView(colorScheme, this.inkTouchController.defaultInkView);
            if (this.style.backgroundInternal) {
                this.inkTouchController.rippleView.layer.cornerRadius = Utils.layout.toDeviceIndependentPixels(this.style.backgroundInternal.borderTopLeftRadius);
            }
        }
        return this.inkTouchController;
    }
    getOrCreateShadowLayer() {
        if (!this.shadowLayer) {
            this._shadowElevations = this._shadowElevations || {};

            // create the shadow Layer
            const layer = (this.shadowLayer = MDCShadowLayer.alloc().init());
            layer.shouldRasterize = true;
            layer.rasterizationScale = UIScreen.mainScreen.scale;
            layer.frame = this.nativeViewProtected.layer.bounds;
            this.nativeViewProtected.layer.addSublayer(this.shadowLayer);
            // we need to set clipToBounds to false. For now it overrides user choice.
            this['clipToBounds'] = false;
            this.nativeViewProtected.clipsToBounds = false;
            if (this.style.backgroundInternal) {
                layer.cornerRadius = Utils.layout.toDeviceIndependentPixels(this.style.backgroundInternal.borderTopLeftRadius);
            }
            if (this.nativeViewProtected instanceof UIControl) {
                this.startElevationStateChangeHandler();
            }
        }
        return this.shadowLayer;
    }
    _onSizeChanged(): void {
        if (this.nativeViewProtected && this.shadowLayer) {
            this.shadowLayer.frame = this.nativeViewProtected.layer.bounds;
        }
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
                this.off(GestureTypes.touch, this._elevationStateChangedHandler);
            }
        }
    }
    updateShadowElevation(state: string) {
        if (this.shadowLayer) {
            const elevation = this._shadowElevations[state];
            this.shadowLayer.elevation = elevation;
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        this.getOrCreateRippleController();
        this.inkTouchController.rippleView.rippleColor = getRippleColor(color);
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
                this.on(GestureTypes.touch, this._elevationStateChangedHandler);
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

    [backgroundInternalProperty.setNative](value: Background) {
        // base impl will be called before
        // if (this.shadowLayer) {
        //     this.shadowLayer.cornerRadius = Utils.layout.toDeviceIndependentPixels(value.borderTopLeftRadius);
        // }
        if (this.inkTouchController) {
            this.inkTouchController.rippleView.layer.cornerRadius = Utils.layout.toDeviceIndependentPixels(value.borderTopLeftRadius);
        }
    }
}

export function overrideViewBase() {
    const NSView = require('@nativescript/core').View;
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
