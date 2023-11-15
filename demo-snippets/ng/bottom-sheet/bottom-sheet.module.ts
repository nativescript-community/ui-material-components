import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialBottomSheetModule } from '@nativescript-community/ui-material-bottomsheet/angular';

import { LoginOptionsComponent } from './login-options.component';
import { BottomSheetComponent } from './bottom-sheet.component';

@NgModule({
    declarations: [BottomSheetComponent, LoginOptionsComponent],
    // entryComponents: [LoginOptionsComponent],
    // Recommendation: The NativeScriptMaterialBottomSheetModule should be imported in your app.module
    // Right now the Module doesn't work well with HMR
    // so if you are having troubles enable the legacy workflow in your nsconfig.json
    imports: [NativeScriptCommonModule, NativeScriptMaterialBottomSheetModule.forRoot()],
    schemas: [NO_ERRORS_SCHEMA]
})
export class BottomSheetModule {}
