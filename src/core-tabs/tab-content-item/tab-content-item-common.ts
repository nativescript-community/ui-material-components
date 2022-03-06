// Types
import { AddChildFromBuilder, CSSType, ContentView, View, ViewBase } from '@nativescript/core';
import { TabContentItem as TabContentItemDefinition } from '.';

@CSSType('MDTabContentItem')
export abstract class TabContentItemBase extends ContentView implements TabContentItemDefinition, AddChildFromBuilder {
    public index: number;
    public eachChild(callback: (child: View) => boolean) {
        if (this.content) {
            callback(this.content);
        }
    }

    public loadView(view: ViewBase): void {
        // Don't load items until their fragments are instantiated.
        if ((this as TabContentItemDefinition).canBeLoaded) {
            super.loadView(view);
        }
    }
}
