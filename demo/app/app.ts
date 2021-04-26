import './bundle-config';
import { Application } from '@nativescript/core';

import { installMixins, themer } from '@nativescript-community/ui-material-core';
import { install } from '@nativescript-community/ui-material-bottomsheet';

install();
installMixins();
// themer.setPrimaryColor('red');
// themer.setPrimaryColorVariant('#3cff0000');

Application.run({ moduleName: 'app-root' });
