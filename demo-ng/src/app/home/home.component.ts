import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { ItemEventData } from 'tns-core-modules/ui/list-view';

@Component({
    selector: 'ns-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    examples = ['Buttons', 'Card View', 'Bottom Sheet', 'Ripple', 'Text Fields', 'Sliders', 'Progress', 'Activity Indicators', 'Dialogs', 'Mixins'];

    constructor(private router: RouterExtensions) {}

    ngOnInit() {}

    goToExample({ index }: ItemEventData) {
        const example = this.examples[index].replace(/\s+/g, '-').toLowerCase();
        this.router.navigate([example]);
    }
}
