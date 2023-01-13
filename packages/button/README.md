# NativeScript Material Button

Material Design's [Button](https://material.io/components/buttons) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-button.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-button)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-button.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-button)

## Contents

- [NativeScript Material Button](#nativescript-material-button)
  - [Contents](#contents)
  - [Installation](#installation)
  - [](#)
  - [](#-1)
  - [](#-2)
  - [Changelog](#changelog)
  - [FAQ](#faq)
  - [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
      - [XML](#xml)
      - [CSS](#css)
  - [](#-3)
    - [NativeScript + Angular](#nativescript--angular)
  - [](#-4)
    - [NativeScript + Vue](#nativescript--vue)
  - [API](#api)
    - [Attributes](#attributes)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-button`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-button`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-button@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdb="@nativescript-community/ui-material-button"` on the Page element_

#### XML

```XML
<Page xmlns:mdb="@nativescript-community/ui-material-button">
    <StackLayout horizontalAlignment="center">
        <mdb:Button text="raised button"/>
        <mdb:Button variant="flat" text="flat button"/>
        <mdb:Button variant="text" text="text button"/>
        <mdb:Button elevation="5" rippleColor="red" text="raised custom button"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdbutton {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialButtonModule } from "@nativescript-community/ui-material-button/angular";

@NgModule({
    imports: [
        NativeScriptMaterialButtonModule,
        ...
    ],
    ...
})
```

```html
<MDButton rippleColor="blue" text="text button"></MDButton>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import ButtonPlugin from '@nativescript-community/ui-material-button/vue';

Vue.use(ButtonPlugin);
```

```html
<MDButton rippleColor="blue" text="text button"/>
```

## API

### Attributes

Inherite from NativeScript [Button](https://docs.nativescript.org/ui/ns-ui-widgets/button) so it already has all the same attributes.

* **elevation** _optional_

An attribute to set the elevation of the button. This will increase the 'drop-shadow' of the button.

* **variant** _optional_

An attribute to set the variant of the button. Can be ```flat``` or ```text```. No value means raised button

* **rippleColor** _optional_

An attribute to set the ripple color of the button.
