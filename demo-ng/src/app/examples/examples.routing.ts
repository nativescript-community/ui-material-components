import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { RippleComponent } from './ripple/ripple.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { SliderComponent } from './slider/slider.component';
import { ProgressComponent } from './progress/progress.component';
import { ActivityIndicatorComponent } from './activity-indicator/activity-indicator.component';
// import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
    {
        path: 'buttons',
        component: ButtonsComponent
    },
    {
        path: 'card-view',
        component: CardsComponent
    },
    {
        path: 'bottom-sheet',
        component: BottomSheetComponent
    },
    {
        path: 'ripple',
        component: RippleComponent
    },
    {
        path: 'text-field',
        component: TextFieldComponent
    },
    {
        path: 'slider',
        component: SliderComponent
    },
    {
        path: 'progress',
        component: ProgressComponent
    },
    {
        path: 'activity-indicator',
        component: ActivityIndicatorComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ExamplesRoutingModule {}
