import * as React from 'react';
import { StyleSheet } from 'react-nativescript';

export function ExampleTabs() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <tabs
            selectedIndex={selectedIndex}
            onSelectedIndexChanged={(args) => {
                console.log('onSelectedIndexChanged', args);
                // setSelectedIndex(args.newIndex);
            }}
            style={{ ...styles.fullSize }}
        >
            {/* The bottomTab UI is created via tabStrip (the container) and tabStripItem (for each tab) */}
            <tabStrip nodeRole="tabStrip">
                <tabStripItem>
                    <label nodeRole="label">Home</label>
                    <image nodeRole="image" src="font://&#xf015;" className="fas" />
                </tabStripItem>
                <tabStripItem className="special">
                    <label nodeRole="label">Account</label>
                    <image nodeRole="image" src="font://&#xf007;" className="fas" />
                </tabStripItem>
                <tabStripItem className="special">
                    <label nodeRole="label">Search</label>
                    <image nodeRole="image" src="font://&#xf00e;" className="fas" />
                </tabStripItem>
            </tabStrip>

            {/* The number of tabContentItem components should corespond to the number of TabStripItem components */}
            <tabContentItem nodeRole="items">
                <gridLayout>
                    <label nodeRole="label" className="h2 text-center">
                        Home Page
                    </label>
                </gridLayout>
            </tabContentItem>
            <tabContentItem nodeRole="items">
                <gridLayout>
                    <label nodeRole="label" className="h2 text-center">
                        Account Page
                    </label>
                </gridLayout>
            </tabContentItem>
            <tabContentItem nodeRole="items">
                <gridLayout>
                    <label nodeRole="label" className="h2 text-center">
                        Search Page
                    </label>
                </gridLayout>
            </tabContentItem>
        </tabs>
    );
}

const styles = StyleSheet.create({
    fullSize: {
        height: '100%',
        width: '100%'
    },
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    text: {
        textAlignment: 'center',
        fontSize: 24,
        color: 'black'
    },
    button: {
        fontSize: 24,
        color: '#2e6ddf'
    }
});
