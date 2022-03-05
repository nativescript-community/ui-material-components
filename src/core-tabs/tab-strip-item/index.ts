/**
 * @module @nativescript-community/ui-material-core-tabs/tab-strip-item
 */
import { AddChildFromBuilder, CSSType, Color, CoreTypes, Image, Label, PropertyChangeData, PseudoClassHandler, View, ViewBase } from '@nativescript/core';
import { backgroundColorProperty, backgroundInternalProperty } from '@nativescript/core/ui/styling/style-properties';
import { textTransformProperty } from '@nativescript/core/ui/text-base';
import { TabStripItem as TabStripItemDefinition } from '.';
import { TabNavigationBase } from '../tab-navigation-base';
import { TabStrip } from '../tab-strip';

@CSSType('MDTabStripItem')
export class TabStripItem extends View implements TabStripItemDefinition, AddChildFromBuilder {
    public static tapEvent = 'tap';
    public static selectEvent = 'select';
    public static unselectEvent = 'unselect';

    public image: Image;
    public label: Label;
    private mIndex: number;

    private mTitle: string;
    private mIconSource: string;
    private mIconClass: string;

    private mHighlightedHandler: () => void;
    private mNormalHandler: () => void;

    private mLabelColorHandler: (args: PropertyChangeData) => void;
    private mLabelFontHandler: (args: PropertyChangeData) => void;
    private mLabelTextTransformHandler: (args: PropertyChangeData) => void;
    private _labelTextHandler: (args: PropertyChangeData) => void;

    private mImageColorHandler: (args: PropertyChangeData) => void;
    private mImageFontHandler: (args: PropertyChangeData) => void;
    private mImageSrcHandler: (args: PropertyChangeData) => void;

    get index() {
        return this.mIndex;
    }
    set index(value) {
        this.mIndex = value;
    }

    get title() {
        if (this.isLoaded) {
            return this.label.text;
        }

        return this.mTitle;
    }

    set title(value: string) {
        this.mTitle = value;

        if (this.isLoaded) {
            this.label.text = value;
        }
    }

    get iconClass() {
        if (this.isLoaded) {
            return this.image.className;
        }

        return this.mIconClass;
    }

    set iconClass(value: string) {
        this.mIconClass = value;

        if (this.isLoaded) {
            this.image.className = value;
        }
    }

    get iconSource() {
        if (this.isLoaded) {
            return this.image.src;
        }

        return this.mIconSource;
    }

    set iconSource(value: string) {
        this.mIconSource = value;

        if (this.isLoaded) {
            this.image.src = value;
        }
    }

    public onLoaded() {
        if (!this.image) {
            const image = new Image();
            image.src = this.iconSource;
            image.className = this.iconClass;
            this.image = image;
            this._addView(this.image);
        }

        if (!this.label) {
            const label = new Label();
            label.text = this.title;
            this.label = label;
            this._addView(this.label);
        }

        super.onLoaded();

        this.mLabelColorHandler =
            this.mLabelColorHandler ||
            ((args: PropertyChangeData) => {
                const parent = this.parent as TabStrip;
                const tabStripParent = parent && (parent.parent as TabNavigationBase);

                return tabStripParent && tabStripParent.setTabBarItemColor(this, args.value);
            });
        this.label.style.on('colorChange', this.mLabelColorHandler);

        this.mLabelFontHandler =
            this.mLabelFontHandler ||
            ((args: PropertyChangeData) => {
                const parent = this.parent as TabStrip;
                const tabStripParent = parent && (parent.parent as TabNavigationBase);

                return tabStripParent && tabStripParent.setTabBarItemFontInternal(this, args.value);
            });
        this.label.style.on('fontInternalChange', this.mLabelFontHandler);

        this.mLabelTextTransformHandler =
            this.mLabelTextTransformHandler ||
            ((args: PropertyChangeData) => {
                const parent = this.parent as TabStrip;
                const tabStripParent = parent && (parent.parent as TabNavigationBase);

                return tabStripParent && tabStripParent.setTabBarItemTextTransform(this, args.value);
            });
        this.label.style.on('textTransformChange', this.mLabelTextTransformHandler);

        this._labelTextHandler =
            this._labelTextHandler ||
            ((args: PropertyChangeData) => {
                const parent = this.parent as TabStrip;
                const tabStripParent = parent && (parent.parent as TabNavigationBase);

                return tabStripParent && tabStripParent.setTabBarItemTitle(this, args.value);
            });
        this.label.on('textChange', this._labelTextHandler);

        this.mImageColorHandler =
            this.mImageColorHandler ||
            ((args: PropertyChangeData) => {
                const parent = this.parent as TabStrip;
                const tabStripParent = parent && (parent.parent as TabNavigationBase);

                return tabStripParent && tabStripParent.setTabBarIconColor(this, args.value);
            });
        this.image.style.on('colorChange', this.mImageColorHandler);

        this.mImageFontHandler =
            this.mImageFontHandler ||
            ((args: PropertyChangeData) => {
                const parent = this.parent as TabStrip;
                const tabStripParent = parent && (parent.parent as TabNavigationBase);

                return tabStripParent && tabStripParent.setTabBarItemFontInternal(this, args.value);
            });
        this.image.style.on('fontInternalChange', this.mImageFontHandler);

        this.mImageSrcHandler =
            this.mImageSrcHandler ||
            ((args: PropertyChangeData) => {
                const parent = this.parent as TabStrip;
                const tabStripParent = parent && (parent.parent as TabNavigationBase);

                return tabStripParent && tabStripParent.setTabBarIconSource(this, args.value);
            });
        this.image.on('srcChange', this.mImageSrcHandler);
    }

