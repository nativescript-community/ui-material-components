import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { FloatingActionButton } from '../floatingactionbutton';

@NgModule()
export class NativeScriptMaterialFloatingButtonModule {}

registerElement('MDFloatingActionButton', () => FloatingActionButton);
