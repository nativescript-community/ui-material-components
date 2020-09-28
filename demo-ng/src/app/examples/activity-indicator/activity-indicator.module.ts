import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialActivityIndicatorModule } from '@nativescript-community/ui-material-activityindicator/angular';
import { ActivityIndicatorComponent } from './activity-indicator.component';

@NgModule({
    declarations: [ActivityIndicatorComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialActivityIndicatorModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ActivityIndicatorModule {}
