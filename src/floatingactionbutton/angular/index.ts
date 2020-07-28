import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { FloatingActionButton } from 'nativescript-material-floatingactionbutton';

@NgModule()
export class NativeScriptMaterialFloatingButtonModule {}

registerElement('MDFloatingActionButton', () => FloatingActionButton);
