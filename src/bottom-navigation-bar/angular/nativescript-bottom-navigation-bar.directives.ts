import { Directive } from '@angular/core';

@Directive({
  selector: 'BottomNavigationBar',
})
export class BottomNavigationBarDirective {}

@Directive({
  selector: 'BottomNavigationTab',
})
export class BottomNavigationTabDirective {}

export const DIRECTIVES = [
  BottomNavigationBarDirective,
  BottomNavigationTabDirective,
];
