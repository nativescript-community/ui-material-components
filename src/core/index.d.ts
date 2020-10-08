import { Color } from '@nativescript/core';

export interface TypographyOptions {
    fontFamily?: string;
    fontSize?: number;
}

export class Themer {
    // appColorScheme: MDCSemanticColorScheme;
    getOrcreateAppColorScheme();
    getAppColorScheme();
    setPrimaryColor(value: string | Color);
    getPrimaryColor(): string | Color;
    getSecondaryColor(): string | Color;
    setSecondaryColor(value: string | Color);
    setAccentColor(value: string | Color);
    getAccentColor(): string | Color;
    setPrimaryColorVariant(value: string | Color);
    getPrimaryColorVariant(): string | Color;
    setSurfaceColor(value: string | Color);
    getSurfaceColor(): string | Color;
    setOnSurfaceColor(value: string | Color);
    getOnSurfaceColor(): string | Color;
}

export let themer: Themer;

export { applyMixins } from './index.common';
export * from './cssproperties';

export function install();
export function installMixins();
export function getRippleColor(color: string | Color): any;


type Constructor<T = {}> = new (...args: any[]) => T;
export function mixin<T1 extends Constructor, T2 extends Constructor>(mix1: T1, mix2: T2): (new (...args: any[]) => InstanceType<T1> & InstanceType<T2>) & T1 & T2;
