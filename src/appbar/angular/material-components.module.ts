import { NgModule } from '@angular/core';

import { AppBarComponent, appBarMeta } from './app-bar';
import { AppBarDirective } from './appbar.directive';
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { registerElement } from '@nativescript/angular/element-registry';
registerElement('AppBar', () => require('../appbar').AppBar, appBarMeta);

@NgModule({
    imports: [],
    declarations: [AppBarComponent, AppBarDirective],
    exports: [AppBarComponent, AppBarDirective],
    providers: []
})
export class MaterialComponentsModule {}
