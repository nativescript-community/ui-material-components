import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { BottomNavigationBar, BottomNavigationTab } from '@nativescript-community/ui-material-bottomnavigationbar';
import { DIRECTIVES } from './nativescript-material-bottomnavigationbar.directives';
export { BottomNavigationBarDirective , BottomNavigationTabDirective} from './nativescript-material-bottomnavigationbar.directives';

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES],
})
export class NativeScriptMaterialBottomNavigationBarModule {}

registerElement('BottomNavigationBar', () => BottomNavigationBar);
registerElement('BottomNavigationTab', () => BottomNavigationTab);
