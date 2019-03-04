import { Color } from 'tns-core-modules/color/color';
import { TypographyOptions } from './material';

// export * from './material.common';
import { applyMixins } from './material.common';
export { applyMixins };

export class Themer {
    appColorScheme: MDCSemanticColorScheme;
    appTypoScheme: MDCTypographyScheme;
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
    setPrimaryColor(value: string) {
        const colorTheme = this.getOrcreateAppColorScheme();
        const color = new Color(value);
        colorTheme.primaryColor = color.ios;
        colorTheme.primaryColorVariant = new Color(61.2, color.r, color.g, color.b).ios; // default alpha is 0.24
    }
    setPrimaryColorVariant(value: string) {
        this.getOrcreateAppColorScheme().primaryColorVariant = new Color(value).ios;
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
    try {
        require('nativescript-material-bottomsheet').install();
    } catch (e) {
        console.log('error installing bottomsheet', e);
    }
}

export function getRippleColor(color: string | Color): UIColor {
    if (color) {
        const temp = typeof color === 'string' ? new Color(color) : color;
        return new Color(temp.a !== 255 ? temp.a : 36, temp.r, temp.g, temp.b).ios; // default alpha is 0.14
    }
    return null;
}
