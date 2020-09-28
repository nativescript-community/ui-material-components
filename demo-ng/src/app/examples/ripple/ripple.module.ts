import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialRippleModule } from '@nativescript-community/ui-material-ripple/angular';
import { RippleComponent } from './ripple.component';

@NgModule({
    declarations: [RippleComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialRippleModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class RippleModule {}
