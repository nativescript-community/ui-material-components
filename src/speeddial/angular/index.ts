import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { SpeedDial, SpeedDialItem } from '@nativescript-community/ui-material-speeddial';

@NgModule()
export class NativeScriptSpeedDialModule {}

registerElement('MDSpeedDial', () => SpeedDial);
registerElement('MDSpeedDialItem', () => SpeedDialItem);
