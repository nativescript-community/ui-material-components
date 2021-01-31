# NativeScript Material Slider

Material Design's [Slider](https://material.io/components/sliders) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-slider.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-slider)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-slider.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-slider)

## Installation

### :warning: Warning :warning:
From NativeScript 5.x using this component will break the [NativeScript tab component](https://docs.nativescript.org/ui/components/tabs) on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [material-tabs](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs) (clone of the NativeScript one, but with a little less features).

##

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

## Attributes

Inherite from NativeScript [Slider](https://docs.nativescript.org/ui/ns-ui-widgets/slider) so it already has all the same attributes.

* **elevation** _optional_

An attribute to set the elevation of the slider. This will increase the 'drop-shadow' of the slider.

* **rippleColor** _optional_

An attribute to set the ripple color of the slider.
