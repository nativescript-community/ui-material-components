import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Ripple } from '@nativescript-community/ui-material-ripple';

@Directive({ selector: 'MDRipple' })
export class MaterialRippleDirective {}

@NgModule({
    imports: [MaterialRippleDirective],
    exports: [MaterialRippleDirective],
})
export class NativeScriptMaterialRippleModule {}

registerElement('MDRipple', () => Ripple);
