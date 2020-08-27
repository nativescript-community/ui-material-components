import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BottomSheetOptions, BottomSheetService } from '@nativescript-community/ui-material-bottomsheet/angular';
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
            context: ['Facebook', 'Google', 'Twitter']
        };

        this.bottomSheet.show(LoginOptionsComponent, options).subscribe(result => {
            console.log('Option selected:', result);
            // We need to wait until the bottom sheet disappears before show an alert or any dialog
            setTimeout(() => alert(`Option selected: ${result}`), 300);
        });
    }
}
