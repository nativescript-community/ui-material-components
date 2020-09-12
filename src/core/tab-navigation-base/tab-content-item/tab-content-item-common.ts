// Types
import { AddChildFromBuilder, CSSType, ContentView, View, ViewBase } from '@nativescript/core';
import { TabContentItem as TabContentItemDefinition } from '.';
import { TabNavigationBase } from '../tab-navigation-base';

export const traceCategory = 'TabView';

@CSSType('TabContentItem')
export abstract class TabContentItemBase extends ContentView implements TabContentItemDefinition, AddChildFromBuilder {
    public eachChild(callback: (child: View) => boolean) {
        if (this.content) {
            callback(this.content);
        }
    }

    public loadView(view: ViewBase): void {
        const tabView = this.parent as TabNavigationBase;
        if (tabView && tabView.items) {
            // Don't load items until their fragments are instantiated.
            if ((this as TabContentItemDefinition).canBeLoaded) {
                super.loadView(view);
            }
        }
    }
}
