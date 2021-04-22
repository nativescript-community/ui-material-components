/**
 * Material Core component
 * @module @nativescript-community/ui-material-core
 */

import { Color, CoreTypes, PercentLength } from '@nativescript/core';

declare module '@nativescript/core/ui/core/view' {
    interface View {
        _getRootFragmentManager(): androidx.fragment.app.FragmentManager;
        clearFocus(): void;
        requestFocus(): void;
    }
}

export interface TypographyOptions {
    fontFamily?: string;
    fontSize?: number;
}

import { CornerFamily } from './index.common';
export { CornerFamily };
export interface ShapeProperties {
    cornerSize?: number | CoreTypes.LengthPercentUnit;
    cornerSizeTopRight?: number | CoreTypes.LengthPercentUnit;
    cornerSizeBottomLeft?: number | CoreTypes.LengthPercentUnit;
    cornerSizeTopLeft?: number | CoreTypes.LengthPercentUnit;
    cornerSizeBottomRight?: number | CoreTypes.LengthPercentUnit;
    cornerFamily?: CornerFamily;
    cornerFamilyTopLeft?: CornerFamily;
    cornerFamilyTopRight?: CornerFamily;
    cornerFamilyBottomRight?: CornerFamily;
    cornerFamilyBottomLeft?: CornerFamily;
}

export class Themer {
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
    setOnPrimaryColor(value: string | Color);
    getOnPrimaryColor(): string | Color;
    createShape(key: string, options: ShapeProperties);
    getShape(key: string): any;
}

export let themer: Themer;

export { applyMixins } from './index.common';
export * from './cssproperties';

export function install();
export function installMixins();
export function getRippleColor(color: string | Color): any;

type Constructor<T = {}> = new (...args: any[]) => T;
export function mixin<T1 extends Constructor, T2 extends Constructor>(mix1: T1, mix2: T2): (new (...args: any[]) => InstanceType<T1> & InstanceType<T2>) & T1 & T2;
