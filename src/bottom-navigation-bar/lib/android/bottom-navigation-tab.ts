import { BottomNavigationTabBase } from '../base/bottom-navigation-tab.base';
import { ImageSource } from 'tns-core-modules/image-source';

const { BitmapDrawable } = android.graphics.drawable;

export class BottomNavigationTab extends BottomNavigationTabBase {
  getNativeIcon(): android.graphics.drawable.BitmapDrawable {
    // The icon property always will return an ImageSource
    // but can be setted with a resource string that will be converted
    return new BitmapDrawable((this.icon as ImageSource).android);
  }
}
