[![npm](https://img.shields.io/npm/v/nativescript-material-floatingactionbutton.svg)](https://www.npmjs.com/package/nativescript-material-floatingactionbutton)
[![npm](https://img.shields.io/npm/dt/nativescript-material-floatingactionbutton.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-floatingactionbutton)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

## Installation

* `tns plugin add nativescript-material-floatingactionbutton`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/floatingactionbuttons.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdf="nativescript-material-floatingactionbutton"` on the Page element_

### XML

```XML
<Page xmlns:mdf="nativescript-material-floatingactionbutton">
    <StackLayout horizontalAlignment="center">
        <mdf:FloatingActionButton src="res://ic_action_add"/>
        <mdf:FloatingActionButton elevation="5" src="res://ic_action_add"/>
   </StackLayout>
</Page>
```

### CSS

```CSS
mdcfloatingactionbutton {
    ripple-color: blue;
    elevation: 4;
}
```

## NativeScript + Angular

```typescript
import { registerElement } from 'nativescript-angular/element-registry';
import { FloatingActionButton } from 'nativescript-material-floatingactionbutton';
registerElement('MDFloatingActionButton', () => FloatingActionButton);
```

```html
<MDFloatingActionButton rippleColor="blue" src="res://ic_action_add"></MDFloatingActionButton>
```

## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import FloatingActionButtonPlugin from 'nativescript-material-floatingactionbutton/vue';

Vue.use(FloatingActionButtonPlugin);
```

```html
<MDFloatingActionButton rippleColor="blue" src="res://ic_action_add"/>
```

## Attributes

Inherite from Nativescript [Activity Indicator](https://docs.nativescript.org/ui/ns-ui-widgets/button) so it already has all the same attributes

## Attributes

* **src** _optional_

An attribute to set the floatingactionbutton icon. For now FAB only support images as icon

* **elevation** _optional_

An attribute to set the elevation of the floatingactionbutton. This will increase the 'drop-shadow' of the floatingactionbutton.

* **rippleColor** _optional_

An attribute to set the ripple color of the floatingactionbutton.
