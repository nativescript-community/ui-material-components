import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular/common';
import { NativeScriptMaterialCardViewModule } from 'nativescript-material-cardview/angular';
import { CardsComponent } from './cards.component';

@NgModule({
    declarations: [CardsComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialCardViewModule]
})
export class CardsModule {}
