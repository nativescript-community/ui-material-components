// Types
import { TabContentItem as TabContentItemDefinition } from '.';
import { TabNavigationBase } from '../tab-navigation-base';
import { GridLayout, Trace, View } from '@nativescript/core';
// Requires
import { TabContentItemBase, traceCategory } from './tab-content-item-common';

export * from './tab-content-item-common';

export class TabContentItem extends TabContentItemBase {
    public nativeViewProtected: org.nativescript.widgets.GridLayout;
    public tabItemSpec: com.nativescript.material.core.TabItemSpec;
    public index: number;

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

    public _getChildFragmentManager(): androidx.fragment.app.FragmentManager {
        const tabView = this.parent as TabNavigationBase;
        let tabFragment = null;
        const fragmentManager = tabView._getFragmentManager();

        if (typeof this.index === 'undefined') {
            Trace.write('Current TabContentItem index is not set', traceCategory, Trace.messageType.error);
        }

        const fragments = fragmentManager.getFragments().toArray();
        for (let i = 0; i < fragments.length; i++) {
            if (fragments[i].index === this.index) {
                tabFragment = fragments[i];
                break;
            }
        }

        // TODO: can happen in a modal tabview scenario when the modal dialog fragment is already removed
        if (!tabFragment) {
            // if (Trace.isEnabled()) {
            //     Trace.write(`Could not get child fragment manager for tab item with index ${this.index}`, traceCategory);
            // }

            // TODO: fix d.ts in view module
            //@ts-ignore
            return tabView._getRootFragmentManager();
        }

        return tabFragment.getChildFragmentManager();
    }
}
