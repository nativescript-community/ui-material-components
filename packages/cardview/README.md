# NativeScript Material Card

Material Design's [Card](https://material.io/components/cards) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-cardview.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-cardview)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-cardview.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-cardview)

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

For N 7.0
* `tns plugin add @nativescript-community/ui-material-cardview`

##

For N 6.x
* `tns plugin add nativescript-material-cardview`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-cardview@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdc="@nativescript-community/ui-material-cardview"` on the Page element_

#### XML

```XML
<Page xmlns:mdc="@nativescript-community/ui-material-cardview">
    <StackLayout horizontalAlignment="center">
        <mdc:CardView width="100" height="100"/>
        <mdc:CardView elevation="5" rippleColor="red"  width="100" height="100"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdcardview {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialCardViewModule } from "@nativescript-community/ui-material-cardview/angular";

@NgModule({
    imports: [
        NativeScriptMaterialCardViewModule,
        ...
    ],
    ...
})
```

```html
<MDCardView rippleColor="blue"  width="100" height="100"></MDCardView>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import CardViewPlugin from '@nativescript-community/ui-material-cardview/vue';

Vue.use(CardViewPlugin);
```

```html
<MDCardView rippleColor="blue"  width="100" height="100"/>
```

## API

### Attributes

Inherite from NativeScript [StackLayout](https://docs.nativescript.org/ui/layouts/layout-containers#stacklayout-properties)

* **elevation** _optional_

An attribute to set the elevation of the cardview. This will increase the 'drop-shadow' of the cardview.

* **rippleColor** _optional_

An attribute to set the ripple color of the cardview.
