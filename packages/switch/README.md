# NativeScript Material Switch

Material Design's [Switch](https://m3.material.io/components/switch/overview) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-switch.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-prswitchogress)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-switch.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-switch)

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
* `tns plugin add @nativescript-community/ui-material-switch`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-switch`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdp="@nativescript-community/ui-material-progress"` on the Page element_

#### XML

```XML
<Page xmlns:mdp="@nativescript-community/ui-material-switch">
    <StackLayout horizontalAlignment="center">
        <mdp:Switch />
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdswitch{
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialSwitchModule } from "@nativescript-community/ui-material-switch/angular";

@NgModule({
    imports: [
        NativeScriptMaterialSwitchModule,
        ...
    ],
    ...
})
```

```html
<MDSwitch v-model="value"></MDSwitch>
```

##

### NativeScript + Vue

```typescript
import SwitchPlugin from '@nativescript-community/ui-material-switch/vue';

Vue.use(SwitchPlugin);
```

```html
<MDSwitch></MDSwitch>
```

## API

### Attributes

Inherits from NativeScript [Switch](https://docs.nativescript.org/ui/components/switch) so it already has all the same attributes.

