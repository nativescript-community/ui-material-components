# NativeScript Material Bottom sheet

Material Design's [Bottom sheet](https://material.io/components/sheets-bottom) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-bottomsheet.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomsheet)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-bottomsheet.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomsheet)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-bottomsheet`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-bottomsheet`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-bottomsheet@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## API

```ts
export interface BottomSheetOptions {
    view: string | ViewBase; 
    // View instance to be shown in bottom sheet. Or the name of the module to load starting from the application root.
    context?: any; 
    // Any context you want to pass to the view shown in bottom sheet. This same context will be available in the arguments of the shownInBottomSheet event handler.
    animated?: boolean; 
    // An optional parameter specifying whether to show the sheet view with animation.
    dismissOnBackgroundTap?: boolean; 
    // An optional parameter specifying whether to dismiss the sheet when clicking on background.
    dismissOnDraggingDownSheet?: boolean; 
    // An optional parameter specifying whether to disable dragging the sheet to dismiss.
    dismissOnBackButton?: boolean; 
    // An optional parameter that specifies whether to close the sheet when pressing the back button.
    closeCallback?: Function; 
    //  A function that will be called when the view is closed. Any arguments provided when calling shownInBottomSheet.closeCallback will be available here.
    trackingScrollView?: string; 
    // optional id of the scroll view to track
    transparent?: boolean; 
    // optional parameter to make the bottomsheet transparent
    ignoreTopSafeArea?: boolean; 
    // optional ios parameter to top safe area. Default is true
    ignoreBottomSafeArea?: boolean; 
    // optional ios parameter to bottom safe area. Default is false
    disableDimBackground?: boolean; 
    // optional parameter to remove the dim background
    skipCollapsedState?: boolean; 
    // optional Android parameter to skip midway state when view is greater than 50%. Default is false
    peekHeight?: number; 
    // optional parameter to set the collapsed sheet height. To work on iOS you need to set trackingScrollView. Also ensure the scrollView is taking the full height of the bottomsheet content. Otherwise the "full" height wont be computed correctly
    ignoreKeyboardHeight?: boolean; 
    //(iOS only) A Boolean value that controls whether the height of the keyboard should affect the bottom sheet's frame when the keyboard shows on the screen. (Default: true)
    onChangeState?: onChangeStateBottomSheet; 
    // One works to be called on the scroll of the sheet. Parameters: state (CLOSED, DRAGGING, DRAGGING, COLLAPSED) and slideOffset is the new offset of this bottom sheet within [-1,1] range. Offset increases as this bottom sheet is moving upward. From 0 to 1 the sheet is between collapsed and expanded states and from -1 to 0 it is between hidden and collapsed states.
}
```

## Usage

### Plain NativeScript

We need to do some wiring when your app starts, so open `app.js` and add this before creating any View/App/Frame:

#### JavaScript
```js
var material = require("@nativescript-community/ui-material-bottomsheet");

material.install();
```

#### TypeScript
```ts
import { install } from "@nativescript-community/ui-material-bottomsheet";
install();
```

Uses the same kind of API as [NativeScript Modals](https://docs.nativescript.org/ui/modal-view).

#### TS

```typescript
const modalViewModulets = "ns-ui-category/modal-view/basics/modal-ts-view-page";
export function openBottomSheet(args) {
    const mainView: Button = <Button>args.object;
    const context = { username: "test_username", password: "test" };
    const fullscreen = true;
    mainView.showBottomSheet({
        view: modalViewModulets,
        context,
        closeCallback: (username, password) => {
            bottom-sheet
            alert(`Username: ${username} : Password: ${password}`);
        },
        fullscreen
    });
}

```

##

### NativeScript + Vue
```typescript
import Vue from 'nativescript-vue';
import BottomSheetPlugin from '@nativescript-community/ui-material-bottomsheet/vue';
import { install } from "@nativescript-community/ui-material-bottomsheet";
install();

Vue.use(BottomSheetPlugin);
```
Then you can show a Vue component:
```typescript 
import MyComponent from 'MyComponent.vue';

//inside another Vue component
const options: BottomSheetOptions = {
};
this.$showBottomSheet(MyComponent, options)
```

##

### NativeScript + Angular
First you need to include the `NativeScriptMaterialBottomSheetModule` in your `app.module.ts`

```typescript
import { NativeScriptMaterialBottomSheetModule} from "@nativescript-community/ui-material-bottomsheet/angular";

@NgModule({
    imports: [
        // This will call the install method and inject a global service called BottomSheetService
        NativeScriptMaterialBottomSheetModule.forRoot()
    ],
    ...
})
```
now you can show your custom BottomSheet using the `BottomSheetService`, this service follows the same implementation as the `ModalService`

#### ItemComponent
```typescript
import { Component,  ViewContainerRef } from '@angular/core';
import { BottomSheetOptions, BottomSheetService } from '@nativescript-community/ui-material-bottomsheet/angular';
import { ShareOptionsComponent } from './share-options.component';

@Component({
    selector: 'ns-item',
    templateUrl: './item.component.html',
    moduleId: module.id
})
export class ItemComponent {
    constructor(
        private bottomSheet: BottomSheetService, 
        private containerRef: ViewContainerRef,
    ) {}

    showOptions() {
        const options: BottomSheetOptions = {
            viewContainerRef: this.containerRef,
            context: ['Facebook', 'Google', 'Twitter']
        };

        this.bottomSheet.show(ShareOptionsComponent, options).subscribe(result => {
            console.log('Option selected:', result);
        });
    }
}
```
#### ShareOptionsComponent
```html
<ListView
    [items]="options"
    (itemTap)="onTap($event)"
    separatorColor="white"
    class="list-group"
    height="200"
>
    <ng-template let-option="item">
        <Label
            class="list-group-item"
            [text]="option"
        ></Label>
    </ng-template>
</ListView>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { BottomSheetParams } from '@nativescript-community/ui-material-bottomsheet/angular';
import { ItemEventData } from '@nativescript/core/ui/list-view';

@Component({
    selector: 'ns-share-options',
    templateUrl: 'share-options.component.html'
})
export class ShareOptionsComponent implements OnInit {
    options: string[];
    
    // The BottomSheetService injects the BottomSheetParams to the component
    // so you can get the context and call the closeCallback method from the component displayed in your BottomSheet
    constructor(private params: BottomSheetParams) {}

    ngOnInit() {
        this.options = this.params.context;
    }

    onTap({ index }: ItemEventData) {
        this.params.closeCallback(this.options[index]);
    }
}
```
