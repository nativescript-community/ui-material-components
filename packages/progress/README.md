# NativeScript Material Linear progress indicator

Material Design's [Linear progress indicator](https://material.io/components/progress-indicators#linear-progress-indicators) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-progress.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-progress.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)

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
* `tns plugin add @nativescript-community/ui-material-progress`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-progress`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-progress@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdp="@nativescript-community/ui-material-progress"` on the Page element_

#### XML

```XML
<Page xmlns:mdp="@nativescript-community/ui-material-progress">
    <StackLayout horizontalAlignment="center">
        <mdp:Progress value="50" maxValue="100"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdprogress {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialProgressModule } from "@nativescript-community/ui-material-progress/angular";

@NgModule({
    imports: [
        NativeScriptMaterialProgressModule,
        ...
    ],
    ...
})
```

```html
<MDProgress v-model="value" maxValue="100"></MDProgress>
```

##

### NativeScript + Vue

```typescript
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue';

Vue.use(ProgressPlugin);
```

```html
<MDProgress value="50" maxValue="100"></MDProgress>
```

## API

### Attributes

Inherite from NativeScript [Progress](https://docs.nativescript.org/ui/components/progress) so it already has all the same attributes.

* **elevation** _optional_

An attribute to set the elevation of the progress. This will increase the 'drop-shadow' of the progress.

* **rippleColor** _optional_

An attribute to set the ripple color of the progress.
