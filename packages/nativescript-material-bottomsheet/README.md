[![npm](https://img.shields.io/npm/v/nativescript-material-bottomsheet.svg)](https://www.npmjs.com/package/nativescript-material-bottomsheet)
[![npm](https://img.shields.io/npm/dt/nativescript-material-bottomsheet.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-bottomsheet)
[![GitHub forks](https://img.shields.io/github/forks/bradmartin/nativescript-material-bottomsheet.svg)](https://github.com/bradmartin/nativescript-material-bottomsheet/network)
[![GitHub stars](https://img.shields.io/github/stars/bradmartin/nativescript-material-bottomsheet.svg)](https://github.com/bradmartin/nativescript-material-bottomsheet/stargazers)

# NativeScript Material Dialogs

Use the Material Design Dialogs in your {N} app

## Installation

`tns plugin add nativescript-material-bottomsheet`

## [Changelog](./CHANGELOG.md)

## Usage

### Start-up wiring
We need to do some wiring when your app starts, so open `app.js` and add this before creating any View/App/Frame:


##### JavaScript
```js
var material = require("nativescript-material-bottomsheet");

material.install();
```

#### TypeScript
```ts
import { install } from "nativescript-material-bottomsheet";
install();
```

Uses the same kind of API as [Nativescript Modals](https://docs.nativescript.org/ui/modal-view)

### TS

```typescript
const modalViewModulets = "ns-ui-category/modal-view/basics/modal-ts-view-page";
export function openBottomSheet(args) {
    const mainView: Button = <Button>args.object;
    const context = { username: "test_username", password: "test" };
    const fullscreen = true;
    mainView.showBottomSheet(modalViewModulets, context, (username, password) => {
        // Receive data from the bottomsheet view. e.g. username & password
        alert(`Username: ${username} : Password: ${password}`);
    }, fullscreen);
}

```
