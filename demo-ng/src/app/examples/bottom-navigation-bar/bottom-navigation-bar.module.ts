import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptMaterialBottomNavigationBarModule } from 'nativescript-material-bottomnavigationbar/angular';

import { BottomNavigationBarComponent } from './bottom-navigation-bar.component';
import { FirstTabComponent } from './first-tab/first-tab.component';
import { ThirdTabComponent } from './third-tab/third-tab.component';

@NgModule({
    imports: [
        NativeScriptCommonModule, //
        NativeScriptMaterialBottomNavigationBarModule
    ],
    declarations: [
        BottomNavigationBarComponent, //
        FirstTabComponent,
        ThirdTabComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class BottomNavigationBarModule {}
