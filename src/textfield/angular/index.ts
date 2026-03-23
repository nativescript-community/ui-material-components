import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { TextField } from '@nativescript-community/ui-material-textfield';
import { TextValueAccessor } from './textvalue-accessor';
export { TextValueAccessor };
export const FORMS_DIRECTIVES = [TextValueAccessor];

@NgModule({
    imports: FORMS_DIRECTIVES,
    exports: FORMS_DIRECTIVES
})
export class NativeScriptMaterialTextFieldModule {}

registerElement('MDTextField', () => TextField);
