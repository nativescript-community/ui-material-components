import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular/element-registry';

@NgModule()
export class NativeScriptMaterialFloatingButtonModule {}

registerElement('MDFloatingActionButton', () => require('../floatingactionbutton').FloatingActionButton);
