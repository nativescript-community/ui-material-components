import { ModuleWithProviders, NgModule } from '@angular/core';

import { BottomSheetService } from './bottomsheet.service';

import { install } from '../bottomsheet';

@NgModule()
export class NativeScriptMaterialBottomSheetModule {
    static forRoot(): ModuleWithProviders {
        install();
        return {
            ngModule: NativeScriptMaterialBottomSheetModule,
            providers: [BottomSheetService]
        };
    }
}
