import { Component } from '@angular/core';
import { ActionBarComponent } from 'nativescript-angular/directives/action-bar';
import { ActionBar, ActionItem, ActionItems, NavigationButton } from 'tns-core-modules/ui/action-bar/action-bar';
import { isInvisibleNode, isView, NgView, ViewClassMeta, ViewExtensions } from 'nativescript-angular/element-registry';

export function isActionItem(view: any): view is ActionItem {
    return view instanceof ActionItem;
}

export function isNavigationButton(view: any): view is NavigationButton {
    return view instanceof NavigationButton;
}

type NgActionBar = ActionBar & ViewExtensions;

export const appBarMeta: ViewClassMeta = {
    skipAddToDom: true,
    insertChild: (parent: NgActionBar, child: NgView, next: any) => {
        if (isInvisibleNode(child)) {
            return;
        } else if (isNavigationButton(child)) {
            parent.navigationButton = child;
            child.parentNode = parent;
        } else if (isActionItem(child)) {
            addActionItem(parent, child, next);
            child.parentNode = parent;
        } else if (isView(child)) {
            parent.titleView = child;
        }
    },
    removeChild: (parent: NgActionBar, child: NgView) => {
        if (isInvisibleNode(child)) {
            return;
        } else if (isNavigationButton(child)) {
            if (parent.navigationButton === child) {
                parent.navigationButton = null;
            }

            child.parentNode = null;
        } else if (isActionItem(child)) {
            parent.actionItems.removeItem(child);
            child.parentNode = null;
        } else if (isView(child) && parent.titleView && parent.titleView === child) {
            parent.titleView = null;
        }
    }
};

const addActionItem = (bar: NgActionBar, item: ActionItem, next: ActionItem) => {
    if (next) {
        insertActionItemBefore(bar, item, next);
    } else {
        appendActionItem(bar, item);
    }
};

const insertActionItemBefore = (bar: NgActionBar, item: ActionItem, next: ActionItem) => {
    const actionItems: ActionItems = bar.actionItems;
    const actionItemsCollection: ActionItem[] = actionItems.getItems();

    const indexToInsert = actionItemsCollection.indexOf(next);
    actionItemsCollection.splice(indexToInsert, 0, item);

    (actionItems as any).setItems(actionItemsCollection);
};

const appendActionItem = (bar: NgActionBar, item: ActionItem) => {
    bar.actionItems.addItem(item);
};

@Component({
    selector: 'AppBar',
    template: '<ng-content></ng-content>'
})
export class AppBarComponent extends ActionBarComponent {
    // constructor(public element: ElementRef, private page: Page) {
    //     if (!this.page) {
    //         throw new Error("Inside ActionBarComponent but no Page found in DI.");
    //     }
    //     if (isBlank(this.page.actionBarHidden)) {
    //         this.page.actionBarHidden = false;
    //     }
    //     this.page.actionBar = this.element.nativeElement;
    //     this.page.actionBar.update();
    // }
}
