[![npm](https://img.shields.io/npm/v/nativescript-material-cardview.svg)](https://www.npmjs.com/package/nativescript-material-cardview)
[![npm](https://img.shields.io/npm/dt/nativescript-material-cardview.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-cardview)
[![GitHub forks](https://img.shields.io/github/forks/bradmartin/nativescript-material-cardview.svg)](https://github.com/bradmartin/nativescript-material-cardview/network)
[![GitHub stars](https://img.shields.io/github/stars/bradmartin/nativescript-material-cardview.svg)](https://github.com/bradmartin/nativescript-material-cardview/stargazers)

## Installation

* `tns plugin add nativescript-material-cardview`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/cardviews.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdb="nativescript-material-cardview"` on the Page element_

### XML

```XML
<Page xmlns:mdb="nativescript-material-cardview">
    <StackLayout horizontalAlignment="center">
        <mdb:CardView width="100" height="100"/>
        <mdb:CardView elevation="5" rippleColor="red"  width="100" height="100"/>
   </StackLayout>
</Page>
```

### CSS

```CSS
mdccardview {
    ripple-color: blue;
    elevation: 4;
}
```

## NativeScript + Angular

```typescript
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-material-cardview';
registerElement('MDCardView', () => CardView);
```

```html
<MDCardView rippleColor="blue"  width="100" height="100"></MDCCardView>
```

## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
Vue.registerElement('MDCardView', () => require('nativescript-material-cardview').CardView);
```

```html
<MDCardView rippleColor="blue"  width="100" height="100"/>
```

## Attributes

Inherite from Nativescript [Activity Indicator](https://docs.nativescript.org/ui/layouts/layout-containers#stacklayout-properties)

## Attributes

* **elevation** _optional_

An attribute to set the elevation of the cardview. This will increase the 'drop-shadow' of the cardview.

* **rippleColor** _optional_

An attribute to set the ripple color of the cardview.
