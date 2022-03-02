import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialTabsModule } from '@nativescript-community/ui-material-tabs/angular';
import { TabsComponent } from './tabs.component';

@NgModule({
    declarations: [TabsComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialTabsModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TabsModule {}
