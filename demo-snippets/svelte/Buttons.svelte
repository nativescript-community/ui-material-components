<script lang="ts">
    import { Frame } from '@nativescript/core';
    let isEditing = false;
    function onNavigationButtonTap() {
        Frame.topmost().goBack();
    }
    function onTap(event) {
        console.log('Button tapped', event.object, Date.now());
    }
    function switchExpanded(event) {
        console.log('switchExpanded', this.expanded, event.object.nativeView);

        // wont work after activity reset
        this.expanded = !this.expanded;

        // works after activity reset
        // event.object.expanded = !event.object.expanded;
    }
</script>

<page>
    <actionBar :title="title">
        <stackLayout orientation="horizontal" width="100%">
            <mdbutton v-show="isEditing" variant="flat" text="test" on:tap={() => (isEditing = !isEditing)} />
            <mdbutton text="save" on:tap={() => (isEditing = !isEditing)} />
        </stackLayout>
        <navigationButton text="Back" android.systemIcon="ic_menu_back" on:tap={onNavigationButtonTap} />
    </actionBar>
    <scrollView>
        <stackLayout>
            <mdbutton text="raised button" on:tap={onTap} />
            <mdbutton src="res://ic_action_add" text="button with icon" on:tap={onTap} />
            <mdbutton variant="text" color="red" src="res://ic_action_add" text="button with icon and tint" on:tap={onTap} />
            <mdbutton variant="text" text="text button" on:tap={onTap} />
            <mdbutton variant="flat" text="flat button" on:tap={onTap} />
            <mdbutton variant="outline" text="outline button" on:tap={onTap} />
            <mdbutton borderRadius="10" fontSize="20" text="raised button" on:tap={onTap} />

            <mdbutton fontSize="26" text="mdi-plus" class="mdi" on:tap={onTap} horizontalAlignment="center" />
            <stackLayout margin="10">
                <mdbutton text="default button" on:tap={onTap} />
            </stackLayout>
            <mdbutton class="bg-red" borderRadius="10" color="red" text="text button" variant="text" on:tap={onTap}>
                <formattedString>
                    <span text="Words " color="#00ff00" />
                    <span text="with " color="#ff0000" fontAttributes="Bold" />
                </formattedString>
            </mdbutton>
            <mdbutton class="bg-red" verticalTextAlignment="center" borderRadius="10" color="red" text="text button" variant="text" on:tap={onTap}>
                <span text="mdi-magnify" fontSize="20" class="mdi" />
                <span text=" search" fontAttributes="Bold" />
            </mdbutton>
            <mdbutton text="disabled button" isEnabled="false" on:tap={onTap} />
            <mdbutton text="flat button \n test" variant="flat" class="bg-blue" on:tap={onTap} />
            <mdbutton text="flat transparent button \n test" rippleColor="red" variant="flat" backgroundColor="transparent" on:tap={onTap} />
            <mdbutton text="flat disabled button" variant="flat" isEnabled="false" backgroundColor="yellow" on:tap={onTap} />
            <mdbutton text="outline button" rippleColor="red" color="black" width="200" variant="outline" on:tap={onTap} />
            <mdbutton text="disabled outline button" borderColor="red" borderRadius="2" borderWidth="2" isEnabled="false" width="200" variant="outline" backgroundColor="green" on:tap={onTap} />
            <mdbutton text="text button" width="200" color="green" variant="text" on:tap={onTap} />
            <mdbutton text="text button class" width="200" class="text_class_test" variant="text" on:tap={onTap} />
            <mdbutton text="disabled text button" isEnabled="false" width="200" variant="text" on:tap={onTap} />
            <mdbutton class="falseFAb bg-green" text="+" color="white" verticalAlign="center" backgroundColor="#53ba82" on:tap={onTap} />
            <mdbutton class="falseFAb bg-green" src="res://ic_action_add" on:tap={onTap} />
            <mdbutton backgroundColor="red" text="backgroundColor" isEnabled="false" />
            <mdbutton class="buttontest" text="buttontest" />
            <mdbutton class="buttontest" text="buttontest" isEnabled="false" />
        </stackLayout>
    </scrollView>
</page>

<style scoped>
    .buttontest {
        color: blue;
        background-color: #333;
    }
    .buttontest:disabled {
        color: red;
        background-color: yellow;
    }
    .text_class_test {
        color: red;
        ripple-color: green;
    }
</style>
