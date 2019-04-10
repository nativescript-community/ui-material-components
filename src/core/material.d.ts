import { Color } from 'tns-core-modules/color';
import { Length } from 'tns-core-modules/ui/styling/style-properties';

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
export function installMixins();
export function applyMixins(derivedCtor: any, baseCtors: any[]);
export function getRippleColor(color: string | Color): any;


declare module 'tns-core-modules/ui/core/view' {
    interface View {
        elevation: Length
        elevationHighlighted: Length
        rippleColor: string | Color
    }
}