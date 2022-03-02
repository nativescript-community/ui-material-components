import { Component, ElementRef, ViewChild } from '@angular/core';
import { BottomNavigationBar, TabPressedEventData, TabReselectedEventData, TabSelectedEventData } from '@nativescript-community/ui-material-bottomnavigationbar';

@Component({
    moduleId: module.id,
    selector: 'ns-bottom-navigation-bar',
    templateUrl: './bottom-navigation-bar.component.html'
})
export class BottomNavigationBarComponent {
    @ViewChild('bottomNavigationBar', { read: ElementRef, static: false })
    private _bottomNavigationBar: ElementRef<BottomNavigationBar>;

    onbottomNavigationBarLoaded(): void {
        const bottomNavigationBar = this._bottomNavigationBar.nativeElement;
        bottomNavigationBar.showBadge(1);
        bottomNavigationBar.showBadge(2, 4);
    }

    onBottomNavigationTabPressed(args: TabPressedEventData): void {
        alert('This tab has isSelectable: false, and should be used to perform actions');
        console.log(`pressed tab index:  ${args.index}`);
    }

    onBottomNavigationTabSelected(args: TabSelectedEventData): void {
        console.log(`old tab index:  ${args.oldIndex}`);
        console.log(`selected tab index:  ${args.newIndex}`);
    }

    onBottomNavigationTabReselected(args: TabReselectedEventData): void {
        alert('Tab Reselected');
        console.log(`reselected tab index:  ${args.index}`);
    }
}
