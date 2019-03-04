import './bundle-config';
import * as app from 'tns-core-modules/application';

import { install, installMixins, themer } from 'nativescript-material-core';

install();
installMixins();
// themer.setPrimaryColor('red');
// themer.setPrimaryColorVariant('#3cff0000');

app.run({ moduleName: 'app-root' });
