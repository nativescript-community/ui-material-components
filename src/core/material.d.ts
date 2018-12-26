import { Color } from 'tns-core-modules/color/color';

export interface TypographyOptions {
    fontFamily?: string;
    fontSize?: number;
}

export class Themer {
    // appColorScheme: MDCSemanticColorScheme;
    getOrcreateAppColorScheme();
    getAppColorScheme();
    setPrimaryColor(value: string);
    setPrimaryColorVariant(value: string);
}

export var themer: Themer;

export function install();
export function applyMixins(derivedCtor: any, baseCtors: any[]);
export function getRippleColor(color: string | Color): any;
