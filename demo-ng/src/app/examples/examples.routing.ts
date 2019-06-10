import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { CardsComponent } from '~/app/examples/cards/cards.component';

import { ButtonsComponent } from './buttons/buttons.component';

const routes: Routes = [
    {
        path: 'buttons',
        component: ButtonsComponent
    },
    {
        path: 'card-view',
        component: CardsComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ExamplesRoutingModule {}
