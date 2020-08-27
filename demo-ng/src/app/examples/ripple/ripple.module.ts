import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular/common';
import { NativeScriptMaterialRippleModule } from '@nativescript-community/ui-material-ripple/angular';
import { RippleComponent } from './ripple.component';

@NgModule({
    declarations: [RippleComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialRippleModule]
})
export class RippleModule {}
