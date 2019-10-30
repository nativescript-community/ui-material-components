import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular/element-registry';

import { Directive } from '@angular/core';

@Directive({ selector: 'MDSlider' })
export class MaterialSliderDirective {}

@NgModule({
    declarations: [MaterialSliderDirective],
    exports: [MaterialSliderDirective]
})
export class NativeScriptMaterialSliderModule {}

registerElement('MDSlider', () => require('../slider').Slider);
