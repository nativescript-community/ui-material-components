import { Component, OnInit } from '@angular/core';
import { alert, prompt } from 'nativescript-material-dialogs';
import { Color } from 'tns-core-modules/color/color';

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
		prompt({
			title:'alert test',
			message:command,
			okButtonText:'ok',
			// buttonTitleColor:new Color('blue'),
			// buttonInkColor:new Color('red')
	});
    }
}