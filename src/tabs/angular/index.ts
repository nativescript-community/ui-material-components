import { Directive, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { Tabs } from '@nativescript-community/ui-material-tabs';


@Directive({ selector: 'MDTabs' })
export class MaterialTabsDirective {}

@NgModule({
    declarations: [MaterialTabsDirective],
    exports: [MaterialTabsDirective]
})
export class NativeScriptMaterialTabsModule {}

registerElement('MDTabs', () => Tabs);
