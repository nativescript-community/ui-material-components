## FAQ

**Question:** How to use the latest version of this plugin for iOS?

**Answer:** To get latest versions of Material Components for iOS (> 112.1) you will need to change Pod min version to 10.0
To do that modify or create `App_Resources/iOS/Podfile` to add `platform :ios, '10.0'`.
You can see an example in the demo-vue app.

##

**Q:** How to migrate to AndroidX with this plugin installed (Android only)?

**A:** For Material Components to work correctly with {N} 6 and AndroidX you need to update your android app theme.
Inside ```App_resources/android/res/values/styles.xml``` replace all occurences of ```Theme.AppCompat``` with ```Theme.MaterialComponents```
You can see an example in the demo-vue app.

##

**Q:** What is the difference between Bottom Navigation and Bottom Navigation Bar component?

**A:** The _Bottom Navigation Bar_ is a new component to draw a bottom navigation bar in material design.
The _Bottom Navigation_ component is a simple extract of the [eponymous component from NativeScript](https://docs.nativescript.org/ui/components/bottom-navigation), which probably will be removed in the future so this one can be used for easy transition.

##
