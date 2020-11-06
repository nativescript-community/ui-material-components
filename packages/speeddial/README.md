[![npm](https://img.shields.io/npm/v/nativescript-material-speeddial.svg)](https://www.npmjs.com/package/nativescript-material-speeddial)
[![npm](https://img.shields.io/npm/dt/nativescript-material-speeddial.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-speeddial)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

## Installation

### Warning :warning: :warning: 
From 5.x using material component will break N tab component on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/nativescript-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [tabs](https://www.npmjs.com/package/nativescript-material-tabs) (clone of N one, but with a little less features)

For N 7.0
* `tns plugin add @nativescript-community/ui-material-speeddial`

For N 6.x
* `tns plugin add nativescript-material-speeddial`

If using ```tns-core-modules```
* `tns plugin add nativescript-material-speeddial@2.5.4`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/speeddials.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdf="@nativescript-community/ui-material-speeddial"` on the Page element_

### XML

```XML
<Page xmlns:mdf="@nativescript-community/ui-material-speeddial">
    <StackLayout horizontalAlignment="center">
        <mdf:speeddial src="res://ic_action_add"/>
        <mdf:speeddial elevation="5" src="res://ic_action_add"/>
   </StackLayout>
</Page>
```

### CSS

```CSS
mdcspeeddial {
    ripple-color: blue;
    elevation: 4;
}
```

## NativeScript + Angular

```typescript
import { registerElement } from '@nativescript/angular/element-registry';
import { speeddial } from '@nativescript-community/ui-material-speeddial';
registerElement('MDspeeddial', () => speeddial);
```

```html
<MDspeeddial rippleColor="blue" src="res://ic_action_add"></MDspeeddial>
```

## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import speeddialPlugin from '@nativescript-community/ui-material-speeddial/vue';

Vue.use(speeddialPlugin);
```

```html
<MDspeeddial rippleColor="blue" src="res://ic_action_add"/>
```

## Attributes

Inherite from Nativescript [Button](https://docs.nativescript.org/ui/ns-ui-widgets/button) so it already has all the same attributes

## Attributes

* **src** _optional_

An attribute to set the speeddial icon. For now FAB only support images as icon

* **elevation** _optional_

An attribute to set the elevation of the speeddial. This will increase the 'drop-shadow' of the speeddial.

* **rippleColor** _optional_

An attribute to set the ripple color of the speeddial.
