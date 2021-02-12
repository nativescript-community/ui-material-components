<script lang="typescript">
</script>

<style>
    ActionBar {
        background-color: #b52e31;
        color: white;
    }

   
</style>

<page>
    <actionBar title="Svelte Demo" />
    <gridlayout backgroundColor="white">
        <mdspeeddial text="mdi-one-up" buttonClass="mdi">
            <mdspeeddialitem icon="res://ic_action_add" title="test1" backgroundColor="red" />
            <mdspeeddialitem text="mdi-card-account-mail" title="test2" buttonClass="mdi" backgroundColor="green" />
            <mdspeeddialitem backgroundImage="~/images/iu.jpg" backgroundColor="blue" />
            <mdspeeddialitem icon="res://ic_action_add" title="test4" backgroundColor="orange"  />
        </mdspeeddial>
    </gridlayout>
</page>
