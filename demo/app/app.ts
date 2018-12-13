import * as app from 'tns-core-modules/application';

import { themer, install } from '~/nativescript-material-components/material'

install()
// themer.setPrimaryColor('red');
// themer.setPrimaryColorVariant('#3cff0000');

app.run({ moduleName: 'app-root' });
