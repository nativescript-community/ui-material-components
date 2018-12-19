import './bundle-config';
import * as app from 'tns-core-modules/application';

import { install, themer } from 'nativescript-material-core';

install();
// themer.setPrimaryColor('red');
// themer.setPrimaryColorVariant('#3cff0000');

app.run({ moduleName: 'app-root' });
