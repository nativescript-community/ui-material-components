import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { TextField } from '../textfield';
import { TextValueAccessor } from './textvalue-accessor';

export const FORMS_DIRECTIVES = [TextValueAccessor];

@NgModule({
    declarations: FORMS_DIRECTIVES,
    exports: FORMS_DIRECTIVES
})
export class NativeScriptMaterialTextFieldModule {}

registerElement('MDTextField', () => TextField);
