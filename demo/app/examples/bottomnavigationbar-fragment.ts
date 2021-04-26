import { BottomNavigationBar, TabPressedEventData, TabReselectedEventData, TabSelectedEventData } from '@nativescript-community/ui-material-bottomnavigationbar';
import { EventData } from '@nativescript/core';

export function onbottomNavigationBarLoaded(args: EventData): void {
    const bottomNavigationBar = args.object as BottomNavigationBar;
    bottomNavigationBar.showBadge(1);
    bottomNavigationBar.showBadge(2, 4);
}

export function onBottomNavigationTabPressed(args: TabPressedEventData): void {
    alert('This tab has isSelectable: false, and should be used to perform actions');
    console.log(`pressed tab index:  ${args.index}`);
}

export function onBottomNavigationTabSelected(args: TabSelectedEventData): void {
    console.log(`old tab index:  ${args.oldIndex}`);
    console.log(`selected tab index:  ${args.newIndex}`);
}

export function onBottomNavigationTabReselected(args: TabReselectedEventData): void {
    alert('Tab Reselected');
    console.log(`reselected tab index:  ${args.index}`);
}
