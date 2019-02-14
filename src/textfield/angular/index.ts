import { NgModule } from '@angular/core';
import { TextValueAccessor } from './textvalue-accessor';
export const FORMS_DIRECTIVES = [TextValueAccessor];

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { registerElement } from 'nativescript-angular/element-registry';

registerElement('MDTextField', () => require('../textfield').TextField);

@NgModule({
    imports: [],
    declarations: [...FORMS_DIRECTIVES],
    exports: [...FORMS_DIRECTIVES],
    providers: []
})
export class MaterialTextfieldModule {}
