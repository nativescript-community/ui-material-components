import { ButtonBase } from './button-common';



declare module 'tns-core-modules/ui/styling/style-properties' {
    export const androidElevationProperty;
    export const androidDynamicElevationOffsetProperty;
}

export class Button extends ButtonBase {}
