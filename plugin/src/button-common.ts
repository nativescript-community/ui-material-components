import { Property, Length, CSSType } from 'tns-core-modules/ui/core/view';
import { Button } from 'tns-core-modules/ui/button/button';

@CSSType('MDCButton')
export abstract class ButtonBase extends Button {
    public variant: string;
    protected _defaultPadding = 5;
    constructor() {
        super();
        this.style.margin = 5;
    }
    set elevation(value: number) {
        this.style['elevation'] = value;
    }
    set rippleColor(color: string) {
        this.style['rippleColor'] = color;
    }

    protected _borderRadius: number;
    get borderRadius(): string | Length {
        return this._borderRadius;
    }
}

export const variantProperty = new Property<ButtonBase, string>({
    name: 'variant'
});
variantProperty.register(ButtonBase);
