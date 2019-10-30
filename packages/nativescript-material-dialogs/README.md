[![npm](https://img.shields.io/npm/v/nativescript-material-dialogs.svg)](https://www.npmjs.com/package/nativescript-material-dialogs)
[![npm](https://img.shields.io/npm/dt/nativescript-material-dialogs.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-dialogs)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

# NativeScript Material Dialogs

Use the Material Design Dialogs in your {N} app

## Installation

If using ```@nativescript``` :
* `tns plugin add nativescript-material-dialogs`

If using ```tns-core-modules```
* `tns plugin add nativescript-material-dialogs@2.5.4`

## [Changelog](./CHANGELOG.md)

## Usage

Uses the same API as [Nativescript Dialogs](https://docs.nativescript.org/ui/dialogs)

Adds one option for ```alert```:
* ```view``` : can be a Nativescript View or a path to to XML component. The custom view will be added to the dialog. Possibilities become endless

### TS

```typescript
import { login, alert, prompt } from "nativescript-material-dialogs";

alert("Your message").then(()=> {
    console.log("Dialog closed!");
});

```
