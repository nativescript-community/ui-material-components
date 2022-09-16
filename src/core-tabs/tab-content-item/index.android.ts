import { GridLayout, View } from '@nativescript/core';
import { TabContentItem as TabContentItemDefinition } from '.';
import { TabContentItemBase } from './tab-content-item-common';

export * from './tab-content-item-common';

export class TabContentItem extends TabContentItemBase {
    public nativeViewProtected: org.nativescript.widgets.GridLayout;
    public tabItemSpec: com.nativescript.material.core.TabItemSpec;

    get _hasFragments(): boolean {
        return true;
    }

    public createNativeView() {
        const layout = new org.nativescript.widgets.GridLayout(this._context);
        layout.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.star));

        return layout;
    }

    public initNativeView(): void {
        super.initNativeView();
    }

    public _addViewToNativeVisualTree(child: View, atIndex?: number): boolean {
        // Set the row property for the child
        if (this.nativeViewProtected && child.nativeViewProtected) {
            GridLayout.setRow(child, 0);
        }

        return super._addViewToNativeVisualTree(child, atIndex);
    }

    public disposeNativeView(): void {
        super.disposeNativeView();
        (this as TabContentItemDefinition).canBeLoaded = false;
    }

    _getChildFragmentManager() {
        const tabView = this.parent as View;
        let tabFragment = null;
        const fragmentManager = tabView._getFragmentManager();
        const fragments = fragmentManager.getFragments().toArray();
        for (let i = 0; i < fragments.length; i++) {
            // ensure index AND owner for when 2 tabviews are in the same page
            if (fragments[i].index === this.index && fragments[i].owner === tabView) {
                tabFragment = fragments[i];
                break;
            }
        }
        if (!tabFragment) {
            return tabView._getRootFragmentManager();
        }
        return tabFragment.getChildFragmentManager();
    }
}
