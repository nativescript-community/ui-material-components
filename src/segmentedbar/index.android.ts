import { Button } from '@nativescript-community/ui-material-button';
import { selectedIndexProperty } from '@nativescript/core/ui/segmented-bar';
import { itemsProperty } from '@nativescript/core/ui/segmented-bar/segmented-bar-common';
import { SegmentedBarBase } from './index.common';

export class SegmentedBarItem extends Button {
    public variant = 'outline';
    set title(value: string) {
        this.text = value;
    }
}

export class SegmentedBar extends SegmentedBarBase {
    declare nativeViewProtected: com.google.android.material.button.MaterialButtonToggleGroup & { listener: com.google.android.material.button.MaterialButtonToggleGroup.OnButtonCheckedListener };

    public createNativeView() {
        return new com.google.android.material.button.MaterialButtonToggleGroup(this._context);
    }
    listener: com.google.android.material.button.MaterialButtonToggleGroup.OnButtonCheckedListener;
    public initNativeView(): void {
        super.initNativeView();
        const nativeView = this.nativeViewProtected;
        nativeView.setSingleSelection(true);
        const owner = new WeakRef(this);
        const listener = new com.google.android.material.button.MaterialButtonToggleGroup.OnButtonCheckedListener({
            onButtonChecked(toggleButton, checkedId, isChecked) {
                const _owner = owner.get();
                if (_owner) {
                    const button = toggleButton.findViewById(checkedId);
                    const newIndex = toggleButton.indexOfChild(button);
                    if (isChecked && newIndex !== _owner.selectedIndex) {
                        _owner.selectedIndex = newIndex;
                    }
                }
            }
        });
        nativeView.addOnButtonCheckedListener(listener);
        nativeView.listener = listener;
    }

    public disposeNativeView() {
        const nativeView = this.nativeViewProtected;
        if (nativeView?.listener) {
            nativeView.removeOnButtonCheckedListener(nativeView.listener);
            nativeView.listener = null;
        }
        super.disposeNativeView();
    }

    private insertTab(tabItem: SegmentedBarItem, index: number): void {
        const nativeView = this.nativeViewProtected;
        tabItem._setupUI(this._context);
        nativeView.addView(tabItem.nativeTextViewProtected);
    }

    [selectedIndexProperty.getDefault](): number {
        return -1;
    }
    [selectedIndexProperty.setNative](value: number) {
        const button = this.nativeViewProtected.getChildAt(value);
        this.nativeViewProtected.check(button.getId());
    }

    [itemsProperty.getDefault](): SegmentedBarItem[] {
        return null;
    }
    [itemsProperty.setNative](value: SegmentedBarItem[]) {
        this.nativeViewProtected.removeAllViews();

        const newItems = value;
        if (newItems) {
            newItems.forEach((item, i, arr) => this.insertTab(item, i));
        }

        selectedIndexProperty.coerce(this);
    }
}
