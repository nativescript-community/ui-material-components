import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule, COMPONENTS } from './app.routing';
import { AppComponent } from './app.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { registerElement } from 'nativescript-angular/element-registry';
import { Button } from 'nativescript-material-button';
import { TextField } from 'nativescript-material-textfield';
import { Slider } from 'nativescript-material-slider';
import { CardView } from 'nativescript-material-cardview';
import { FloatingActionButton } from 'nativescript-material-floatingactionbutton';
import { Progress } from 'nativescript-material-progress';
import { Ripple } from 'nativescript-material-ripple';
import { ActivityIndicator } from 'nativescript-material-activityindicator';
registerElement('MDActivityIndicator', () => ActivityIndicator);
registerElement('MDRipple', () => Ripple);
registerElement('MDProgress', () => Progress);
registerElement('MDFloatingActionButton', () => FloatingActionButton);
registerElement('MDSlider', () => Slider);
registerElement('MDButton', () => Button);
registerElement('MDTextField', () => TextField);
registerElement('MDCardView', () => CardView);

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule, NativeScriptFormsModule],
    declarations: [AppComponent, ...COMPONENTS],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
