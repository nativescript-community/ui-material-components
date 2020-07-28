import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import { Directive } from '@angular/core';
import { CardView } from 'nativescript-material-cardview';

@Directive({ selector: 'MDCardView' })
export class MaterialCardViewDirective {}

@NgModule({
    declarations: [MaterialCardViewDirective],
    exports: [MaterialCardViewDirective]
})
export class NativeScriptMaterialCardViewModule {}

registerElement('MDCardView', () => CardView);
