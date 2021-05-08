import * as React from 'react';

/* Controls react-nativescript log verbosity. true: all logs; false: only error logs. */
Object.defineProperty(global, '__DEV__', { value: true });

/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import * as ReactNativeScript from 'react-nativescript';
import { registerTabNavigationBase } from '@nativescript-community/ui-material-core/tab-navigation-base/react';
import { registerTabs } from '@nativescript-community/ui-material-tabs/react';
import { registerBottomNavigation } from '@nativescript-community/ui-material-bottom-navigation/react';
import { AppContainer } from './components/AppContainer';

registerTabNavigationBase({ enableDebugLogging: true });
registerTabs({ enableDebugLogging: true });
registerBottomNavigation({ enableDebugLogging: true });
ReactNativeScript.start(React.createElement(AppContainer, {}, null));

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
