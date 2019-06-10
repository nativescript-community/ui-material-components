import { NgModule } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';

@NgModule()
export class NativeScriptMaterialSliderModule {}

registerElement('MDSlider', () => require('../slider').Slider);
