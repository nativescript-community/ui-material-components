import { getFrameById } from 'tns-core-modules/ui/frame/frame';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
const examples = [
    'buttons',
    'textfields',
    'sliders',
    'progress',
    'dialogs'
];

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
            moduleName: 'examples/examplePage',
            context: {
                example: example.title
            },
            animated: true
        };
        const frame = getFrameById('firstFrame');
        frame.navigate(navigationEntry);
    }
}

export function  onTap(args: ItemEventData) {
    console.log('onTap', args);
    const example = this.examples[args.index];
    const navigationEntry = {
        moduleName: 'examples/examplePage',
        context: {
            example: example.title
        },
        animated: true
    };
    const frame = getFrameById('firstFrame');
    frame.navigate(navigationEntry);
}
