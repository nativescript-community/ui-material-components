import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { SegmentedBar, SegmentedBarItem } from '@nativescript-community/ui-material-segmentedbar';
import { DIRECTIVES } from './directives';
export { SegmentedBarItemDirective, SegmentedBarDirective } from './directives';

@NgModule({
    imports: [DIRECTIVES],
    exports: [DIRECTIVES]
})
export class NativeScriptMaterialSegmentedBarModule {}

registerElement('SegmentedBar', () => SegmentedBar);
registerElement('SegmentedBarItem', () => SegmentedBarItem);
