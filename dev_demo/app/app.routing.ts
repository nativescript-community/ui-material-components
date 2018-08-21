import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ButtonsComponent } from "./buttons/buttons.component";
import { TextfieldsComponent } from "./textfields/textfields.component";
export const COMPONENTS = [ButtonsComponent, TextfieldsComponent];

const routes: Routes = [
    { path: "", redirectTo: "/(btnTab:buttons//tfTab:textfields)", pathMatch: "full" },

    {
        path: "buttons", component: ButtonsComponent, outlet: "btnTab"
    },
    {
        path: "textfields", component: TextfieldsComponent, outlet: "tfTab"
    }
       
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }