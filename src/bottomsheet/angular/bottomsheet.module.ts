import { ModuleWithProviders, NgModule } from '@angular/core';

import { BottomSheetService } from './bottomsheet.service';
import { install } from '@nativescript-community/ui-material-bottomsheet';

@NgModule()
export class NativeScriptMaterialBottomSheetModule {
    // This flag help us to avoid problems when using the new development workflow
    private static initialized: boolean = false;

    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: NativeScriptMaterialBottomSheetModule,
            providers: [BottomSheetService],
        };
    }

    public constructor() {
        if (!NativeScriptMaterialBottomSheetModule.initialized) {
            install();
            NativeScriptMaterialBottomSheetModule.initialized = true;
        }
    }
}
