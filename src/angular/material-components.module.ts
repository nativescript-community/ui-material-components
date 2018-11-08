import { NgModule } from '@angular/core';

import { AppBarComponent, appBarMeta } from './app-bar';
import { AppBarDirective } from './appbar.directive';

import { TextValueAccessor } from './textvalue-accessor';
export const FORMS_DIRECTIVES = [TextValueAccessor];

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { registerElement } from 'nativescript-angular/element-registry';

registerElement('FloatingActionButton', () => require('../floatingactionbutton'));
registerElement('MaterialButton', () => require('../button'));
registerElement('MaterialTextField', () => require('../textfield'));
registerElement('MaterialCard', () => require('../card'));
registerElement('AppBar', () => require('../appbar'), appBarMeta);

@NgModule({
    imports: [],
    declarations: [AppBarComponent, AppBarDirective, ...FORMS_DIRECTIVES],
    exports: [AppBarComponent, AppBarDirective, ...FORMS_DIRECTIVES],
    providers: []
})
export class MaterialComponentsModule {}
