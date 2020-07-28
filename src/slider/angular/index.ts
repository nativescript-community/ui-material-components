import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Slider } from '../slider';

@Directive({ selector: 'MDSlider' })
export class MaterialSliderDirective {}

@NgModule({
    declarations: [MaterialSliderDirective],
    exports: [MaterialSliderDirective]
})
export class NativeScriptMaterialSliderModule {}

registerElement('MDSlider', () => Slider);
