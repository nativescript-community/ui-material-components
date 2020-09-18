[![npm](https://img.shields.io/npm/v/nativescript-material-snackbar.svg)](https://www.npmjs.com/package/nativescript-material-snackbar)
[![npm](https://img.shields.io/npm/dt/nativescript-material-snackbar.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-snackbar)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

# Nativescript Material SnackBar

Use the Material Design Snackbars in your {N} app

##### [Material Design Spec](https://material.io/design/components/snackbars.html)

## Installation

### Warning :warning: :warning: 
From 5.x using material component will break N tab component on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/nativescript-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [tabs](https://www.npmjs.com/package/nativescript-material-tabs) (clone of N one, but with a little less features)

For N 7.0
* `tns plugin add @nativescript-community/ui-material-snackbar`

For N 6.x
* `tns plugin add nativescript-material-snackbar`

If using ```tns-core-modules```
* `tns plugin add nativescript-material-snackbar@2.5.4`

Be sure to run a new build after adding plugins to avoid any issues.

## Usage

### TS

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
