# NativeScript Material Speed dial

Material Design's [Speed dial](https://material.io/components/buttons-floating-action-button#types-of-transitions) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-speeddial.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-speeddial)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-speeddial.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-speeddial)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)

## Installation

```bash
ns plugin add @nativescript-community/ui-material-speeddial
```

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### NativeScript + Vue

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
