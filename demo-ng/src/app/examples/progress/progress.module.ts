import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptMaterialProgressModule } from 'nativescript-material-progress/angular';
import { ProgressComponent } from './progress.component';

@NgModule({
    declarations: [ProgressComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialProgressModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ProgressModule {}
