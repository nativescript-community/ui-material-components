import { Color } from 'tns-core-modules/color/color';

// export * from './material.common';

export class Themer {
    appColorScheme: MDCSemanticColorScheme;
    getOrcreateAppColorScheme() {
        if (!this.appColorScheme) {
            this.appColorScheme = MDCSemanticColorScheme.alloc().init();
        }
        return this.appColorScheme;
    }
    getAppColorScheme() {
        return this.appColorScheme;
    }
    setPrimaryColor(value: string) {
        this.getOrcreateAppColorScheme().primaryColor = new Color(value).ios;
    }
    setPrimaryColorVariant(value: string) {
        this.getOrcreateAppColorScheme().primaryColorVariant = new Color(value).ios;
    }
}

export const themer = new Themer();
