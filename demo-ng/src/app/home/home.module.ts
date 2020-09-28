import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { NativeScriptRouterModule, NativeScriptCommonModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
    schemas : [ NO_ERRORS_SCHEMA ]
})
export class HomeModule {}
