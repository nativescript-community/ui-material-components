# Nativescript Material Components

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Build beautiful, usable products using Material Components for NativeScript.

## Components

-   [Button](./packages/nativescript-material-button/README.md)
-   [Floating Action Button](./packages/nativescript-material-floatingactionbutton/README.md)
-   [Textfield](./packages/nativescript-material-textfield/README.md)
-   [CardView](./packages/nativescript-material-cardview/README.md)
-   [Slider](./packages/nativescript-material-slider/README.md)
-   [Progress](./packages/nativescript-material-progress/README.md)
-   [ActivityIndicator](./packages/nativescript-material-activityindicator/README.md)
-   [Dialogs](./packages/nativescript-material-dialogs/README.md)
-   [Bottom Sheets](./packages/nativescript-material-bottomsheet/README.md)
-   [Ripple View](./packages/nativescript-material-ripple/README.md)
-   [Snackbar](./packages/nativescript-material-snackbar/README.md)
-   [Bottom Navigation Bar](./packages/nativescript-material-bottomnavigationbar/README.md)

## Android migration to AndroidX

For Material Components to work correctly with {N} 6 and AndroidX you need to update your android app theme.
inside ```App_ressources/android/res/values/styles.xml``` replace all occurences of ```Theme.AppCompat``` with ```Theme.MaterialComponents```

## Contribution

```bash
npm i
npm run tsc
npm run demo.ios
npm run demo.android
```


