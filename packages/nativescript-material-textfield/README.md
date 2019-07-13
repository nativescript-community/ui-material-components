[![npm](https://img.shields.io/npm/v/nativescript-material-textfield.svg)](https://www.npmjs.com/package/nativescript-material-textfield)
[![npm](https://img.shields.io/npm/dt/nativescript-material-textfield.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-textfield)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

## Installation

* `tns plugin add nativescript-material-textfield`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/text-fields.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdt="nativescript-material-textfield"` on the Page element_

### XML

```XML
<Page xmlns:mdt="nativescript-material-textfield">
    <StackLayout horizontalAlignment="center">
        <mdt:TextField text="raised textfield"/>
        <mdt:TextField variant="flat" text="flat textfield"/>
        <mdt:TextField variant="text" text="text textfield"/>
        <mdt:TextField elevation="5" rippleColor="red" text="raised custom textfield"/>
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
import { NativeScriptMaterialTextFieldModule } from "nativescript-material-textfield/angular";

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

## NativeScript + Vue

```javascript
import TextFieldPlugin from 'nativescript-material-textfield/vue';

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


## Attributes

Inherite from Nativescript [TextField](https://docs.nativescript.org/ui/ns-ui-widgets/text-field) so it already has all the same attributes

## Attributes

* **variant** _optional_

An attribute to set the variant of the textfield. Can be ```outline``` or ```underline``` or ```filled```. No value means ```underline``` textfield

* **errorColor** _optional_

An attribute to set the error color of the textfield.

* **helper** _optional_

An attribute to set the helper text of the textfield.

* **floating** _optional_

A boolean attribute to set the floating state of the textfield.
