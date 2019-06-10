import { NgModule } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';

@NgModule()
export class NativeScriptMaterialRippleModule {}

registerElement('MDRipple', () => require('../ripple').Ripple);
