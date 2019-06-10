import { NgModule } from '@angular/core';
import { ExamplesRoutingModule } from './examples.routing';
import { BottomSheetModule } from './bottom-sheet/bottom-sheet.module';
import { ButtonsModule } from './buttons/buttons.module';
import { CardsModule } from './cards/cards.module';

@NgModule({
    imports: [ExamplesRoutingModule, ButtonsModule, CardsModule, BottomSheetModule]
})
export class ExamplesModule {}
