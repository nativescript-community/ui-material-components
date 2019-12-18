
declare class SnackbarMessage extends MDCSnackbarMessage {

	static alloc(): SnackbarMessage; // inherited from NSObject

	static messageWithAttributedText(attributedText: NSAttributedString): SnackbarMessage; // inherited from MDCSnackbarMessage

	static messageWithText(text: string): SnackbarMessage; // inherited from MDCSnackbarMessage

	static new(): SnackbarMessage; // inherited from NSObject
}

declare class SnackbarMessageView extends MDCSnackbarMessageView {

	static alloc(): SnackbarMessageView; // inherited from NSObject

	static appearance(): SnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): SnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): SnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): SnackbarMessageView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SnackbarMessageView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): SnackbarMessageView; // inherited from UIAppearance

	static new(): SnackbarMessageView; // inherited from NSObject
}
