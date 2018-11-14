import { CSSType, Property, Color } from "tns-core-modules/ui/core/view"
import { Button } from "tns-core-modules/ui/button/button"
import { cssProperty } from "./cssproperties"
import { Page } from "tns-core-modules/ui/page/page"

declare module "tns-core-modules/ui/dialogs" {
    
    function isDialogOptions(arg): boolean
    function getTextFieldColor(): Color
    function getLabelColor(): Color
    function getButtonColors(): { color: Color; backgroundColor: Color }
    function getCurrentPage(): Page
    const STRING: string
    const PROMPT: string
    const CONFIRM: string
    const ALERT: string
    const LOGIN: string
    const OK: string
    const CANCEL: string
}

@CSSType("MDCButton")
export abstract class ButtonBase extends Button {
    public variant: string
    @cssProperty elevation: number
    @cssProperty rippleColor: Color | string

    constructor() {
        super()
        this.style.margin = 5
    }

    // protected _borderRadius: number;
    // get borderRadius(): string | Length {
    //     return this._borderRadius;
    // }
}

export const variantProperty = new Property<ButtonBase, string>({
    name: "variant"
})
variantProperty.register(ButtonBase)
