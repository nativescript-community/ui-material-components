import { Color } from 'tns-core-modules/color/color';

// Classes shortcuts
const { ColorStateList } = android.content.res;

export function createColorStateList(activeColor: Color, inactiveColor: Color) {
  const stateChecked = Array.create('int', 1);
  stateChecked[0] = android.R.attr.state_checked;
  const stateUnChecked = Array.create('int', 0);

  const states = java.lang.reflect.Array.newInstance(
    stateChecked.getClass() || stateUnChecked.getClass(),
    2,
  );
  states[0] = stateChecked;
  states[1] = stateUnChecked;

  const colors = Array.create('int', 2);
  colors[0] = activeColor.android;
  colors[1] = inactiveColor.android;

  return new ColorStateList(states, colors);
}
