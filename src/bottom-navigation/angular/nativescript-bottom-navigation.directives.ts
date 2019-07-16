import { Directive } from "@angular/core";

@Directive({
  selector: "BottomNavigation"
})
export class BottomNavigationDirective { }

@Directive({
  selector: "BottomNavigationTab"
})
export class BottomNavigationTabDirective { }

export const DIRECTIVES = [BottomNavigationDirective, BottomNavigationTabDirective];
