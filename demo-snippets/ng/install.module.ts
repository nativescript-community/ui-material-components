import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { ButtonsModule } from './buttons/buttons.module';
import { CardsModule } from './cards/cards.module';
import { BottomSheetModule } from './bottom-sheet/bottom-sheet.module';
import { RippleModule } from './ripple/ripple.module';
import { TextFieldModule } from './text-field/text-field.module';
import { SliderModule } from './slider/slider.module';
import { ProgressModule } from './progress/progress.module';
import { ActivityIndicatorModule } from './activity-indicator/activity-indicator.module';
import { BottomNavigationBarModule } from './bottom-navigation-bar/bottom-navigation-bar.module';
import { TabsModule } from './tabs/tabs.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { RippleComponent } from './ripple/ripple.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { SliderComponent } from './slider/slider.component';
import { ProgressComponent } from './progress/progress.component';
import { ActivityIndicatorComponent } from './activity-indicator/activity-indicator.component';
import { BottomNavigationBarComponent } from './bottom-navigation-bar/bottom-navigation-bar.component';
import { TabsComponent } from './tabs/tabs.component';

import { install as installBottomSheet } from '@nativescript-community/ui-material-bottomsheet';
import { installMixins, themer } from '@nativescript-community/ui-material-core';

import '../app.scss';

export const COMPONENTS = [
    ButtonsComponent,
    CardsComponent,
    BottomSheetComponent,
    RippleComponent,
    TextFieldComponent,
    SliderComponent,
    ProgressComponent,
    ActivityIndicatorComponent,
    BottomNavigationBarComponent,
    TabsComponent
];
@NgModule({
    imports: [ButtonsModule, CardsModule, BottomSheetModule, RippleModule, TextFieldModule, SliderModule, ProgressModule, ActivityIndicatorModule, BottomNavigationBarModule, TabsModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class InstallModule {}

installMixins();
installBottomSheet();
if (__IOS__) {
    themer.setPrimaryColor('#bff937');
    themer.setPrimaryColorVariant('#33B5E5');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
themer.createShape('cut', {
    cornerFamily: 'cut' as any,
    cornerSize: {
        value: 0.5,
        unit: '%'
    }
});

export function installPlugin() {}

export const demos = [
    { name: 'Buttons', path: 'Buttons', component: ButtonsModule },
    { name: 'Cards', path: 'Cards', component: CardsModule },
    { name: 'BottomSheet', path: 'BottomSheet', component: BottomSheetModule },
    { name: 'Ripple', path: 'Ripple', component: RippleModule },
    { name: 'TextField', path: 'TextField', component: TextFieldModule },
    { name: 'Slider', path: 'Slider', component: SliderModule },
    { name: 'Tabs', path: 'Tabs', component: TabsModule },
    { name: 'ActivityIndicator', path: 'ActivityIndicator', component: ActivityIndicatorModule },
    { name: 'BottomNavigationBar', path: 'BottomNavigationBar', component: BottomNavigationBarModule },
    { name: 'Progress', path: 'Progress', component: ProgressModule }
];
