import { NgModule } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';

import { Directive } from '@angular/core';

@Directive({ selector: 'MDButton' })
export class MaterialButtonDirective {}

@NgModule({
    declarations: [MaterialButtonDirective],
    exports: [MaterialButtonDirective]
})
export class NativeScriptMaterialButtonModule {}

registerElement('MDButton', () => require('../button').Button);
