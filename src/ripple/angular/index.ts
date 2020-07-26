import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

@Directive({ selector: 'MDRipple' })
export class MaterialRippleDirective {}

@NgModule({
    declarations: [MaterialRippleDirective],
    exports: [MaterialRippleDirective]
})
export class NativeScriptMaterialRippleModule {}

registerElement('MDRipple', () => require('../ripple').Ripple);
