import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { ItemEventData } from 'tns-core-modules/ui/list-view';

@Component({
    selector: 'ns-home',
    templateUrl: 'home.component.html',
    moduleId: module.id
})
export class HomeComponent implements OnInit {
    examples = [
        'Activity Indicator', //
        'Buttons',
        'Bottom Sheet',
        'Bottom Navigation Bar',
        'Card View',
        'Ripple',
        'Text Field',
        'Slider',
        'Progress'
    ];

    constructor(private router: RouterExtensions) {}

    ngOnInit() {}

    goToExample({ index }: ItemEventData) {
        const example = this.examples[index].replace(/\s+/g, '-').toLowerCase();
        this.router.navigate([example]);
    }
}
