# NativeScript Material Floating Action Button

Material Design's [Floating Action Button](https://material.io/components/buttons-floating-action-button) component for Nativescript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-floatingactionbutton.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-floatingactionbutton.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton)

## Installation

### Warning :warning: :warning: 
From 5.x using material component will break N tab component on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/nativescript-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [tabs](https://www.npmjs.com/package/nativescript-material-tabs) (clone of N one, but with a little less features)

For N 7.0
* `tns plugin add @nativescript-community/ui-material-floatingactionbutton`

For N 6.x
* `tns plugin add nativescript-material-floatingactionbutton`

If using ```tns-core-modules```
* `tns plugin add nativescript-material-floatingactionbutton@2.5.4`

Be sure to run a new build after adding plugins to avoid any issues.

## Usage


### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdf="@nativescript-community/ui-material-floatingactionbutton"` on the Page element_

#### XML

```XML
<Page xmlns:mdf="@nativescript-community/ui-material-floatingactionbutton">
    <StackLayout horizontalAlignment="center">
        <mdf:FloatingActionButton src="res://ic_action_add"/>
        <mdf:FloatingActionButton elevation="5" src="res://ic_action_add"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdcfloatingactionbutton {
    ripple-color: blue;
    elevation: 4;
}
```

### NativeScript + Angular

```typescript
import { registerElement } from '@nativescript/angular/element-registry';
import { FloatingActionButton } from '@nativescript-community/ui-material-floatingactionbutton';
registerElement('MDFloatingActionButton', () => FloatingActionButton);
```

```html
<MDFloatingActionButton rippleColor="blue" src="res://ic_action_add"></MDFloatingActionButton>
```

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue';

Vue.use(FloatingActionButtonPlugin);
```

```html
<MDFloatingActionButton rippleColor="blue" src="res://ic_action_add"/>
```

## Attributes

Inherite from Nativescript [Button](https://docs.nativescript.org/ui/ns-ui-widgets/button) so it already has all the same attributes

* **src** _optional_

An attribute to set the floatingactionbutton icon. For now FAB only support images as icon

* **elevation** _optional_

An attribute to set the elevation of the floatingactionbutton. This will increase the 'drop-shadow' of the floatingactionbutton.

* **rippleColor** _optional_

An attribute to set the ripple color of the floatingactionbutton.
