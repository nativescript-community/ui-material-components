import { Color, SwitchBase, onBackgroundColorProperty } from './index-common';

// TODO: for now iOS uses system switch
export class Switch extends SwitchBase {

  [onBackgroundColorProperty.setNative](value) {
        if (value) {
            this.nativeViewProtected.onTintColor = value instanceof Color ? value.ios : value;
        }
        else {
            this.nativeViewProtected.onTintColor = null;
        }
    }
}
