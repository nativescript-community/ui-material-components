import { Component } from "@angular/core";

// import { themer } from "./nativescript-material-components/material";


// themer.setPrimaryColor('red');

@Component({
    selector: "ns-app",
    template: `<TabView androidTabsPosition="bottom">

	<page-router-outlet *tabItem="{title: 'Buttons'}" name="btnTab">
	</page-router-outlet>

	<page-router-outlet *tabItem="{title: 'TextFields'}" name="tfTab">
	</page-router-outlet>

</TabView>`
})

export class AppComponent { }
