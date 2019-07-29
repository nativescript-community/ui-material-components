import { Color } from 'tns-core-modules/color';
import { TypographyOptions } from './core';
import { View } from 'tns-core-modules/ui/core/view/view';
import { layout } from 'tns-core-modules/utils/utils';

import { cssProperty, dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from './cssproperties';
import { Background } from 'tns-core-modules/ui/styling/background';
import { ControlStateChangeListener } from 'tns-core-modules/ui/core/control-state-change';
import { backgroundInternalProperty } from 'tns-core-modules/ui/styling/style-properties';
import { applyMixins } from './core.common';
import { GestureTypes, TouchAction, TouchGestureEventData } from 'tns-core-modules/ui/gestures';
export { applyMixins };

export class Themer {
    appColorScheme: MDCSemanticColorScheme;
    appTypoScheme: MDCTypographyScheme;
    primaryColor: string | Color;
    accentColor: string | Color;
    primaryColorVariant: string | Color;
    surfaceColor: string | Color;
    onSurfaceColor: string | Color;
    constructor() {
        // create a default one to prevent multiple creations on widget side
        this.appColorScheme = MDCSemanticColorScheme.new();
        this.appColorScheme.primaryColorVariant = this.appColorScheme.primaryColor.colorWithAlphaComponent(0.24);
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
        colorTheme.primaryColorVariant = new Color(61.2, color.r, color.g, color.b).ios; // default alpha is 0.24
    }
    getPrimaryColor(): string | Color {
        return this.primaryColor;
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
    // try {
    //     require('nativescript-material-bottomsheet').install();
    // } catch (e) {
    //     console.log('error installing bottom-sheet', e);
    // }
}

export function getRippleColor(color: string | Color): UIColor {
    if (color) {
        const temp = typeof color === 'string' ? new Color(color) : color;
        // return UIColor.colorWithRedGreenBlueAlpha(temp.r / 255, temp.g / 255, temp.b, temp.a !== 255 ? temp.a / 255 : 0.14);
        return new Color(temp.a !== 255 ? temp.a : 36, temp.r, temp.g, temp.b).ios; // default alpha is 0.14
    }
    return null;
}

class ViewWithElevationAndRipple extends View {
    @cssProperty elevation: number;
    @cssProperty elevationHighlighted: number;
    @cssProperty rippleColor: Color;
    inkTouchController: MDCInkTouchController;
    shadowLayer: MDCShadowLayer;

    getOrCreateRippleController() {
        if (!this.inkTouchController) {
            // create the shadow Layer
            this.inkTouchController = MDCInkTouchController.alloc().initWithView(this.nativeViewProtected);
            this.inkTouchController.addInkView();
            const colorScheme = themer.getAppColorScheme();
            MDCInkColorThemer.applyColorSchemeToInkView(colorScheme, this.inkTouchController.defaultInkView);
            if (this.style.backgroundInternal) {
                this.inkTouchController.defaultInkView.layer.cornerRadius = layout.toDeviceIndependentPixels(this.style.backgroundInternal.borderTopLeftRadius);
            }
        }
        return this.inkTouchController;
    }
    getOrCreateShadowLayer() {
        if (!this.shadowLayer) {
            this._shadowElevations = this._shadowElevations || {};

            // create the shadow Layer
            const layer = (this.shadowLayer = MDCShadowLayer.layer());
            layer.frame = (this.nativeViewProtected as UIView).layer.bounds;
            // layer.shouldRasterize = true;
            // layer.rasterizationScale = screen.mainScreen.scale;
            (this.nativeViewProtected as UIView).layer.addSublayer(this.shadowLayer);
            if (this.style.backgroundInternal) {
                layer.cornerRadius = layout.toDeviceIndependentPixels(this.style.backgroundInternal.borderTopLeftRadius);
            }
            if (this.nativeViewProtected instanceof UIControl) {
                this.startElevationStateChangeHandler();
            }
        }
        return this.shadowLayer;
    }
    _onSizeChanged(): void {
        if (this.nativeViewProtected && this.shadowLayer) {
            this.shadowLayer.frame = (this.nativeViewProtected as UIView).layer.bounds;
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
        this.inkTouchController.defaultInkView.inkColor = getRippleColor(color);
    }

    [elevationProperty.setNative](value: number) {
        this.getOrCreateShadowLayer();
        this._shadowElevations['normal'] = value;
        this.shadowLayer.elevation = value;
        this.nativeViewProtected.clipsToBounds = false;
        if (this.elevationHighlighted === undefined) {
            this._shadowElevations['highlighted'] = value * 2;
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
                this.on(GestureTypes.touch, this._elevationStateChangedHandler);
            }
        }
    }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        this.getOrCreateShadowLayer();
        this.startElevationStateChangeHandler();
        this._shadowElevations['highlighted'] = value;
        // this.updateShadowElevation(s);
        // this.nativeViewProtected.setShadowElevationForState(value, UIControlState.Highlighted);
    }

    [backgroundInternalProperty.setNative](value: Background) {
        // base impl will be called before
        if (this.shadowLayer) {
            this.shadowLayer.cornerRadius = layout.toDeviceIndependentPixels(value.borderTopLeftRadius);
        }
        if (this.inkTouchController) {
            this.inkTouchController.defaultInkView.layer.cornerRadius = layout.toDeviceIndependentPixels(value.borderTopLeftRadius);
        }
    }
}

export function overrideViewBase() {
    const NSView = require('tns-core-modules/ui/core/view').View;
    applyMixins(NSView, [ViewWithElevationAndRipple]);
}

export function installMixins() {
    overrideViewBase();
}
