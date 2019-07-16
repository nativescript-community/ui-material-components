import { NgModule } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";

import { DIRECTIVES } from "./nativescript-bottom-navigation.directives";

@NgModule(
  {
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES],
  }
)
export class NativescriptBottomNavigationModule {}

registerElement("BottomNavigation", () => require("../").BottomNavigation);
registerElement("BottomNavigationTab", () => require("../").BottomNavigationTab);
