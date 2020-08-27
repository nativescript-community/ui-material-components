import './bundle-config';
import * as app from '@nativescript/core/application';

import { installMixins, themer } from '@nativescript-community/ui-material-core';
import { install } from '@nativescript-community/ui-material-bottomsheet';

install();
installMixins();
// themer.setPrimaryColor('red');
// themer.setPrimaryColorVariant('#3cff0000');

app.run({ moduleName: 'app-root' });
