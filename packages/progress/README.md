[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-progress.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-progress.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)

## Installation

### Warning :warning: :warning: 
From 5.x using material component will break N tab component on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/nativescript-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [tabs](https://www.npmjs.com/package/nativescript-material-tabs) (clone of N one, but with a little less features)

For N 7.0
* `tns plugin add @nativescript-community/ui-material-progress`

For N 6.x
* `tns plugin add nativescript-material-progress`

If using ```tns-core-modules```
* `tns plugin add nativescript-material-progress@2.5.4`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/progresss.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdp="@nativescript-community/ui-material-progress"` on the Page element_

### XML

```XML
<Page xmlns:mdp="@nativescript-community/ui-material-progress">
    <StackLayout horizontalAlignment="center">
        <mdp:Progress value="50" maxValue="100"/>
   </StackLayout>
</Page>
```

### CSS

```CSS
mdprogress {
    ripple-color: blue;
    elevation: 4;
}
```

## NativeScript + Angular

```typescript
import { NativeScriptMaterialProgressModule } from "@nativescript-community/ui-material-progress/angular";

@NgModule({
    imports: [
        NativeScriptMaterialProgressModule,
        ...
    ],
    ...
})
```

```html
<MDProgress v-model="value" maxValue="100"></MDProgress>
```

## NativeScript + Vue

```typescript
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue';

Vue.use(ProgressPlugin);
```

```html
<MDProgress value="50" maxValue="100"></MDProgress>
```

## Attributes

Inherite from Nativescript [Progress](https://docs.nativescript.org/ui/ns-ui-widgets/progress) so it already has all the same attributes

## Attributes

* **elevation** _optional_

An attribute to set the elevation of the progress. This will increase the 'drop-shadow' of the progress.

* **rippleColor** _optional_

An attribute to set the ripple color of the progress.
