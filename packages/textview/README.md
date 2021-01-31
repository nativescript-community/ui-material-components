# NativeScript Material Text view

Material Design's [Text view](https://material.io/develop/android/components/material-text-view) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-textview.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-textview)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-textview.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-textview)

## Installation

### :warning: Warning :warning:
From NativeScript 5.x using this component will break the [NativeScript tab component](https://docs.nativescript.org/ui/components/tabs) on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [material-tabs](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs) (clone of the NativeScript one, but with a little less features).

##

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-textview`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-textview`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-textview@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mdt="@nativescript-community/ui-material-textview"` on the Page element._

#### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-textview">
    <StackLayout horizontalAlignment="center">
        <mdt:TextView text="raised textview"/>
        <mdt:TextView variant="flat" text="flat textview"/>
        <mdt:TextView variant="text" text="text textview"/>
        <mdt:TextView elevation="5" rippleColor="red" text="raised custom textview"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdctextview {
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
import { NativeScriptMaterialTextViewModule } from "@nativescript-community/ui-material-textview/angular";

@NgModule({
    imports: [
        NativeScriptMaterialTextViewModule,
        ...
    ],
    ...
})
```

```html
<MDTextView  helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" (focus)="onFocus($event)" (blur)="onBlur($event)"
        (textChange)="onTextChange($event)"></MDTextView>
```

##

### NativeScript + Vue

```javascript
import TextViewPlugin from '@nativescript-community/ui-material-textview/vue';

Vue.use(TextViewPlugin);
```

```html
<MDTextView helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" @focus="onFocus" @blur="onBlur"
        @textChange="onTextChange"/>
```

Also, you can bind the text to some instance data using the `v-model` directive:

```html
<MDTextView v-model="value" />
```


## Attributes

Inherite from NativeScript [TextView](https://docs.nativescript.org/ui/components/text-view) so it already has all the same attributes.

* **variant** _optional_

An attribute to set the variant of the textview. Can be ```outline``` or ```underline``` or ```filled```. No value means ```underline``` textview

* **errorColor** _optional_

An attribute to set the error color of the textview.

* **helper** _optional_

An attribute to set the helper text of the textview.

* **floating** _optional_

A boolean attribute to set the floating state of the textview.
