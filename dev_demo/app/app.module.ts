import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";

import { FloatingActionButton, Button, TextField, CardView, AppBar } from "./nativescript-material-components/material";
import { MaterialComponentsModule } from "./material-components-angular/material-components.module";


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
import { registerElement } from "nativescript-angular/element-registry";
import { appBarMeta } from "~/material-components-angular/app-bar";

registerElement("FloatingActionButton", () => FloatingActionButton);
registerElement("MaterialButton", () => Button);
registerElement("MaterialTextField", () => TextField);
registerElement("MaterialCard", () => CardView);
registerElement("AppBar", () => AppBar, appBarMeta);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        MaterialComponentsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
