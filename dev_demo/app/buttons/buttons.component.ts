import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
	selector: 'buttons',
	templateUrl: 'buttons.component.html'
})

export class ButtonsComponent implements OnInit {

	constructor() { }

	ngOnInit() { }
	onTap(command, e) {
        console.log('onTap', command);
    }
}