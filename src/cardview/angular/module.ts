import { NgModule } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';

import { DIRECTIVES } from './directives';

@NgModule({
    declarations: [
        DIRECTIVES
    ],
    exports: [
        DIRECTIVES
    ],
})
export class NativeScriptMaterialCardViewModule { }

registerElement('CardView', () => require('../card').CardView);