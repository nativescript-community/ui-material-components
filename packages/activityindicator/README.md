# NativeScript Material Circular progress indicator

Material Design's [Circular progress indicator](https://material.io/design/components/progress-indicators.html#circular-progress-indicators) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-activityindicator.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-activityindicator)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-activityindicator.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-activityindicator)

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
* `tns plugin add @nativescript-community/ui-material-activityindicator`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-activityindicator`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-activityindicator@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mda="@nativescript-community/ui-material-activityindicator"` on the Page element._

#### XML

```XML
<Page xmlns:mda="@nativescript-community/ui-material-activityindicator">
    <StackLayout horizontalAlignment="center">
        <mda:ActivityIndicator busy="true"/>
    </StackLayout>
</Page>
```

#### CSS

```CSS
mdactivityindicator {
    color: #fff;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialActivityIndicatorModule } from "@nativescript-community/ui-material-activityindicator/angular";

@NgModule({
    imports: [
        NativeScriptMaterialActivityIndicatorModule,
        ...
    ],
    ...
})
```

```html
<MDActivityIndicator busy="true"></MDActivityIndicator>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import ActivityIndicatorPlugin from '@nativescript-community/ui-material-activityindicator/vue';

Vue.use(ActivityIndicatorPlugin);
```

```html
<MDActivityIndicator busy="true"/>
```

## API

### Attributes

Inherite from NativeScript [Activity Indicator](https://docs.nativescript.org/ui/ns-ui-widgets/activity-indicator) so it already has all the same attributes
