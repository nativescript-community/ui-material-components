import { EventData, Color } from 'tns-core-modules/ui/core/view';

/**
 * CSS Properties
 */
declare module 'tns-core-modules/ui/styling/style' {
  interface Style {
    inactiveColor: Color;
    activeColor: Color;
  }
}

/**
 * Event interface for tab pressed event
 *
 * @export
 * @interface TabPressedEventData
 * @extends {EventData}
 */
export interface TabPressedEventData extends EventData {
  index: number;
}

/**
 * Event interface for tab selected event
 *
 * @export
 * @interface TabSelectedEventData
 * @extends {EventData}
 */
export interface TabSelectedEventData extends EventData {
  oldIndex: number;
  newIndex: number;
}

/**
 * Event interface for tab reselected event
 *
 * @export
 * @interface TabReselectedEventData
 * @extends {EventData}
 */
export interface TabReselectedEventData extends EventData {
  index: number;
}
/**
 * Enum for Title Visibility options
 *
 * @export
 * @enum {number}
 */
export enum TitleVisibility {
  Selected = 0,
  Always = 1,
  Never = 2,
}
