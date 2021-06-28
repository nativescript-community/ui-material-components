// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { themer } from '@nativescript-community/ui-material-core';
import { AppModule } from './app/app.module';

if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
}

runNativeScriptAngularApp({
    appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule)
});
