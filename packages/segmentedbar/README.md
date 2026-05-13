# NativeScript Material SegmentedBar

Material Design's [SegmentedBar](https://github.com/material-components/material-components-android/blob/master/docs/components/ToggleButtonGroup.md) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-segmentedbar.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-segmentedbar)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-segmentedbar.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-segmentedbar)

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
* `tns plugin add @nativescript-community/ui-material-segmentedbar`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-segmentedbar`

##


Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mds="@nativescript-community/ui-material-segmentedbar"` on the Page element._

#### XML

```XML
<Page xmlns:mds="@nativescript-community/ui-material-segmentedbar">
    <SegmentedBar>
      <SegmentedBarItem title="First" />
      <SegmentedBarItem title="Second" />
      <SegmentedBarItem title="Third" />
    </SegmentedBar>
</Page>
```

#### CSS

```CSS
mdsegmentedbar {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialSegmentedBarModule } from "@nativescript-community/ui-material-segmentedbar/angular";

@NgModule({
    imports: [
        NativeScriptMaterialSegmentedBarModule,
        ...
    ],
    ...
})
```

```html
<SegmentedBar>
  <SegmentedBarItem title="First" />
  <SegmentedBarItem title="Second" />
  <SegmentedBarItem title="Third" />
</SegmentedBar>
```

##

### NativeScript + Vue

```javascript
import SegmentedBarPlugin from '@nativescript-community/ui-material-segmentedbar/vue';

Vue.use(SegmentedBarPlugin);
```

```html
<SMDegmentedBar>
  <MDSegmentedBarItem title="First" />
  <MDSegmentedBarItem title="Second" />
  <MDSegmentedBarItem title="Third" />
</MDSegmentedBar>
```

### API

`SegmentedBarItem` on Android inherits `MDButton` so you can use any prop of `MDButton` like `variant`

