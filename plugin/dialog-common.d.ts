import { Property, Color } from "tns-core-modules/ui/core/view";
import { Button } from "tns-core-modules/ui/button/button";
import { Page } from "tns-core-modules/ui/page/page";
declare module "tns-core-modules/ui/dialogs" {
    function isDialogOptions(arg: any): boolean;
    function getTextFieldColor(): Color;
    function getLabelColor(): Color;
    function getButtonColors(): {
        color: Color;
        backgroundColor: Color;
    };
    function getCurrentPage(): Page;
    const STRING: string;
    const PROMPT: string;
    const CONFIRM: string;
    const ALERT: string;
    const LOGIN: string;
    const OK: string;
    const CANCEL: string;
}
export declare abstract class ButtonBase extends Button {
    variant: string;
    elevation: number;
    rippleColor: Color | string;
    constructor();
}
export declare const variantProperty: Property<ButtonBase, string>;
