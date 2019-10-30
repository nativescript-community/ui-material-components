import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular/common';
import { NativeScriptMaterialTextFieldModule } from 'nativescript-material-textfield/angular';
import { TextFieldComponent } from './text-field.component';

@NgModule({
    declarations: [TextFieldComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialTextFieldModule]
})
export class TextFieldModule {}
