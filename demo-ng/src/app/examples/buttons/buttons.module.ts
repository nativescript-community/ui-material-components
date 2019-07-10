import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptMaterialButtonModule } from 'nativescript-material-button/angular';
import { ButtonsComponent } from './buttons.component';

@NgModule({
    declarations: [ButtonsComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialButtonModule]
})
export class ButtonsModule {}
