# NativeScript Material Slider

Material Design's [Slider](https://material.io/components/sliders) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-slider.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-slider)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-slider.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-slider)

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
* `tns plugin add @nativescript-community/ui-material-slider`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-slider`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-slider@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mds="@nativescript-community/ui-material-slider"` on the Page element._

#### XML

```XML
<Page xmlns:mds="@nativescript-community/ui-material-slider">
    <StackLayout horizontalAlignment="center">
        <mds:Slider value="50" minValue="0" maxValue="100" />
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdslider {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialSliderModule } from "@nativescript-community/ui-material-slider/angular";

@NgModule({
    imports: [
        NativeScriptMaterialSliderModule,
        ...
    ],
    ...
})
```

```html
<MDSlider value="50" minValue="0" maxValue="100"></MDSlider>
```

##

### NativeScript + Vue

```javascript
import SliderPlugin from '@nativescript-community/ui-material-slider/vue';

Vue.use(SliderPlugin);
```

```html
<MDSlider value="50" minValue="0" maxValue="100" @valueChange="onValueChanged"/>
```

Or you can bind the value to some instance data using the `v-model` directive:

```html
<MDSlider v-model="value" minValue="0" maxValue="100"/>
```

## API

### Attributes

Inherite from NativeScript [Slider](https://docs.nativescript.org/ui/ns-ui-widgets/slider) so it already has all the same attributes.

- **stepSize** _optional_
  - An attribute to set the step size of the slider. Without this attribute, it behaves as a **continuous slider**.

- **elevation** _optional_
  - An attribute to set the elevation of the slider. This will increase the 'drop-shadow' of the slider.

- **rippleColor** _optional_
  - An attribute to set the ripple color of the slider.

- **trackFillColor** _optional_
  - Sets the color of the filled track.
  - Defaults to your theme's `colorPrimary`. 

- **trackBackgroundColor** _optional_
  - Sets the color of the background track.

- **thumbColor** _optional_
  - Sets the color of the slider's thumb.
  - Defaults to your theme's `colorPrimary`. 



