# Nativescript Material Components

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Build beautiful, usable products using Material Components for NativeScript.

## Components

-   [Button](./packages/button/README.md)
-   [Floating Action Button](./packages/floatingactionbutton/README.md)
-   [TextField](./packages/textfield/README.md)
-   [TextView](./packages/textview/README.md)
-   [CardView](./packages/cardview/README.md)
-   [Slider](./packages/slider/README.md)
-   [Progress](./packages/progress/README.md)
-   [ActivityIndicator](./packages/activityindicator/README.md)
-   [Dialogs](./packages/dialogs/README.md)
-   [Bottom Sheets](./packages/bottomsheet/README.md)
-   [Ripple View](./packages/ripple/README.md)
-   [Snackbar](./packages/snackbar/README.md)
-   [Bottom Navigation Bar](./packages/bottomnavigationbar/README.md)


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


