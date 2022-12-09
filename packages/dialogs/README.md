# NativeScript Material Dialogs

Material Design's [Dialogs](https://material.io/components/dialogs) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-dialogs.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-dialogs.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-dialogs`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-dialogs`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-dialogs@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

Uses the same API as [NativeScript Dialogs](https://docs.nativescript.org/ui/dialogs).

Adds one option for `alert`:
* `view` : can be a NativeScript View or a path to to XML component. The custom view will be added to the dialog. Possibilities become endless.

##

### TS

```typescript
import { login, alert, prompt } from "@nativescript-community/ui-material-dialogs";

alert("Your message").then(()=> {
    console.log("Dialog closed!");
});

```
