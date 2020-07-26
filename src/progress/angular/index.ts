import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import { Directive } from '@angular/core';

@Directive({ selector: 'MDProgress' })
export class MaterialProgressDirective {}

@NgModule({
    declarations: [MaterialProgressDirective],
    exports: [MaterialProgressDirective]
})
export class NativeScriptMaterialProgressModule {}

registerElement('MDProgress', () => require('../progress').Progress);
