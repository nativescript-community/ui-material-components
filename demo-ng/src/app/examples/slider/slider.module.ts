import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialSliderModule } from '@nativescript-community/ui-material-slider/angular';
import { SliderComponent } from './slider.component';

@NgModule({
    declarations: [SliderComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialSliderModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SliderModule {}
