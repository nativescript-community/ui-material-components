import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialProgressModule } from '@nativescript-community/ui-material-progress/angular';
import { ProgressComponent } from './progress.component';

@NgModule({
    declarations: [ProgressComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialProgressModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ProgressModule {}
