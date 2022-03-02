import { install as installBottomSheet } from '@nativescript-community/ui-material-bottomsheet';
import { installMixins, themer } from '@nativescript-community/ui-material-core';

import ButtonPlugin from '@nativescript-community/ui-material-button/svelte';
import Buttons from './Buttons.svelte';
import '../app.scss';

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
export function installPlugin() {
    ButtonPlugin.register();
}

export const demos = [{ name: 'Buttons', path: 'Buttons', component: Buttons }];
