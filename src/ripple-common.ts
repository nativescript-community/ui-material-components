import { CSSType } from 'tns-core-modules/ui/core/view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';

@CSSType('MDCRipple')
export abstract class RippleBase extends StackLayout {
    set rippleColor(color: string) {
        this.style['rippleColor'] = color;
    }
}
