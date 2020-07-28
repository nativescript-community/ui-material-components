import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { CardView } from '../cardview';

@Directive({ selector: 'MDCardView' })
export class MaterialCardViewDirective {}

@NgModule({
    declarations: [MaterialCardViewDirective],
    exports: [MaterialCardViewDirective]
})
export class NativeScriptMaterialCardViewModule {}

registerElement('MDCardView', () => CardView);
