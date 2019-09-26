import { EventData, Color } from 'tns-core-modules/ui/core/view';
declare module 'tns-core-modules/ui/styling/style' {
    interface Style {
        inactiveColor: Color;
        activeColor: Color;
    }
}
export interface TabPressedEventData extends EventData {
    index: number;
}
export interface TabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export interface TabReselectedEventData extends EventData {
    index: number;
}
export declare enum TitleVisibility {
    Selected = 0,
    Always = 1,
    Never = 2
}
