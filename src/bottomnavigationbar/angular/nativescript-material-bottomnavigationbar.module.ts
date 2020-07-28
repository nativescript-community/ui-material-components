import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { BottomNavigationBar, BottomNavigationTab } from '../bottomnavigationbar';
import { DIRECTIVES } from './nativescript-material-bottomnavigationbar.directives';

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES]
})
export class NativeScriptMaterialBottomNavigationBarModule {}

registerElement('BottomNavigationBar', () => BottomNavigationBar);
registerElement('BottomNavigationTab', () => BottomNavigationTab);
