import { NgModule } from '@angular/core';
import { ButtonsModule } from '~/app/examples/buttons/buttons.module';
import { CardsModule } from '~/app/examples/cards/cards.module';
import { ExamplesRoutingModule } from '~/app/examples/examples.routing';

@NgModule({
    imports: [ExamplesRoutingModule, ButtonsModule, CardsModule]
})
export class ExamplesModule {}
