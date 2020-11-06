import ActivityIndicators, { title as activityIndicatorsTitle } from './ActivityIndicators.vue';
import BottomNavigationBar, { title as bottomNavigationBarTitle } from './BottomNavigationBar.vue';
import Buttons, { title as buttonsTitle } from './Buttons.vue';
import CardViews, { title as cardViewsTitle } from './CardViews.vue';
import Dialogs, { title as dialogsTitle } from './Dialogs.vue';
import ProgressBars, { title as progressBarsTitle } from './ProgressBars.vue';
import Ripples, { title as ripplesTitle } from './Ripples.vue';
import Sliders, { title as slidersTitle } from './Sliders.vue';
import SnackBar, { title as snackTitle } from './SnackBar.vue';
import TextFields, { title as textFieldsTitle } from './TextFields.vue';
import TextViews, { title as textViewsTitle } from './TextView.vue';
import ButtonIssue, { title as buttonIssueTitle } from './ButtonIssue.vue';
import BottomSheet, { title as bottomsheetTitle } from './BottomSheet.vue';
import SpeedDial, { title as speeddialTitle } from './Speeddial.vue';
import Tabs, { title as tabsTitle } from './Tabs.vue';
import Mixins, { title as mixinsTitle } from './Mixins.vue';

export const getExamples = () => [
    {
        title: buttonsTitle,
        component: Buttons
    },
    {
        title: speeddialTitle,
        component: SpeedDial
    },
    {
        title: bottomNavigationBarTitle,
        component: BottomNavigationBar
    },
    {
        title: tabsTitle,
        component: Tabs
    },
    {
        title: cardViewsTitle,
        component: CardViews
    },
    {
        title: activityIndicatorsTitle,
        component: ActivityIndicators
    },
    {
        title: textFieldsTitle,
        component: TextFields
    },
    {
        title: textViewsTitle,
        component: TextViews
    },
    {
        title: progressBarsTitle,
        component: ProgressBars
    },
    {
        title: slidersTitle,
        component: Sliders
    },
    {
        title: ripplesTitle,
        component: Ripples
    },
    {
        title: dialogsTitle,
        component: Dialogs
    },
    {
        title: snackTitle,
        component: SnackBar
    },
    {
        title: bottomsheetTitle,
        component: BottomSheet
    },
    {
        title: snackTitle,
        component: SnackBar
    },
    {
        title: mixinsTitle,
        component: Mixins
    }
];
