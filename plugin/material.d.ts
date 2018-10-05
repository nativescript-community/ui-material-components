import { Button } from './button';
import { FloatingActionButton } from './floatingactionbutton';
import { TextField } from './textfield';
import { CardView } from './cardview';
import { AppBar } from './appbar';


export {Button, FloatingActionButton, TextField, CardView, AppBar}

declare module "nativescript-material-components" {
    export {Button, FloatingActionButton, TextField, CardView, AppBar}
}

declare module "nativescript-material-components/material" {
    export {Button, FloatingActionButton, TextField, CardView, AppBar}
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
declare module 'nativescript-material-components/src/appbar' {
    export { AppBar };
}


export var themer;