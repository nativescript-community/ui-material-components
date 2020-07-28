import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Ripple } from 'nativescript-material-ripple';

@Directive({ selector: 'MDRipple' })
export class MaterialRippleDirective {}

@NgModule({
    declarations: [MaterialRippleDirective],
    exports: [MaterialRippleDirective]
})
export class NativeScriptMaterialRippleModule {}

registerElement('MDRipple', () => Ripple);
