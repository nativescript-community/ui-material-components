import ImageButton = android.widget.ImageButton;
// declare namespace com {
//     namespace google {
//         namespace android {
//             namespace material {
//                 namespace floatingactionbutton {
//                     class FloatingActionButton extends ImageButton {
//                         setImageResource(resId);
//                     }
//                 }
//             }
//         }
//     }
// }
declare namespace android {
    namespace support {
        namespace design {
            namespace widget {
                class FloatingActionButton extends ImageButton {
                    setImageResource(resId);
                }
            }
        }
    }
}
