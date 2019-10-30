import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular/nativescript.module';
import { ExamplesModule } from './examples/examples.module';
import { HomeModule } from './home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule, HomeModule, ExamplesModule],
    declarations: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
