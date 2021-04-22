# Nativescript Material Components

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Build beautiful, usable products using Material Components for NativeScript.

## Installation

### Android 
Ensure your Android Theme is inheriting from `MaterialComponents`.
Inside ```App_resources/android/res/values/styles.xml``` replace all occurences of ```Theme.AppCompat``` with ```Theme.MaterialComponents```
You can see an example in the demo-vue app.

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

## Components

| Name | README | npm | Material design |
| :---: | :---: | :---: | :---: |
| Circular progress indicator | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/activityindicator/README.md) | [@nativescript-community/ui-material-activityindicator](https://www.npmjs.com/package/@nativescript-community/ui-material-activityindicator) | [Circular progress indicators](https://material.io/components/progress-indicators#circular-progress-indicators) |
| Bottom navigation | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/bottom-navigation/README.md) | [@nativescript-community/ui-material-bottom-navigation](https://www.npmjs.com/package/@nativescript-community/ui-material-bottom-navigation) | [Bottom navigation](https://material.io/components/bottom-navigation) |
| Bottom navigation bar | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/bottomnavigationbar/README.md) | [@nativescript-community/ui-material-bottomnavigationbar](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) | [Bottom navigation](https://material.io/components/bottom-navigation) |
| Bottom sheet | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/bottomsheet/README.md) | [@nativescript-community/ui-material-bottomsheet](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomsheet) | [Sheets: bottom](https://material.io/components/sheets-bottom) |
| Button | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/button/README.md) | [@nativescript-community/ui-material-button](https://www.npmjs.com/package/@nativescript-community/ui-material-button) | [Buttons](https://material.io/components/buttons) |
| Card | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/cardview/README.md) | [@nativescript-community/ui-material-cardview](https://www.npmjs.com/package/@nativescript-community/ui-material-cardview) | [Cards](https://material.io/components/cards) |
| Dialogs | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/dialogs/README.md) | [@nativescript-community/ui-material-dialogs](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs) | [Dialogs](https://material.io/components/dialogs) |
| Floating action button | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/floatingactionbutton/README.md) | [@nativescript-community/ui-material-floatingactionbutton](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton) | [Buttons: floating action button](https://material.io/components/buttons-floating-action-button) |
| Linear progress indicator | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/progress/README.md) | [@nativescript-community/ui-material-progress](https://www.npmjs.com/package/@nativescript-community/ui-material-progress) | [Linear progress indicators](https://material.io/components/progress-indicators#linear-progress-indicators) |
| Ripple | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/ripple/README.md) | [@nativescript-community/ui-material-ripple](https://www.npmjs.com/package/@nativescript-community/ui-material-ripple) | [Ripple](https://material.io/design/interaction/states.html#pressed) |
| Slider | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/slider/README.md) | [@nativescript-community/ui-material-slider](https://www.npmjs.com/package/@nativescript-community/ui-material-slider) | [Sliders](https://material.io/components/sliders) |
| Snackbar | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/snackbar/README.md) | [@nativescript-community/ui-material-snackbar](https://www.npmjs.com/package/@nativescript-community/ui-material-snackbar) | [Snackbars](https://material.io/components/snackbars) |
| Speed dial | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/speeddial/README.md) | [@nativescript-community/ui-material-speeddial](https://www.npmjs.com/package/@nativescript-community/ui-material-speeddial) | [Speed dial](https://material.io/components/buttons-floating-action-button#types-of-transitions) |
| Tabs | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/tabs/README.md) | [@nativescript-community/ui-material-tabs](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs) | [Tabs](https://material.io/components/tabs) |
| Text field | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/textfield/README.md) | [@nativescript-community/ui-material-textfield](https://www.npmjs.com/package/@nativescript-community/ui-material-textfield) | [Text fields](https://material.io/components/text-fields) |
| Text view | [README.md](https://github.com/nativescript-community/ui-material-components/blob/master/packages/textview/README.md) | [@nativescript-community/ui-material-textview](https://www.npmjs.com/package/@nativescript-community/ui-material-textview) | [Material Text View](https://material.io/develop/android/components/material-text-view) |

## FAQ

**Question:** How to use the latest version of this plugin for iOS?

**Answer:** To get latest versions of Material Components for iOS (> 112.1) you will need to change Pod min version to 10.0
To do that modify or create `App_Resources/iOS/Podfile` to add `platform :ios, '10.0'`.
You can see an example in the demo-vue app.

##

**Q:** How to migrate to AndroidX with this plugin installed (Android only)?

**A:** For Material Components to work correctly with {N} 6 and AndroidX you need to update your android app theme.
Inside ```App_resources/android/res/values/styles.xml``` replace all occurences of ```Theme.AppCompat``` with ```Theme.MaterialComponents```
You can see an example in the demo-vue app.

##

**Q:** What is the difference between Bottom Navigation and Bottom Navigation Bar component?

**A:** The _Bottom Navigation Bar_ is a new component to draw a bottom navigation bar in material design.
The _Bottom Navigation_ component is a simple extract of the [eponymous component from NativeScript](https://docs.nativescript.org/ui/components/bottom-navigation), which probably will be removed in the future so this one can be used for easy transition.

##

**Q:** How can I contribute?

**A:**
```bash
npm i
npm run setup # this should happen for every typescript update
npm run tsc
npm run demo.ios
npm run demo.android
```
