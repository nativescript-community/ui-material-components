import { title as activityIndicatorsTitle } from './ActivityIndicators.vue';
import ActivityIndicators from './ActivityIndicators.vue';
import { title as buttonsTitle } from './Buttons.vue';
import Buttons from './Buttons.vue';
import { title as cardViewsTitle } from './CardViews.vue';
import CardViews from './CardViews.vue';
import { title as progressBarsTitle } from './ProgressBars.vue';
import ProgressBars from './ProgressBars.vue';
import { title as ripplesTitle } from './Ripples.vue';
import Ripples from './Ripples.vue';
import { title as slidersTitle } from './Sliders.vue';
import Sliders from './Sliders.vue';
import { title as textFieldsTitle } from './TextFields.vue';
import TextFields from './TextFields.vue';
import { title as dialogsTitle } from './Dialogs.vue';
import Dialogs from './Dialogs.vue';
import { title as snackTitle } from './SnackBar.vue';
import SnackBar from './SnackBar.vue';

export const getExamples = () => {
    return [
        {
            title: buttonsTitle,
            component: Buttons
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
        }
    ];
};
