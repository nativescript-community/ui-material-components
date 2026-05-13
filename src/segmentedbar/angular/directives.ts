import { Directive } from '@angular/core';

@Directive({
    selector: 'SegmentedBar'
})
export class SegmentedBarDirective {}

@Directive({
    selector: 'SegmentedBarItem'
})
export class SegmentedBarItemDirective {}

export const DIRECTIVES = [SegmentedBarDirective, SegmentedBarItemDirective];
