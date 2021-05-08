import * as React from 'react';

export function ExampleBottomNavigation() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <bottomNavigation
            selectedIndex={selectedIndex}
            onSelectedIndexChanged={(args) => {
                setSelectedIndex(args.newIndex);
            }}
            style={{ backgroundColor: 'orange' }}
        >
            {/* The bottomTab UI is created via tabStrip (the container) and tabStripItem (for each tab) */}
            <tabStrip nodeRole="tabStrip" style={{ backgroundColor: 'red' }}>
                <tabStripItem nodeRole="items">
                    <label nodeRole="label">Home</label>
                    <image nodeRole="image" src="font://&#xf015;" className="fas" />
                </tabStripItem>
                <tabStripItem nodeRole="items">
                    <label nodeRole="label">Account</label>
                    <image nodeRole="image" src="font://&#xf007;" className="fas" />
                </tabStripItem>
                <tabStripItem nodeRole="items">
                    <label nodeRole="label">Search</label>
                    <image nodeRole="image" src="font://&#xf00e;" className="fas" />
                </tabStripItem>
            </tabStrip>

            {/* The number of tabContentItem components should corespond to the number of TabStripItem components */}
            <tabContentItem nodeRole="items">
                <gridLayout style={{ backgroundColor: 'blue' }}>
                    <label style={{ color: 'white' }}>Home Page</label>
                </gridLayout>
            </tabContentItem>
            <tabContentItem nodeRole="items">
                <gridLayout style={{ backgroundColor: 'cyan' }}>
                    <label style={{ color: 'black' }}>Account Page</label>
                </gridLayout>
            </tabContentItem>
            <tabContentItem nodeRole="items">
                <gridLayout style={{ backgroundColor: 'magenta' }}>
                    <label style={{ color: 'black' }}>Search Page</label>
                </gridLayout>
            </tabContentItem>
        </bottomNavigation>
    );
}