    public onUnloaded() {
        super.onUnloaded();

        this.label.style.off('colorChange', this.mLabelColorHandler);
        this.label.style.off('fontInternalChange', this.mLabelFontHandler);
        this.label.style.off('textTransformChange', this.mLabelTextTransformHandler);
        this.label.style.off('textChange', this._labelTextHandler);

        this.image.style.off('colorChange', this.mImageColorHandler);
        this.image.style.off('fontInternalChange', this.mImageFontHandler);
        this.image.style.off('srcChange', this.mImageSrcHandler);
    }

    public eachChild(callback: (child: ViewBase) => boolean) {
        if (this.label) {
            callback(this.label);
        }

        if (this.image) {
            callback(this.image);
        }
    }

    public _addChildFromBuilder(name: string, value: any): void {
        if (value instanceof Image) {
            this.image = value;
            this.iconSource = value.src;
            this.iconClass = value.className;
            this._addView(value);
            // selectedIndexProperty.coerce(this);
        }

        if (value instanceof Label) {
            this.label = value;
            this.title = value.text;
            this._addView(value);
            // selectedIndexProperty.coerce(this);
        }
    }

    public requestLayout(): void {
        // Default implementation for non View instances (like TabViewItem).
        const parent = this.parent;
        if (parent) {
            parent.requestLayout();
        }
    }

    @PseudoClassHandler('normal', 'highlighted', 'pressed', 'active')
    _updateTabStateChangeHandler(subscribe: boolean) {
        if (subscribe) {
            this.mHighlightedHandler =
                this.mHighlightedHandler ||
                (() => {
                    this._goToVisualState('highlighted');
                });

            this.mNormalHandler =
                this.mNormalHandler ||
                (() => {
                    this._goToVisualState('normal');
                });

            this.on(TabStripItem.selectEvent, this.mHighlightedHandler);
            this.on(TabStripItem.unselectEvent, this.mNormalHandler);

            const parent = this.parent as TabStrip;
            const tabStripParent = parent && (parent.parent as TabNavigationBase);
            if (this.mIndex === tabStripParent.selectedIndex && !(global.isIOS && tabStripParent.cssType.toLowerCase() === 'tabs')) {
                // HACK: tabStripParent instanceof Tabs creates a circular dependency
                // HACK: tabStripParent.cssType === "Tabs" is a hacky workaround
                this._goToVisualState('highlighted');
            }
        } else {
            this.off(TabStripItem.selectEvent, this.mHighlightedHandler);
            this.off(TabStripItem.unselectEvent, this.mNormalHandler);
        }
    }

    [backgroundColorProperty.getDefault](): Color {
        const parent = this.parent as TabStrip;
        const tabStripParent = parent && (parent.parent as TabNavigationBase);

        return tabStripParent && tabStripParent.getTabBarBackgroundColor();
    }
    [backgroundColorProperty.setNative](value: Color) {
        const parent = this.parent as TabStrip;
        const tabStripParent = parent && (parent.parent as TabNavigationBase);

        return tabStripParent && tabStripParent.setTabBarItemBackgroundColor(this, value);
    }

    [textTransformProperty.getDefault](): CoreTypes.TextTransformType {
        const parent = this.parent as TabStrip;
        const tabStripParent = parent && (parent.parent as TabNavigationBase);

        return tabStripParent && tabStripParent.getTabBarItemTextTransform(this);
    }
    [textTransformProperty.setNative](value: CoreTypes.TextTransformType) {
        const parent = this.parent as TabStrip;
        const tabStripParent = parent && (parent.parent as TabNavigationBase);

        return tabStripParent && tabStripParent.setTabBarItemTextTransform(this, value);
    }

    [backgroundInternalProperty.getDefault](): any {
        return null;
    }
    [backgroundInternalProperty.setNative](value: any) {
        // disable the background CSS properties
    }
}
