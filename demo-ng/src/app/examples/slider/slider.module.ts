import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptMaterialSliderModule } from 'nativescript-material-slider/angular';
import { SliderComponent } from './slider.component';

@NgModule({
    declarations: [SliderComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialSliderModule]
})
export class SliderModule {}
