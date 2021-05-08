import * as React from 'react';
import { ItemEventData } from '@nativescript/core';
import { ListView } from 'react-nativescript';
import { Tabs } from './Tabs';
import { BottomNavigation } from './BottomNavigation';

interface MyItem {
    text: string;
    component: () => JSX.Element;
}

const items: MyItem[] = [
    {
        text: 'Tabs',
        component: Tabs
    },
    {
        text: 'BottomNavigation',
        component: BottomNavigation
    }
];

const cellFactory = (item: MyItem) => <label text={item.text} style={{ height: 40, paddingLeft: 16 }} />;

export function AppContainer() {
    const [ExampleComponent, setExampleComponent] = React.useState<() => JSX.Element>(null);
    const onItemTap = (args: ItemEventData) => {
        setExampleComponent(() => items[args.index].component);
    };

    return (
        <frame>
            <page>
                <ListView items={items} cellFactory={cellFactory} onItemTap={onItemTap} />
            </page>
            {ExampleComponent ? (
                <page onNavigatedFrom={() => setExampleComponent(null)}>
                    <ExampleComponent />
                </page>
            ) : null}
        </frame>
    );
}
