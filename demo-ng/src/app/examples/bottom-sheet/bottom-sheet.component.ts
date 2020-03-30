import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BottomSheetOptions, BottomSheetService, BottomSheetDismissEvent } from 'nativescript-material-bottomsheet/angular';
import { LoginOptionsComponent } from './login-options.component';

@Component({
    selector: 'ns-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    moduleId: module.id
})
export class BottomSheetComponent implements OnInit {
    constructor(private bottomSheet: BottomSheetService, private containerRef: ViewContainerRef) {}

    ngOnInit() {}

    showLoginOptions() {
        const options: BottomSheetOptions = {
            viewContainerRef: this.containerRef,
            context: ['Facebook', 'Google', 'Twitter'],

            //When set to true the bottomsheet will emit closing and closed event.
            emitAfterBottomSheetClosed: true
        };

        this.bottomSheet.show(LoginOptionsComponent, options).subscribe((callback: { event: BottomSheetDismissEvent; result: any }) => {
            console.log('Option selected:', callback.result);

            //By checking the event type of the callback there is no longer a need for the setTimeout function
            if (callback.event === BottomSheetDismissEvent.closed) {
                alert(`Option selected: ${callback.result}`);
            }

            // We need to wait until the bottom sheet disappears before show an alert or any dialog
            //setTimeout(() => alert(`Option selected: ${callback.result}`), 300);
        });
    }
}
