import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { BottomNavigationBar, BottomNavigationTab } from '@nativescript-community/ui-material-bottomnavigationbar';
import { DIRECTIVES } from './directives';
export { BottomNavigationBarDirective , BottomNavigationTabDirective} from './directives';

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES],
})
export class NativeScriptMaterialBottomNavigationBarModule {}

registerElement('BottomNavigationBar', () => BottomNavigationBar);
registerElement('BottomNavigationTab', () => BottomNavigationTab);
