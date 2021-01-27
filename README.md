# Nativescript Material Components

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Build beautiful, usable products using Material Components for NativeScript.

## Components

| Name | README | npm | Material design spec |
| :---: | :---: | :---: | :---: |
| ActivityIndicator | [README.md](./packages/activityindicator/README.md) | [@nativescript-community/ui-material-activityindicator](https://www.npmjs.com/package/@nativescript-community/ui-material-activityindicator) | null |
| Bottom Navigation | [README.md](./packages/bottom-navigation/README.md) | [@nativescript-community/ui-material-bottom-navigation](https://www.npmjs.com/package/@nativescript-community/ui-material-bottom-navigation) | null |
| Bottom Navigation Bar | [README.md](./packages/bottomnavigationbar/README.md) | [@nativescript-community/ui-material-bottomnavigationbar](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) | null |
| Bottom Sheets | [README.md](./packages/bottomsheet/README.md) | [@nativescript-community/ui-material-bottomsheet](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomsheet) | null |
| Button | [README.md](./packages/button/README.md) | [@nativescript-community/ui-material-button](https://www.npmjs.com/package/@nativescript-community/ui-material-button) | null |
| CardView | [README.md](./packages/cardview/README.md) | [@nativescript-community/ui-material-cardview](https://www.npmjs.com/package/@nativescript-community/ui-material-cardview) | null |
| Dialogs | [README.md](./packages/dialogs/README.md) | [@nativescript-community/ui-material-dialogs](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs) | null |
| Floating Action Button | [README.md](./packages/floatingactionbutton/README.md) | [@nativescript-community/ui-material-floatingactionbutton](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton) | null |
| Progress | [README.md](./packages/progress/README.md) | [@nativescript-community/ui-material-progress](https://www.npmjs.com/package/@nativescript-community/ui-material-progress) | null |
| Ripple | [README.md](./packages/ripple/README.md) | [@nativescript-community/ui-material-ripple](https://www.npmjs.com/package/@nativescript-community/ui-material-ripple) | null |
| Slider | [README.md](./packages/slider/README.md) | [@nativescript-community/ui-material-slider](https://www.npmjs.com/package/@nativescript-community/ui-material-slider) | null |
| Snackbar | [README.md](./packages/snackbar/README.md) | [@nativescript-community/ui-material-snackbar](https://www.npmjs.com/package/@nativescript-community/ui-material-snackbar) | null |
| TextField | [README.md](./packages/textfield/README.md) | [@nativescript-community/ui-material-textfield](https://www.npmjs.com/package/@nativescript-community/ui-material-textfield) | null |
| TextView | [README.md](./packages/textview/README.md) | [@nativescript-community/ui-material-textview](https://www.npmjs.com/package/@nativescript-community/ui-material-textview) | null |

## iOS latest versions

To get latest versions of Material Components for iOS (> 112.1) you will need to change Pod min version to 10.0
To do that modify or create `App_Resources/iOS/Podfile` to add `platform :ios, '10.0'`.
You can see an example in the demo-vue app.

## Android migration to AndroidX

For Material Components to work correctly with {N} 6 and AndroidX you need to update your android app theme.
inside ```App_resources/android/res/values/styles.xml``` replace all occurences of ```Theme.AppCompat``` with ```Theme.MaterialComponents```
You can see an example in the demo-vue app.

## Contribution

```bash
npm i
npm run setup // this should happen for every typescript update
npm run tsc
npm run demo.ios
npm run demo.android
```


