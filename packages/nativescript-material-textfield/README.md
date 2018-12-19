[![npm](https://img.shields.io/npm/v/nativescript-material-textfield.svg)](https://www.npmjs.com/package/nativescript-material-textfield)
[![npm](https://img.shields.io/npm/dt/nativescript-material-textfield.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-textfield)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

## Installation

* `tns plugin add nativescript-material-textfield`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/textfields.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdb="nativescript-material-textfield"` on the Page element_

### XML

```XML
<Page xmlns:mdb="nativescript-material-textfield">
    <StackLayout horizontalAlignment="center">
        <mdb:TextField text="raised textfield"/>
        <mdb:TextField variant="flat" text="flat textfield"/>
        <mdb:TextField variant="text" text="text textfield"/>
        <mdb:TextField elevation="5" rippleColor="red" text="raised custom textfield"/>
   </StackLayout>
</Page>
```

### CSS

```CSS
mdctextfield {
    ripple-color: blue;
    elevation: 4;
}
```

## NativeScript + Angular

```typescript
import { registerElement } from 'nativescript-angular/element-registry';
import { TextField } from 'nativescript-material-textfield';
registerElement('MDTextField', () => TextField);
```

```html
<MDTextField  helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" (focus)="onFocus($event)" (blur)="onBlur($event)"
        (textChange)="onTextChange($event)"></MDTextField>
```

## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
Vue.registerElement('MDTextField', () => require('nativescript-material-textfield').TextField);
```

```html
<MDTextField helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" @focus="onFocus" @blur="onBlur"
        @textChange="onTextChange"/>
```

## Attributes

Inherite from Nativescript [Activity Indicator](https://docs.nativescript.org/ui/ns-ui-widgets/text-field) so it already has all the same attributes

## Attributes

* **variant** _optional_

An attribute to set the variant of the textfield. Can be ```outline``` or ```underline``` or ```filled```. No value means ```underline``` textfield

* **errorColor** _optional_

An attribute to set the error color of the textfield.

* **helper** _optional_

An attribute to set the helper text of the textfield.

* **floating** _optional_

A boolean attribute to set the floating state of the textfield.