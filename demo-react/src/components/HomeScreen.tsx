import * as React from 'react';
import { StyleSheet } from 'react-nativescript';

export function ExampleTabs() {
    return (
        <tabs selectedIndex={1}>
            {/* The bottomTab UI is created via tabStrip (the container) and tabStripItem (for each tab) */}
            <tabStrip>
                <tabStripItem>
                    <label>Home</label>
                    <image src="font://&#xf015;" className="fas" />
                </tabStripItem>
                <tabStripItem className="special">
                    <label>Account</label>
                    <image src="font://&#xf007;" className="fas" />
                </tabStripItem>
                <tabStripItem className="special">
                    <label>Search</label>
                    <image src="font://&#xf00e;" className="fas" />
                </tabStripItem>
            </tabStrip>

            {/* The number of tabContentItem components should corespond to the number of TabStripItem components */}
            <tabContentItem>
                <gridLayout>
                    <label className="h2 text-center">Home Page</label>
                </gridLayout>
            </tabContentItem>
            <tabContentItem>
                <gridLayout>
                    <label className="h2 text-center">Account Page</label>
                </gridLayout>
            </tabContentItem>
            <tabContentItem>
                <gridLayout>
                    <label className="h2 text-center">Search Page</label>
                </gridLayout>
            </tabContentItem>
        </tabs>
    );
}

const styles = StyleSheet.create({
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
