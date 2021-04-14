import { Observable, Page, PropertyChangeData } from '@nativescript/core';
import { Progress } from '@nativescript-community/ui-material-progress';

export function onNavigatingTo(args) {
    console.log('progress', 'onNavigatingTo');
    const page: Page = <Page>args.object;
    // set up the initial values for the progress components
    const vm = new Observable();
    vm.set('progressValue', 10);
    vm.set('progressMaxValue', 100);
    setInterval(() => {
        const value = vm.get('progressValue');
        vm.set('progressValue', value + 2);
    }, 300);
    page.bindingContext = vm;
}
// handle value change
export function onProgressLoaded(args) {
    const sliderComponent: Progress = <Progress>args.object;
    sliderComponent.on('valueChange', (pargs: PropertyChangeData) => {
        console.log(`Old Value: ${pargs.oldValue}`);
        console.log(`New Value: ${pargs.value}`);
    });
}
