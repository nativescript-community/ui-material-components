# NativeScript Material Text field

Material Design's [Text field](https://material.io/components/text-fields) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-textfield.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-textfield)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-textfield.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-textfield)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-textfield`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-textfield`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-textfield@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mdt="@nativescript-community/ui-material-textfield"` on the Page element._

#### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-textfield">
    <StackLayout horizontalAlignment="center">
        <mdt:TextField text="raised textfield"/>
        <mdt:TextField variant="flat" text="flat textfield"/>
        <mdt:TextField variant="text" text="text textfield"/>
        <mdt:TextField elevation="5" rippleColor="red" text="raised custom textfield"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdtextfield {
    ripple-color: blue;
    elevation: 4;
    stroke-color: blue;             /* the border color when active */
    stroke-inactive-color: green;   /* the border color when inactive */
    floating-color: blue;           /* the floating placeholder color when active */
    floating-inactive-color: green; /* the floating placeholder color when inactive */
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialTextFieldModule } from "@nativescript-community/ui-material-textfield/angular";

@NgModule({
    imports: [
        NativeScriptMaterialTextFieldModule,
        ...
    ],
    ...
})
```

```html
<MDTextField  helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" (focus)="onFocus($event)" (blur)="onBlur($event)"
        (textChange)="onTextChange($event)"></MDTextField>
```

##

### NativeScript + Vue

```javascript
import TextFieldPlugin from '@nativescript-community/ui-material-textfield/vue';

Vue.use(TextFieldPlugin);
```

```html
<MDTextField helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" @focus="onFocus" @blur="onBlur"
        @textChange="onTextChange"/>
```

Also, you can bind the text to some instance data using the `v-model` directive:

```html
<MDTextField v-model="value" />
```

## API

### Attributes

Inherite from NativeScript [TextField](https://docs.nativescript.org/ui/components/text-field) so it already has all the same attributes.

* **variant** _optional_

An attribute to set the variant of the textfield. Can be ```outline``` or ```underline``` or ```filled```. No value means ```underline``` textfield

* **errorColor** _optional_

An attribute to set the error color of the textfield.

* **helper** _optional_

An attribute to set the helper text of the textfield.

* **floating** _optional_

A boolean attribute to set the floating state of the textfield.
