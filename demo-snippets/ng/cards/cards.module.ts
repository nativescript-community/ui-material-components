import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialCardViewModule } from '@nativescript-community/ui-material-cardview/angular';
import { CardsComponent } from './cards.component';

@NgModule({
    declarations: [CardsComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialCardViewModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CardsModule {}
