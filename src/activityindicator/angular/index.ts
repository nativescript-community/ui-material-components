import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular/element-registry';

import { Directive } from '@angular/core';

@Directive({ selector: 'MDActivityIndicator' })
export class MaterialActivityIndicatorDirective {}

@NgModule({
    declarations: [MaterialActivityIndicatorDirective],
    exports: [MaterialActivityIndicatorDirective]
})
export class NativeScriptMaterialActivityIndicatorModule {}

registerElement('MDActivityIndicator', () => require('../activityindicator').ActivityIndicator);
