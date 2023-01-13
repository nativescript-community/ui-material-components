# NativeScript Material Ripple

Material Design's [Ripple](https://material.io/design/interaction/states.html#pressed) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-ripple.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-ripple)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-ripple.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-ripple)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-ripple`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-ripple`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-ripple@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdr="@nativescript-community/ui-material-ripple"` on the Page element_

#### XML

```XML
<Page xmlns:mdr="@nativescript-community/ui-material-ripple">
    <StackLayout horizontalAlignment="center">
        <mdr:Ripple rippleColor="green" width="100" height="100" />
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdripple {
    ripple-color: blue;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialRippleModule } from "@nativescript-community/ui-material-ripple/angular";

@NgModule({
    imports: [
        NativeScriptMaterialRippleModule,
        ...
    ],
    ...
})
```

```html
<MDRipple rippleColor="green" width="100" height="100"></MDRipple>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import RipplePlugin from '@nativescript-community/ui-material-ripple/vue';

Vue.use(RipplePlugin);
```

```html
<MDRipple rippleColor="green" width="100" height="100"/>
```

## API

### Attributes

Inherite from NativeScript [StackLayout](https://docs.nativescript.org/ui/layouts/layout-containers#stacklayout-properties).

* **rippleColor** _optional_

An attribute to set the ripple color of the ripple.
