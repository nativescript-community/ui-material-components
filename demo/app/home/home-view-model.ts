import { getFrameById } from 'tns-core-modules/ui/frame/frame';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
const examples = ['buttons', 'cardview', 'ripple', 'textfields', 'sliders', 'progress', 'activityindicators', 'dialogs', 'bottomsheets', 'mixins', 'snackbar'];

export class ViewModel {
    public examples = examples.map(t => {
        return {
            title: t
        };
    });

    public onTap(args: ItemEventData) {
        // var btn = args.object;
        // var item = btn['bindingContext'];
        // console.log('onTap', btn, );
        const example = this.examples[args.index];
        const navigationEntry = {
            moduleName: 'examples/example-page',
            context: {
                example: example.title
            },
            animated: true
        };
        const frame = getFrameById('firstFrame');
        frame.navigate(navigationEntry);
    }
    onTapInsideTemplate(args) {
        let btn = args.object;
        let item = btn.bindingContext;
        const navigationEntry = {
            moduleName: 'examples/example-page',
            context: {
                example: item.title
            },
            animated: true
        };
        const frame = getFrameById('firstFrame');
        frame.navigate(navigationEntry);
    }
}

// export function onTap(args: ItemEventData) {
//     console.log('onTap', args);
//     const example = this.examples[args.index];
//     const navigationEntry = {
//         moduleName: 'examples/example-page',
//         context: {
//             example: example.title
//         },
//         animated: true
//     };
//     const frame = getFrameById('firstFrame');
//     frame.navigate(navigationEntry);
// }
