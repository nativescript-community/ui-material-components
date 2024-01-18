# Nativescript Material Components

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%20v2-yellow.svg)](https://opensource.org/license/apache-2-0/)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![lerna--lite](https://img.shields.io/badge/maintained%20with-lerna--lite-e137ff)](https://github.com/lerna-lite/lerna-lite)

Build beautiful, usable products using Material Components for NativeScript.

## Installation

### Android 
Ensure your Android Theme is inheriting from `MaterialComponents`.
Inside ```App_resources/android/res/values/styles.xml``` replace all occurences of ```Theme.AppCompat``` with ```Theme.MaterialComponents```
You can see an example in the demo-vue app.

### Production build
If you are using proguard on Android build you need ensure some resource from this plugin are not minified. You need to add ` tools:keep="@layout/ns_*"` as explained [here](https://developer.android.com/build/shrink-code#keep-resources)

## Theming
Defining the theme and the default colors must be done a bit differently on iOS and Android

* **Android**:  You must set the colors through [android Style](https://github.com/material-components/material-components-android/blob/master/docs/getting-started.md#appcompat-themes)
* **iOS**: You must set the colors programmatically at your app startup
```typescript
import { themer } from '@nativescript-community/ui-material-core';
if (global.isIOS) {
    themer.setPrimaryColor('#bff937');
    themer.setAccentColor('#ff8a39');
    themer.setSecondaryColor('#a830d7');
}
```

## Mixins
Through this component you can apply `elevation` or `rippleColor` to any `View`. To enable that feature your must "install" the mixins. Make sure you do it before creating any view.
```typescript
import { installMixins } from '@nativescript-community/ui-material-core';
installMixins();
```