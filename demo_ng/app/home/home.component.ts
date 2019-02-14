import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
    moduleId: module.id,
    selector: 'Home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(private page: Page) {
        // page.actionBarHidden = true;
    }
    ngOnInit() {}
    onTap(command, e) {
        console.log('onTap', command);
    }
    onFocus(command, e) {
        console.log('onFocus', command);
    }
    onBlur(command, e) {
        console.log('onBlur', command);
    }
    returnPress(command, e) {
        console.log('returnPress', command);
        // e.object.blur();
    }
    onTextChange(command, e) {
        console.log('onTextChange', command);
    }
}
