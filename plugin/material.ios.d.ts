import { TypographyOptions } from './material';
export declare class Themer {
    appColorScheme: MDCSemanticColorScheme;
    appTypoScheme: MDCTypographyScheme;
    constructor();
    getOrcreateAppColorScheme(): MDCSemanticColorScheme;
    getAppColorScheme(): MDCSemanticColorScheme;
    setPrimaryColor(value: string): void;
    setPrimaryColorVariant(value: string): void;
    getOrcreateAppTypographyScheme(): MDCTypographyScheme;
    getAppTypographyScheme(): MDCTypographyScheme;
    setButtonTypography(args: TypographyOptions): void;
}
export declare const themer: Themer;
export declare function overridePage(): void;
export declare function overrideBottomSheet(): void;
export declare function install(): void;
