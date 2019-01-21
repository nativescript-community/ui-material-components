[![npm](https://img.shields.io/npm/v/nativescript-material-progress.svg)](https://www.npmjs.com/package/nativescript-material-progress)
[![npm](https://img.shields.io/npm/dt/nativescript-material-progress.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-progress)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

## Installation

* `tns plugin add nativescript-material-progress`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/progresss.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdp="nativescript-material-progress"` on the Page element_

### XML

```XML
<Page xmlns:mdp="nativescript-material-progress">
    <StackLayout horizontalAlignment="center">
        <mdp:Progress value="50" maxValue="100"/>
   </StackLayout>
</Page>
```

### CSS

```CSS
mdcprogress {
    ripple-color: blue;
    elevation: 4;
}
```

## NativeScript + Angular

```typescript
import ProgressPlugin from 'nativescript-material-progress/vue';

Vue.use(ProgressPlugin);
```

```html
<MDProgress value="50" maxValue="100"></MDProgress>
```

## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
Vue.registerElement('MDProgress', () => require('nativescript-material-progress').Progress);
```

```html
<MDProgress value="50" maxValue="100"/>
```

## Attributes

Inherite from Nativescript [Activity Indicator](https://docs.nativescript.org/ui/ns-ui-widgets/progress) so it already has all the same attributes

## Attributes

* **elevation** _optional_

An attribute to set the elevation of the progress. This will increase the 'drop-shadow' of the progress.

* **rippleColor** _optional_

An attribute to set the ripple color of the progress.
