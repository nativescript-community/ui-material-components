import { NgModule } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';

import { DIRECTIVES } from './nativescript-bottom-navigation-bar.directives';

@NgModule({
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES],
})
export class NativeScriptBottomNavigationBarModule {}

registerElement(
  'BottomNavigationBar',
  () => require('../').BottomNavigationBar,
);
registerElement(
  'BottomNavigationTab',
  () => require('../').BottomNavigationTab,
);
