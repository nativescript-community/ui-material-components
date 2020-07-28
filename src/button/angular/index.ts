import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import { Directive } from '@angular/core';
import { Button } from 'nativescript-material-button';

@Directive({ selector: 'MDButton' })
export class MaterialButtonDirective {}

@NgModule({
    declarations: [MaterialButtonDirective],
    exports: [MaterialButtonDirective]
})
export class NativeScriptMaterialButtonModule {}

registerElement('MDButton', () => Button);
