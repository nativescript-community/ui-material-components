import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        NativeScriptCommonModule, //
        NativeScriptRouterModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {}
