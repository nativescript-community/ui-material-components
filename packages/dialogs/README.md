# NativeScript Material Dialogs

Material Design's [Dialogs](https://material.io/components/dialogs) component for Nativescript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-dialogs.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-dialogs.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs)

## Installation

### :warning: Warning :warning:
From Nativescript 5.x using this component will break the [Nativescript tab component](https://docs.nativescript.org/ui/components/tabs) on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [material-tabs](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs) (clone of the Nativescript one, but with a little less features).

##

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-dialogs`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-dialogs`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-dialogs@2.5.4`

## [Changelog](./CHANGELOG.md)

## Usage

Uses the same API as [Nativescript Dialogs](https://docs.nativescript.org/ui/dialogs).

Adds one option for `alert`:
* `view` : can be a Nativescript View or a path to to XML component. The custom view will be added to the dialog. Possibilities become endless.

##

### TS

```typescript
import { login, alert, prompt } from "@nativescript-community/ui-material-dialogs";

alert("Your message").then(()=> {
    console.log("Dialog closed!");
});

```
