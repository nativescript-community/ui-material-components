# NativeScript Material Linear progress indicator

Material Design's [Linear progress indicator](https://material.io/components/progress-indicators#linear-progress-indicators) component for Nativescript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-progress.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-progress.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)

## Installation

### :warning: Warning :warning:
From Nativescript 5.x using this component will break the [Nativescript tab component](https://docs.nativescript.org/ui/components/tabs) on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [material-tabs](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs) (clone of the Nativescript one, but with a little less features).

For N 7.0
* `tns plugin add @nativescript-community/ui-material-progress`

For N 6.x
* `tns plugin add nativescript-material-progress`

If using ```tns-core-modules```
* `tns plugin add nativescript-material-progress@2.5.4`

Be sure to run a new build after adding plugins to avoid any issues.

## Usage


### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdp="@nativescript-community/ui-material-progress"` on the Page element_

#### XML

```XML
<Page xmlns:mdp="@nativescript-community/ui-material-progress">
    <StackLayout horizontalAlignment="center">
        <mdp:Progress value="50" maxValue="100"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdprogress {
    ripple-color: blue;
    elevation: 4;
}
```

### NativeScript + Angular

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

### NativeScript + Vue

```typescript
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue';

Vue.use(ProgressPlugin);
```

```html
<MDProgress value="50" maxValue="100"></MDProgress>
```

## Attributes

Inherite from Nativescript [Progress](https://docs.nativescript.org/ui/ns-ui-widgets/progress) so it already has all the same attributes

* **elevation** _optional_

An attribute to set the elevation of the progress. This will increase the 'drop-shadow' of the progress.

* **rippleColor** _optional_

An attribute to set the ripple color of the progress.
