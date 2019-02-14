import { NgModule } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';

@NgModule()
export class NativeScriptMaterialCardViewModule {}

registerElement('MDButton', () => require('../button').Button);
