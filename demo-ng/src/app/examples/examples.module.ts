import { NgModule } from '@angular/core';
import { ExamplesRoutingModule } from './examples.routing';
import { ButtonsModule } from './buttons/buttons.module';
import { CardsModule } from './cards/cards.module';
import { BottomSheetModule } from './bottom-sheet/bottom-sheet.module';
import { RippleModule } from './ripple/ripple.module';
import { TextFieldModule } from './text-field/text-field.module';
import { SliderModule } from './slider/slider.module';
import { ProgressModule } from './progress/progress.module';
import { ActivityIndicatorModule } from './activity-indicator/activity-indicator.module';
import { BottomNavigationBarModule } from './bottom-navigation-bar/bottom-navigation-bar.module';

@NgModule({
    imports: [
        ExamplesRoutingModule, //
        ButtonsModule,
        CardsModule,
        BottomSheetModule,
        RippleModule,
        TextFieldModule,
        SliderModule,
        ProgressModule,
        ActivityIndicatorModule,
        BottomNavigationBarModule
    ]
})
export class ExamplesModule {}
