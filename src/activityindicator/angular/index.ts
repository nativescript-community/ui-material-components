import { NgModule } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';

@NgModule()
export class NativeScriptMaterialActivityIndicatorModule {}

registerElement('MDActivityIndicator', () => require('../activityindicator').ActivityIndicator);
