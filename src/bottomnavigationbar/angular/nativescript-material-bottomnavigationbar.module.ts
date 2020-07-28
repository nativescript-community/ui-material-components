import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import { DIRECTIVES } from './nativescript-material-bottomnavigationbar.directives';
import { BottomNavigationBar, BottomNavigationTab } from 'nativescript-material-bottomnavigationbar';

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES]
})
export class NativeScriptMaterialBottomNavigationBarModule {}

registerElement('BottomNavigationBar', () => BottomNavigationBar);
registerElement('BottomNavigationTab', () => BottomNavigationTab);
