
import { NgModule } from '@angular/core';

import { AppBarComponent } from './app-bar';
import { AppBarDirective } from './appbar.directive';

import {
  TextValueAccessor
} from "./textvalue-accessor";
export const FORMS_DIRECTIVES = [
  TextValueAccessor
];
import { FloatingActionButton, Button, TextField, CardView, AppBar } from "../material";


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
import { registerElement } from "nativescript-angular/element-registry";
import { appBarMeta } from "./app-bar";

registerElement("FloatingActionButton", () => FloatingActionButton);
registerElement("MaterialButton", () => Button);
registerElement("MaterialTextField", () => TextField);
registerElement("MaterialCard", () => CardView);
registerElement("AppBar", () => AppBar, appBarMeta);

@NgModule({
  imports: [],
  declarations: [
    AppBarComponent,
    AppBarDirective,
    ...FORMS_DIRECTIVES
  ],
  exports: [
    AppBarComponent,
    AppBarDirective,
    ...FORMS_DIRECTIVES
  ],
  providers: [],
})
export class MaterialComponentsModule { }