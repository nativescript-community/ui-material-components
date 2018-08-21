import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
	selector: 'textfields',
	templateUrl: 'textfields.component.html'
})

export class TextfieldsComponent implements OnInit {
	textField
	constructor() { }

	ngOnInit() { }
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