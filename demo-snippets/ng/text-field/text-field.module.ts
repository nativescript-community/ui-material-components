import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptMaterialTextFieldModule } from '@nativescript-community/ui-material-textfield/angular';
import { TextFieldComponent } from './text-field.component';

@NgModule({
    declarations: [TextFieldComponent],
    imports: [NativeScriptCommonModule, NativeScriptMaterialTextFieldModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TextFieldModule {}
