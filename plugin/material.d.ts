//needed because components typings use native types
/// <reference path="./typings/mdc.android.d.ts" />
/// <reference path="./typings/mdc.ios.d.ts" />


// import { Button } from './button';
// import { FloatingActionButton } from './floatingactionbutton';
// import { TextField } from './textfield';
// import { CardView } from './cardview';
// import { AppBar } from './appbar';
// import { Ripple } from './ripple';


// export { Button, FloatingActionButton, TextField, CardView, AppBar, Ripple}

// declare module "nativescript-material-components" {
//     export {Button, FloatingActionButton, TextField, CardView, AppBar}
// }


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