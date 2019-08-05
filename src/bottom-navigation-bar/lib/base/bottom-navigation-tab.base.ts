import {
  View,
  Property,
  booleanConverter,
} from 'tns-core-modules/ui/core/view';
import {
  ImageSource,
  fromFileOrResource,
  fromResource,
  fromFile,
} from 'tns-core-modules/image-source';

interface BottomNavigationTabProps {
  title: string;
  icon: string | ImageSource;
  isSelectable?: boolean;
}

export abstract class BottomNavigationTabBase extends View
  implements BottomNavigationTabProps {
  title: string;
  icon: string | ImageSource;
  isSelectable?: boolean;

  constructor(args?: BottomNavigationTabProps) {
    super();
    if (!args) {
      return;
    }
    console.log('tab args', args);
    for (const k in args) {
      if (args.hasOwnProperty(k)) {
        this[k] = args[k];
      }
    }
  }

  abstract getNativeIcon(): any;
}

export const isSelectableProperty = new Property<
  BottomNavigationTabBase,
  boolean
>({
  name: 'isSelectable',
  defaultValue: true,
  valueConverter: booleanConverter,
});

isSelectableProperty.register(BottomNavigationTabBase);

export const iconProperty = new Property<BottomNavigationTabBase, ImageSource>({
  name: 'icon',
  affectsLayout: true,
  valueConverter: fromFileOrResource,
});

iconProperty.register(BottomNavigationTabBase);
