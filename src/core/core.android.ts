import { Color } from 'tns-core-modules/color';
import { applyMixins } from './core.common';
export { applyMixins };

// stub class as we don't use this on android
export class Themer {
    primaryColor: string | Color;
    accentColor: string | Color;
    primaryColorVariant: string | Color;
    surfaceColor: string | Color;
    onSurfaceColor: string | Color;
    // appColorScheme: MDCSemanticColorScheme;
    getOrcreateAppColorScheme() {
        // if (!this.appColorScheme) {
        // this.appColorScheme = MDCSemanticColorScheme.alloc().init();
        // }
        // return this.appColorScheme;
    }
    getAppColorScheme() {
        // return this.appColorScheme;
    }
    setPrimaryColor(value: string | Color) {
        this.primaryColor = value;
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
    }
    getSurfaceColor(): string | Color {
        return this.surfaceColor;
    }
    setOnSurfaceColor(value: string | Color) {
        this.onSurfaceColor = value;
    }
    getOnSurfaceColor(): string | Color {
        return this.onSurfaceColor;
    }
    setPrimaryColorVariant(value: string | Color) {
        this.primaryColorVariant = value;
    }
    getPrimaryColorVariant(): string | Color {
        return this.primaryColorVariant;
    }
}

export const themer = new Themer();

export function install() {
    // try {
    //     require('nativescript-material-bottomsheet').install();
    // } catch (e) {
    //     console.log('error installing bottomsheet', e);
    // }
}

export function getRippleColor(color: string | Color) {
    if (color) {
        const temp = typeof color === 'string' ? new Color(color) : color;
        // return android.graphics.Color.argb(temp.a !== 255 ? temp.a / 255 : 0.14, temp.r / 255, temp.g / 255, temp.b); // default alpha is 0.14
        return new Color(temp.a !== 255 ? temp.a : 36, temp.r, temp.g, temp.b).android; // default alpha is 0.14
    }
    return null;
}

export function installMixins() {}
