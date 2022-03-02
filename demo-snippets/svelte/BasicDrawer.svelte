<script lang="typescript">
    import { Drawer } from '@nativescript-community/ui-drawer';
    let drawer: Drawer;
    function onOpenDrawer() {
        drawer.open();
    }
    function onCloseDrawer() {
        drawer.close();
    }
</script>

<page>
    <actionBar title="Basic Drawer" />
    <drawer bind:this={drawer} class="drawer">
        <gridlayout prop:leftDrawer width="300" backgroundColor="white" rows="auto, *">
            <stacklayout row="0">
                <stacklayout backgroundColor="#eeeeee" padding="25">
                    <gridlayout columns="80, *" height="100">
                        <stacklayout col="0" class="avatar">
                            <label text="JS" />
                        </stacklayout>
                    </gridlayout>
                    <stacklayout>
                        <label text="John Smith" fontWeight="bold" />
                        <label text="john.smith@example.com" />
                    </stacklayout>
                </stacklayout>
                <stacklayout>
                    <button text="My Profile" class="button" on:tap={onCloseDrawer} />
                    <button text="Settings" class="button" on:tap={onCloseDrawer} />
                    <button text="Rate Us" class="button" on:tap={onCloseDrawer} />
                    <button text="Support" class="button" on:tap={onCloseDrawer} />
                    <button text="Contact" class="button" on:tap={onCloseDrawer} />
                </stacklayout>
            </stacklayout>
        </gridlayout>

        <stacklayout prop:mainContent backgroundColor="white">
            <button on:tap={onOpenDrawer} text="Open Drawer" width="250" marginTop="25" />
        </stacklayout>
    </drawer>
</page>

<style>
    ActionBar {
        background-color: #b52e31;
        color: white;
    }
    .avatar {
        background-color: #b52e31;
        border-radius: 40;
        height: 80;
        vertical-align: middle;
    }
    .avatar Label {
        vertical-align: middle;
        horizontal-align: center;
        font-size: 30;
        color: white;
    }
    .drawer .button {
        background-color: transparent;
        margin: 0;
        padding: 0;
        border-color: #ccc;
        z-index: 0;
        border-width: 0 0 0.5 0;
        color: #222222;
        text-align: left;
        padding-left: 25;
        height: 50;
        font-size: 14;
    }
    .drawer .button:highlighted {
        background-color: #eeeeee;
        color: #222222;
    }
    Button {
        background-color: #b52e31;
        color: white;
    }
</style>
