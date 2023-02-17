// @ts-ignore
import { registerElement } from 'nativescript-vue';
import ActivityIndicatorPlugin from '@nativescript-community/ui-material-activityindicator/vue';
import BottomNavigationPlugin from '@nativescript-community/ui-material-bottom-navigation/vue';
import BottomNavigationBarPlugin from '@nativescript-community/ui-material-bottomnavigationbar/vue';
import { install as installBottomSheet } from '@nativescript-community/ui-material-bottomsheet';
import { BottomSheetPlugin } from '@nativescript-community/ui-material-bottomsheet/vue3';
import ButtonPlugin from '@nativescript-community/ui-material-button/vue';

import CardViewPlugin from '@nativescript-community/ui-material-cardview/vue';

import { installMixins, themer } from '@nativescript-community/ui-material-core';
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue';
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue';
import RipplePlugin from '@nativescript-community/ui-material-ripple/vue';
import SliderPlugin from '@nativescript-community/ui-material-slider/vue';
import SpeedDialPlugin from '@nativescript-community/ui-material-speeddial/vue';
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';
import TextFieldPlugin from '@nativescript-community/ui-material-textfield/vue';
import TextViewPlugin from '@nativescript-community/ui-material-textview/vue';

import ActivityIndicators from './ActivityIndicators.vue';
import BottomNavigationBar from './BottomNavigationBar.vue';
import BottomNavigation from './BottomNavigation.vue';
import Buttons from './Buttons.vue';
import CardViews from './CardViews.vue';
import Dialogs from './Dialogs.vue';
import ProgressBars from './ProgressBars.vue';
import Ripples from './Ripples.vue';
import Sliders from './Sliders.vue';
import SnackBar from './SnackBar.vue';
import TextFields from './TextFields.vue';
import TextViews from './TextView.vue';
import BottomSheet from './BottomSheet.vue';
import SpeedDial from './Speeddial.vue';
import Tabs from './Tabs.vue';
import Mixins from './Mixins.vue';

import '../app.scss';

import { Trace } from '@nativescript/core';

Trace.addCategories(Trace.categories.NativeLifecycle);
Trace.addCategories(Trace.categories.ViewHierarchy);
// Trace.enable();
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

export function installPlugin(app: any) {
    // TODO: need adapt: TabsPlugin, BottomNavigationPlugin, BottomNavigationBarPlugin
    app.use(ButtonPlugin);
    app.use(FloatingActionButtonPlugin);
    app.use(CardViewPlugin);
    app.use(ActivityIndicatorPlugin);
    app.use(ProgressPlugin);
    app.use(RipplePlugin);
    app.use(SliderPlugin);
    app.use(SpeedDialPlugin);
    app.use(TextFieldPlugin);
    app.use(TextViewPlugin);
    // TODO: wait for publish new version BottomSheetPlugin
    app.use(BottomSheetPlugin);
}

export const demos = [
    { name: 'ActivityIndicators', path: 'ActivityIndicators', component: ActivityIndicators },
    // {name: 'BottomNavigationBar', path: 'BottomNavigationBar', component: BottomNavigationBar},
    // {name: 'BottomNavigation', path: 'BottomNavigation', component: BottomNavigation},
    { name: 'Buttons', path: 'Buttons', component: Buttons },
    { name: 'CardViews', path: 'CardViews', component: CardViews },
    { name: 'Dialogs', path: 'Dialogs', component: Dialogs },
    { name: 'ProgressBars', path: 'ProgressBars', component: ProgressBars },
    { name: 'Ripples', path: 'Ripples', component: Ripples },
    { name: 'Sliders', path: 'Sliders', component: Sliders },
    { name: 'SnackBar', path: 'SnackBar', component: SnackBar },
    { name: 'TextFields', path: 'TextFields', component: TextFields },
    { name: 'TextViews', path: 'TextViews', component: TextViews },
    { name: 'BottomSheet', path: 'BottomSheet', component: BottomSheet },
    // { name: 'SpeedDial', path: 'SpeedDial', component: SpeedDial },
    // { name: 'Tabs', path: 'Tabs', component: Tabs },
    { name: 'Mixins', path: 'Mixins', component: Mixins }
];
