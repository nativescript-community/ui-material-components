# Nativescript Material Components

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Build beautiful, usable products using Material Components for NativeScript.

## Components

- ActivityIndicator [README](./packages/activityindicator/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-activityindicator)
- Bottom Navigation [README](./packages/bottom-navigation/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-bottom-navigation)
- Bottom Navigation Bar [README](./packages/bottomnavigationbar/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar)
- Bottom Sheets [README](./packages/bottomsheet/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomsheet)
- Button [README](./packages/button/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-button)
- CardView [README](./packages/cardview/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-cardview)
- Dialogs [README](./packages/dialogs/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs)
- Floating Action Button [README](./packages/floatingactionbutton/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton)
- Progress [README](./packages/progress/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)
- Ripple [README](./packages/ripple/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-ripple)
- Slider [README](./packages/slider/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-slider)
- Snackbar [README](./packages/snackbar/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-snackbar)
- TextField [README](./packages/textfield/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-textfield)
- TextView [README](./packages/textview/README.md) [npm](https://www.npmjs.com/package/@nativescript-community/ui-material-textview)

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


