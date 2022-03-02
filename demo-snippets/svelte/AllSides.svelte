<script lang="typescript">
    import { Drawer } from '@nativescript-community/ui-drawer';
    let drawer: Drawer;
    function onOpenDrawer(side) {
        drawer.open(side);
    }
</script>

<page>
    <actionBar title="All Sides">
        <navigationButton text="Go back" />
    </actionBar>
    <stackLayout>
        <drawer bind:this={drawer} class="drawer">
            <gridlayout prop:leftDrawer width="65%" backgroundColor="white" padding="25">
                <label text="Left Drawer" verticalAlignment="top" />
            </gridlayout>

            <gridlayout prop:rightDrawer width="65%" backgroundColor="white" padding="25">
                <label text="Right Drawer" verticalAlignment="top" />
            </gridlayout>

            <gridlayout prop:topDrawer height="65%" backgroundColor="white" padding="25">
                <label text="Top Drawer" verticalAlignment="top" />
            </gridlayout>

            <gridlayout prop:bottomDrawer height="65%" backgroundColor="white" padding="25">
                <label text="Bottom Drawer" verticalAlignment="top" />
            </gridlayout>

            <stacklayout prop:mainContent backgroundColor="white">
                <button on:tap={() => onOpenDrawer('left')} text="Open Left Drawer" width="250" marginTop="25" />
                <button on:tap={() => onOpenDrawer('right')} text="Open Right Drawer" width="250" marginTop="25" />
                <button on:tap={() => onOpenDrawer('top')} text="Open Top Drawer" width="250" marginTop="25" />
                <button on:tap={() => onOpenDrawer('bottom')} text="Open Bottom Drawer" width="250" marginTop="25" />
            </stacklayout>
        </drawer>
    </stackLayout>
</page>

<style>
</style>
