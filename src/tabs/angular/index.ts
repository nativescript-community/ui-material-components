import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import { Directive } from '@angular/core';

@Directive({ selector: 'MDTabs' })
export class MaterialTabsDirective {}

@NgModule({
    declarations: [MaterialTabsDirective],
    exports: [MaterialTabsDirective]
})
export class NativeScriptMaterialTabsModule {}

registerElement('MDTabs', () => require('../tabs').Tabs);
