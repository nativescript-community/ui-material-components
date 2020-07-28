import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Progress } from '../progress';

@Directive({ selector: 'MDProgress' })
export class MaterialProgressDirective {}

@NgModule({
    declarations: [MaterialProgressDirective],
    exports: [MaterialProgressDirective]
})
export class NativeScriptMaterialProgressModule {}

registerElement('MDProgress', () => Progress);
