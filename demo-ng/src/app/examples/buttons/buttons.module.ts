import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialButtonModule } from '@nativescript-community/ui-material-button/angular';
import { ButtonsComponent } from './buttons.component';

@NgModule({
    declarations: [ButtonsComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialButtonModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ButtonsModule {}
