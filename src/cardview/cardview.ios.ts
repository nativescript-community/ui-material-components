import { CardViewBase, borderRadiusProperty, borderColorProperty, borderWidthProperty, interactableProperty } from './cardview-common';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { Color, Length } from 'tns-core-modules/ui/page/page';
import { getRippleColor, themer } from 'nativescript-material-core';
import { backgroundColorProperty, backgroundInternalProperty } from 'tns-core-modules/ui/core/view/view';

export class CardView extends CardViewBase {
    nativeViewProtected: MDCCard;

    public createNativeView() {
        const view = MDCCard.new();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCCardsColorThemer.applySemanticColorSchemeToCard(colorScheme, view);
        }
        return view;
    }
    _setNativeClipToBounds() {
        // this.ios.clipsToBounds = true;
    }

    [backgroundColorProperty.setNative](value: Color) {
        this.nativeView.backgroundColor = value !== undefined ? value.ios : new Color('#FFFFFF').ios;
    }

    [backgroundColorProperty.getDefault]() {
        return this.nativeView.backgroundColor;
    }

    [backgroundInternalProperty.setNative](value) {
        this.nativeView.backgroundColor = new Color(value.color !== undefined ? value.color + '' : '#FFFFFF').ios;
    }

    [backgroundInternalProperty.getDefault]() {
        return this.nativeView.backgroundColor;
    }

    [borderColorProperty.setNative](value: Color) {
        this.nativeView.setBorderColorForState(value !== undefined ? value.ios : new Color('#FFFFFF').ios, UIControlState.Normal);
    }

    [borderColorProperty.getDefault](): Color {
        return this.nativeView.borderColorForState(UIControlState.Normal);
    }

    [borderRadiusProperty.setNative](value: number) {
        this.nativeViewProtected.cornerRadius = value;
    }

    [borderRadiusProperty.getDefault](): number {
        return this.nativeViewProtected.cornerRadius;
    }

    [borderWidthProperty.setNative](value: number) {
        this.nativeView.setBorderWidthForState(value, UIControlState.Normal);
    }

    [borderWidthProperty.getDefault](): number {
        return this.nativeView.borderWidthForState(UIControlState.Normal);
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setShadowElevationForState(value * 2, UIControlState.Highlighted);
    }

    [elevationProperty.getDefault]() {
        return this.nativeView.shadowElevationForState(UIControlState.Normal);
    }

    [interactableProperty.setNative](value: boolean) {
        this.nativeView.interactable = value;
    }

    [interactableProperty.getDefault](): boolean {
        return this.nativeView.interactable;
    }

    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkView.inkColor = getRippleColor(color);
    }

    [rippleColorProperty.getDefault]() {
        return this.nativeViewProtected.inkView.inkColor;
    }
}
