# NativeScript Material Speed dial

Material Design's [Speed dial](https://material.io/components/buttons-floating-action-button#types-of-transitions) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-speeddial.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-speeddial)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-speeddial.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-speeddial)

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

### Usage


## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import speeddialPlugin from '@nativescript-community/ui-material-speeddial/vue';

Vue.use(speeddialPlugin);
```

```html
<MDSpeedDial buttonFontSize="26" text="mdi-one-up"  buttonClass="mdi" buttonBackgroundColor="yellow" @tap="onTap">
    <MDSpeedDialItem icon="res://ic_action_add" title="test1" backgroundColor="red"  @tap="onTap"/>
    <MDSpeedDialItem text="mdi-card-account-mail" title="test2" buttonClass="mdi" backgroundColor="green"  @tap="onTap"/>
    <MDSpeedDialItem backgroundImage="~/images/iu.jpg"  backgroundColor="blue"  @tap="onTap"/>
    <MDSpeedDialItem icon="res://ic_action_add" title="test4" backgroundColor="orange" @tap="onTap"/>
</MDSpeedDial>
```
