import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular/element-registry';

import { DIRECTIVES } from './nativescript-material-bottomnavigationbar.directives';

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES]
})
export class NativeScriptMaterialBottomNavigationBarModule {}

registerElement('BottomNavigationBar', () => require('../').BottomNavigationBar);
registerElement('BottomNavigationTab', () => require('../').BottomNavigationTab);
