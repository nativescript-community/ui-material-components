[![npm](https://img.shields.io/npm/v/nativescript-material-bottomsheet.svg)](https://www.npmjs.com/package/nativescript-material-bottomsheet)
[![npm](https://img.shields.io/npm/dt/nativescript-material-bottomsheet.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-bottomsheet)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

# NativeScript Material BottomSheets

Use the Material Design Bottom Sheets in your {N} app

##### [Material Design Spec](https://material.io/design/components/sheets-bottom.html)

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
    mainView.showBottomSheet({
        view: modalViewModulets,
        context,
        closeCallback: (username, password) => {
            bottom-sheet
            alert(`Username: ${username} : Password: ${password}`);
        },
        fullscreen
    });
}

```
