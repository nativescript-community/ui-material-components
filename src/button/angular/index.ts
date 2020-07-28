import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Button } from '@nativescript-community/ui-material-button';

@Directive({ selector: 'MDButton' })
export class MaterialButtonDirective {}

@NgModule({
    declarations: [MaterialButtonDirective],
    exports: [MaterialButtonDirective]
})
export class NativeScriptMaterialButtonModule {}

registerElement('MDButton', () => Button);
