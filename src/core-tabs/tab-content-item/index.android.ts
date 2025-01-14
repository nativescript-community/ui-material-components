import { GridLayout, Trace, View } from '@nativescript/core';
import { addGridLayoutRow } from '@nativescript-community/ui-material-core/android/utils';
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
        addGridLayoutRow(layout, 1, org.nativescript.widgets.GridUnitType.star);

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

    private _fragmentMatches(fragment: any) {
        // ensure index AND owner for when 2 tabviews are in the same page
        return fragment.index === this.index && fragment.owner === this.parent;
    }
    private _findFragment(fragmentManager: androidx.fragment.app.FragmentManager) {
        if (!fragmentManager) {
            return null;
        }
        const fragments = fragmentManager.getFragments().toArray();
        for (let i = 0; i < fragments.length; i++) {
            if (fragments[i].index === this.index && fragments[i].owner === this.parent) {
                return fragments[i];
            }
        }
        return null;
    }

    _getChildFragmentManager() {
        const tabView = this.parent as View;
        let tabFragment = null;
        tabFragment = this._findFragment(tabView._getRootFragmentManager()) || this._findFragment(tabView._getFragmentManager());
        if (!tabFragment) {
            Trace.write(`No fragment found for ${tabView} with index ${this.index}`, Trace.categories.Error, Trace.messageType.error);
            return tabView._getFragmentManager();
        }
        return tabFragment.getChildFragmentManager();
    }
}
