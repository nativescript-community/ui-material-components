import { Observable, PropertyChangeData, Page } from '@nativescript/core';
import { Slider } from '@nativescript-community/ui-material-slider';

export function onNavigatingTo(args) {
    const page: Page = <Page>args.object;
    console.log('slider', 'onNavigatingTo');
    // set up the initial values for the slider components
    const vm = new Observable();
    vm.set('currentValue', 10);
    vm.set('sliderValue', 10);
    vm.set('fontSize', 20);
    vm.set('firstMinValue', 0);
    vm.set('firstMaxValue', 100);
    // handle value change
    vm.on(Observable.propertyChangeEvent, (propertyChangeData: PropertyChangeData) => {
        if (propertyChangeData.propertyName === 'sliderValue') {
            vm.set('currentValue', propertyChangeData.value);
        }
    });
    page.bindingContext = vm;
}
// handle value change
export function onSliderLoaded(args) {
    console.log('onSliderLoaded');
    const sliderComponent: Slider = <Slider>args.object;
    sliderComponent.on('valueChange', sargs => {
        const page = (<Slider>sargs.object).page;
        const vm = page.bindingContext;
        vm.set('fontSize', (<Slider>sargs.object).value);
    });
}
