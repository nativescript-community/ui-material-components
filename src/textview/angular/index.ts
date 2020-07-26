import { NgModule } from '@angular/core';
import { TextValueAccessor } from './textvalue-accessor';

import { registerElement } from '@nativescript/angular';

export const FORMS_DIRECTIVES = [TextValueAccessor];

@NgModule({
    declarations: FORMS_DIRECTIVES,
    exports: FORMS_DIRECTIVES
})
export class NativeScriptMaterialTextViewModule {}

registerElement('MDTextView', () => require('../textview').TextView);
