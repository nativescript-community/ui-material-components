import { TextField as NTextField } from 'tns-core-modules/ui/text-field/text-field';
import { Color } from 'tns-core-modules/color/color';
import { CSSType } from 'tns-core-modules/ui/page/page';


@CSSType('MDCTextField')
export abstract class TextField extends NTextField {
    constructor() {
        super();
    }
    abstract blur();

    set helperText(value: string) {
        this.style['helperText'] = value;
    }
    set maxLength(value: number) {
        this.style['maxLength'] = value;
    }
    set errorColor(color: Color) {
        this.style['errorColor'] = color;
    }
    set floating(value: boolean) {
        this.style['floating'] = value;
    }
    set placeholderColor(color: Color) {
        this.style['placeholderColor'] = color;
    }
}