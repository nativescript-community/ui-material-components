import { BottomNavigationTabBase } from '../base/bottom-navigation-tab.base';
import { ImageSource } from 'tns-core-modules/image-source/image-source';

export class BottomNavigationTab extends BottomNavigationTabBase {
  getNativeIcon(): UIImage {
    return (this.icon as ImageSource).ios;
  }
}
