import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

@NgModule()
export class NativeScriptMaterialFloatingButtonModule {}

registerElement('MDFloatingActionButton', () => require('../floatingactionbutton').FloatingActionButton);
