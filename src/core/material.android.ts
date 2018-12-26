// export * from './material.common';
import { Color } from 'tns-core-modules/color/color';

// stub class as we don't use this on android
export class Themer {
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
    setPrimaryColor(value: string) {
        // this.getOrcreateAppColorScheme().primaryColor = new Color(value).ios;
    }
    setPrimaryColorVariant(value: string) {
        // this.getOrcreateAppColorScheme().primaryColorVariant = new Color(value).ios;
    }
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            console.log('overrinding', name);
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
export const themer = new Themer();

export function install() {
    try {
        require('nativescript-material-bottomsheet').install();
    } catch (e) {
        // console.log('error installing bottomsheet', e);
    }
}

export function getRippleColor(color: string | Color) {
    if (color) {
        const temp = typeof color === 'string' ? new Color(color) : color;
        return new Color(36, temp.r, temp.g, temp.b).android; // default alpha is 0.14
    }
    return null;
}
