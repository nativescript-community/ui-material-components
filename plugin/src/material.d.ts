import { Button } from './button.ios';
import { FloatingActionButton } from './floatingactionbutton.ios';
import { TextField } from './textfield.ios';
import { CardView } from './cardview.ios';


export {Button, FloatingActionButton, TextField, CardView}

declare module "nativescript-material-components" {
    export {Button, FloatingActionButton, TextField, CardView}
}

declare module "nativescript-material-components/material" {
    export {Button, FloatingActionButton, TextField, CardView}
}

declare module 'nativescript-material-components/src/button' {
    export { Button };
}

declare module 'nativescript-material-components/src/floatingactionbutton' {
    export { FloatingActionButton };
}

declare module 'nativescript-material-components/src/textfield' {
    export { TextField };
}
declare module 'nativescript-material-components/src/cardview' {
    export { CardView };
}
