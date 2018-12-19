
export interface TypographyOptions {
    fontFamily?: string
    fontSize?: number
}

export class Themer {
    // appColorScheme: MDCSemanticColorScheme;
    getOrcreateAppColorScheme()
    getAppColorScheme()
    setPrimaryColor(value: string)
    setPrimaryColorVariant(value: string)
}


export var themer: Themer;

export function install()
export function applyMixins(derivedCtor: any, baseCtors: any[])