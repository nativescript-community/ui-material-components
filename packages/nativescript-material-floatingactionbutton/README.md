# Nativescript Material ActivityIndicator

[//]: # ([![Build Status][build-status]][build-url])
[![NPM version][npm-image]][npm-url]

[npm-url]:https://npmjs.org/package/nativescript-material-components



## Installation

From the command prompt go to your app's root folder and execute:

```bash
tns plugin add nativescript-material-activityindicator
```

## Usage

### Demo app
If you want a quickstart, clone the repo, then:
- `cd demo`.
- `tns run ios` or `tns run android`.

### Start-up wiring
For some features (coordinatorLayout, bottomsheets ...), we need to do some wiring when your app starts, so open `app.js` and add this before creating any View/App/Frame:

##### JavaScript
```js
var material = require("nativescript-material-components");

material.install();
```

#### TypeScript
```ts
import { install } from "nativescript-material-components";
install();
```