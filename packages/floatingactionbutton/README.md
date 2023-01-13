# NativeScript Material Floating action button

Material Design's [Floating action button](https://material.io/components/buttons-floating-action-button) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-floatingactionbutton.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-floatingactionbutton.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton)

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
* `tns plugin add @nativescript-community/ui-material-floatingactionbutton`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-floatingactionbutton`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-floatingactionbutton@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdf="@nativescript-community/ui-material-floatingactionbutton"` on the Page element_

#### XML

```XML
<Page xmlns:mdf="@nativescript-community/ui-material-floatingactionbutton">
    <StackLayout horizontalAlignment="center">
        <mdf:FloatingActionButton src="res://ic_action_add"/>
        <mdf:FloatingActionButton elevation="5" src="res://ic_action_add"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdfloatingactionbutton {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { registerElement } from '@nativescript/angular/element-registry';
import { FloatingActionButton } from '@nativescript-community/ui-material-floatingactionbutton';
registerElement('MDFloatingActionButton', () => FloatingActionButton);
```

```html
<MDFloatingActionButton rippleColor="blue" src="res://ic_action_add"></MDFloatingActionButton>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue';

Vue.use(FloatingActionButtonPlugin);
```

```html
<MDFloatingActionButton rippleColor="blue" src="res://ic_action_add"/>
```

## API

### Attributes

Inherite from NativeScript [Button](https://docs.nativescript.org/ui/ns-ui-widgets/button) so it already has all the same attributes.

* **src** _optional_

An attribute to set the floatingactionbutton icon. For now FAB only support images as icon

* **elevation** _optional_

An attribute to set the elevation of the floatingactionbutton. This will increase the 'drop-shadow' of the floatingactionbutton.

* **rippleColor** _optional_

An attribute to set the ripple color of the floatingactionbutton.
