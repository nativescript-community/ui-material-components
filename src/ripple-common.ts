import { CSSType, Color } from "tns-core-modules/ui/core/view"
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout"
import { cssProperty } from "./cssproperties"

@CSSType("MDCRipple")
export abstract class RippleBase extends StackLayout {
    @cssProperty rippleColor: Color | string
}
