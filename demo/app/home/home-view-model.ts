import { Frame, ItemEventData } from '@nativescript/core';
const examples = ['buttons', 'cardview', 'ripple', 'textfields', 'textviews', 'sliders', 'progress', 'activityindicators', 'dialogs', 'bottomsheets', 'mixins', 'snackbar', 'bottomnavigationbar'];

export class ViewModel {
    public examples = examples.map(t => {
        return {
            title: t
        };
    });

    public onTap(args: ItemEventData) {
        // var btn = args.object;
        // var item = btn['bindingContext'];
        console.log('onTap', args);
        const example = this.examples[args.index];
        const navigationEntry = {
            moduleName: 'examples/example-page',
            context: {
                example: example.title
            },
            animated: true
        };
        const frame = Frame.getFrameById('firstFrame');
        frame.navigate(navigationEntry);
    }
    public onTapInsideTemplate(args) {
        console.log('onTapInsideTemplate', args);
        let btn = args.object;
        let item = btn.bindingContext;
        const navigationEntry = {
            moduleName: 'examples/example-page',
            context: {
                example: item.title
            },
            animated: true
        };
        const frame = Frame.getFrameById('firstFrame');
        frame.navigate(navigationEntry);
    }
}

export function  onTapInsideTemplate(args) {
    console.log('onTapInsideTemplate', args);
    let btn = args.object;
    let item = btn.bindingContext;
    const navigationEntry = {
        moduleName: 'examples/example-page',
        context: {
            example: item.title
        },
        animated: true
    };
    const frame = Frame.getFrameById('firstFrame');
    frame.navigate(navigationEntry);
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
