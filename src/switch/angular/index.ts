import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Switch } from '@nativescript-community/ui-material-switch';

@Directive({ selector: 'MDSwitch' })
export class MaterialSwitchDirective {}

@NgModule({
    declarations: [MaterialSwitchDirective],
    exports: [MaterialSwitchDirective]
})
export class NativeScriptMaterialSwitchModule {}

registerElement('MDSwitch', () => ProSwitchgress);
