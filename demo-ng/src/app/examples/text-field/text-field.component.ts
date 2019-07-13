import { Component, OnInit } from '@angular/core';
import { EventData } from 'tns-core-modules/data/observable';

@Component({
    selector: 'ns-text-field',
    templateUrl: './text-field.component.html',
    moduleId: module.id
})
export class TextFieldComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    onBlur($event: EventData) {
        console.log('on blur', $event.eventName);
    }

    returnPress($event: EventData) {
        console.log('returnPress', $event.eventName);
    }

    onTextChange($event: EventData) {
        console.log('onTextChange', $event.eventName);
    }

    onFocus($event: EventData) {
        console.log('onFocus', $event.eventName);
    }
}
