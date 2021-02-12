/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from 'svelte-native';
import { DomTraceCategory, registerNativeViewElement } from 'svelte-native/dom';
import { SpeedDial, SpeedDialItem } from '@nativescript-community/ui-material-speeddial';
import App from './App.svelte';
import { Trace } from '@nativescript/core';

Trace.addCategories(DomTraceCategory);
    Trace.enable();
registerNativeViewElement('mdspeeddial', () => SpeedDial);
registerNativeViewElement('mdspeeddialitem', () => SpeedDialItem);

svelteNative(App, {});
