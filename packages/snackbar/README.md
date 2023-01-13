# NativeScript Material Snackbar

Material Design's [Snackbar](https://material.io/components/snackbars) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-snackbar.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-snackbar)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-snackbar.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-snackbar)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-snackbar`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-snackbar`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-snackbar@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### TypeScript

```typescript
import { SnackBar } from '@nativescript-community/ui-material-snackbar';

const snackbar = new SnackBar();

export function showSimpleSnackbar() {
    snackbar.simple(`I'm a simple snackbar`).then(result => console.log('Simple Snackbar:', result));
}

export function showActionSnackbar() {
    snackbar
        .action({
            message: `I'm a snackbar with an action`,
            actionText: 'Dismiss',
            hideDelay: 2000
        })
        .then(result => console.log('Action Snackbar:', result));
}

export function showColorfulSnackbar() {
    snackbar
        .action({
            message: `I'm a colorful snackbar`,
            textColor: 'blue',
            actionTextColor: 'yellow',
            backgroundColor: 'green',
            actionText: 'Dismiss',
            hideDelay: 2000
        })
        .then(result => console.log('Action Snackbar:', result));
}

```
