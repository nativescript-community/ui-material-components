[![npm](https://img.shields.io/npm/v/nativescript-material-button.svg)](https://www.npmjs.com/package/nativescript-material-button)
[![npm](https://img.shields.io/npm/dt/nativescript-material-button.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-button)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

## Installation

If using ```@nativescript``` :
* `tns plugin add nativescript-material-button`

If using ```tns-core-modules```
* `tns plugin add nativescript-material-button@2.5.4`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/buttons.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdb="nativescript-material-button"` on the Page element_

### XML

```XML
<Page xmlns:mdb="nativescript-material-button">
    <StackLayout horizontalAlignment="center">
        <mdb:Button text="raised button"/>
        <mdb:Button variant="flat" text="flat button"/>
        <mdb:Button variant="text" text="text button"/>
        <mdb:Button elevation="5" rippleColor="red" text="raised custom button"/>
   </StackLayout>
</Page>
```

### CSS

```CSS
mdbutton {
    ripple-color: blue;
    elevation: 4;
}
```

## NativeScript + Angular

```typescript
import { NativeScriptMaterialButtonModule } from "nativescript-material-button/angular";

@NgModule({
    imports: [
        NativeScriptMaterialButtonModule,
        ...
    ],
    ...
})
```

```html
<MDButton rippleColor="blue" text="text button"></MDButton>
```

## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import ButtonPlugin from 'nativescript-material-button/vue';

Vue.use(ButtonPlugin);
```

```html
<MDButton rippleColor="blue" text="text button"/>
```

## Attributes

Inherite from Nativescript [Button](https://docs.nativescript.org/ui/ns-ui-widgets/button) so it already has all the same attributes

## Attributes

* **elevation** _optional_

An attribute to set the elevation of the button. This will increase the 'drop-shadow' of the button.

* **variant** _optional_

An attribute to set the variant of the button. Can be ```flat``` or ```text```. No value means raised button

* **rippleColor** _optional_

An attribute to set the ripple color of the button.
