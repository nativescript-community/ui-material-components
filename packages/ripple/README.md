[![npm](https://img.shields.io/npm/v/nativescript-material-ripple.svg)](https://www.npmjs.com/package/nativescript-material-ripple)
[![npm](https://img.shields.io/npm/dt/nativescript-material-ripple.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-ripple)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

## Installation

If using ```@nativescript``` :
* `tns plugin add nativescript-material-ripple`

If using ```tns-core-modules```
* `tns plugin add nativescript-material-ripple@2.5.4`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/interaction/states.html#usage)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdr="nativescript-material-ripple"` on the Page element_

### XML

```XML
<Page xmlns:mdr="nativescript-material-ripple">
    <StackLayout horizontalAlignment="center">
        <mdr:Ripple rippleColor="green" width="100" height="100" />
   </StackLayout>
</Page>
```

### CSS

```CSS
mdcripple {
    ripple-color: blue;
}
```

## NativeScript + Angular

```typescript
import { NativeScriptMaterialRippleModule } from "nativescript-material-ripple/angular";

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

## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import RipplePlugin from 'nativescript-material-ripple/vue';

Vue.use(RipplePlugin);
```

```html
<MDRipple rippleColor="green" width="100" height="100"/>
```

## Attributes

Inherite from Nativescript [StackLayout](https://docs.nativescript.org/ui/layouts/layout-containers#stacklayout-properties)

## Attributes

* **rippleColor** _optional_

An attribute to set the ripple color of the ripple.
