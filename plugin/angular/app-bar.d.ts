import { ActionBarComponent } from 'nativescript-angular/directives/action-bar';
import { ActionItem, NavigationButton } from 'tns-core-modules/ui/action-bar/action-bar';
import { ViewClassMeta } from 'nativescript-angular/element-registry';
export declare function isActionItem(view: any): view is ActionItem;
export declare function isNavigationButton(view: any): view is NavigationButton;
export declare const appBarMeta: ViewClassMeta;
export declare class AppBarComponent extends ActionBarComponent {
}
