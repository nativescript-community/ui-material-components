
declare const enum MDCActionEmphasis {

	Low = 0,

	Medium = 1,

	High = 2
}

declare class MDCActivityIndicator extends UIView {

	static alloc(): MDCActivityIndicator; // inherited from NSObject

	static appearance(): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCActivityIndicator; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCActivityIndicator; // inherited from UIAppearance

	static new(): MDCActivityIndicator; // inherited from NSObject

	animating: boolean;

	cycleColors: NSArray<UIColor>;

	delegate: MDCActivityIndicatorDelegate;

	indicatorMode: MDCActivityIndicatorMode;

	progress: number;

	radius: number;

	strokeWidth: number;

	trackEnabled: boolean;

	traitCollectionDidChangeBlock: (p1: MDCActivityIndicator, p2: UITraitCollection) => void;

	setIndicatorModeAnimated(mode: MDCActivityIndicatorMode, animated: boolean): void;

	setProgressAnimated(progress: number, animated: boolean): void;

	startAnimating(): void;

	startAnimatingWithTransitionCycleStartIndex(startTransition: MDCActivityIndicatorTransition, cycleStartIndex: number): void;

	stopAnimating(): void;

	stopAnimatingWithTransition(stopTransition: MDCActivityIndicatorTransition): void;
}

interface MDCActivityIndicatorDelegate extends NSObjectProtocol {

	activityIndicatorAnimationDidFinish?(activityIndicator: MDCActivityIndicator): void;

	activityIndicatorModeTransitionDidFinish?(activityIndicator: MDCActivityIndicator): void;
}
declare var MDCActivityIndicatorDelegate: {

	prototype: MDCActivityIndicatorDelegate;
};

declare const enum MDCActivityIndicatorMode {

	Indeterminate = 0,

	Determinate = 1
}

declare class MDCActivityIndicatorTransition extends NSObject {

	static alloc(): MDCActivityIndicatorTransition; // inherited from NSObject

	static new(): MDCActivityIndicatorTransition; // inherited from NSObject

	animation: (p1: number, p2: number) => void;

	completion: () => void;

	duration: number;

	constructor(o: { animation: (p1: number, p2: number) => void; });

	initWithAnimation(animation: (p1: number, p2: number) => void): this;
}

declare class MDCAlertAction extends NSObject implements NSCopying, UIAccessibilityIdentification {

	static actionWithTitleEmphasisHandler(title: string, emphasis: MDCActionEmphasis, handler: (p1: MDCAlertAction) => void): MDCAlertAction;

	static actionWithTitleHandler(title: string, handler: (p1: MDCAlertAction) => void): MDCAlertAction;

	static alloc(): MDCAlertAction; // inherited from NSObject

	static new(): MDCAlertAction; // inherited from NSObject

	readonly emphasis: MDCActionEmphasis;

	readonly title: string;

	accessibilityIdentifier: string; // inherited from UIAccessibilityIdentification

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCAlertColorThemer extends NSObject {

	static alloc(): MDCAlertColorThemer; // inherited from NSObject

	static applyColorScheme(colorScheme: MDCColorScheme): void;

	static applySemanticColorSchemeToAlertController(colorScheme: MDCColorScheming, alertController: MDCAlertController): void;

	static new(): MDCAlertColorThemer; // inherited from NSObject
}

declare class MDCAlertController extends UIViewController implements MDCElevatable, MDCElevationOverriding, UIContentSizeCategoryAdjusting {

	static alertControllerWithTitleMessage(title: string, message: string): MDCAlertController;

	static alloc(): MDCAlertController; // inherited from NSObject

	static new(): MDCAlertController; // inherited from NSObject

	accessoryView: UIView;

	readonly actions: NSArray<MDCAlertAction>;

	adjustsFontForContentSizeCategoryWhenScaledFontIsUnavailable: boolean;

	backgroundColor: UIColor;

	buttonFont: UIFont;

	buttonInkColor: UIColor;

	buttonTitleColor: UIColor;

	cornerRadius: number;

	elevation: number;

	enableRippleBehavior: boolean;

	mdc_adjustsFontForContentSizeCategory: boolean;

	message: string;

	messageAccessibilityLabel: string;

	messageColor: UIColor;

	messageFont: UIFont;

	scrimColor: UIColor;

	shadowColor: UIColor;

	titleAccessibilityLabel: string;

	titleAlignment: NSTextAlignment;

	titleColor: UIColor;

	titleFont: UIFont;

	titleIcon: UIImage;

	titleIconTintColor: UIColor;

	traitCollectionDidChangeBlock: (p1: MDCAlertController, p2: UITraitCollection) => void;

	adjustsFontForContentSizeCategory: boolean; // inherited from UIContentSizeCategoryAdjusting

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	addAction(action: MDCAlertAction): void;

	buttonForAction(action: MDCAlertAction): MDCButton;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setAccessoryViewNeedsLayout(): void;
}

declare class MDCAlertControllerView extends UIView {

	static alloc(): MDCAlertControllerView; // inherited from NSObject

	static appearance(): MDCAlertControllerView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCAlertControllerView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCAlertControllerView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCAlertControllerView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCAlertControllerView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCAlertControllerView; // inherited from UIAppearance

	static new(): MDCAlertControllerView; // inherited from NSObject

	buttonColor: UIColor;

	buttonFont: UIFont;

	buttonInkColor: UIColor;

	cornerRadius: number;

	enableRippleBehavior: boolean;

	mdc_adjustsFontForContentSizeCategory: boolean;

	messageColor: UIColor;

	messageFont: UIFont;

	titleAlignment: NSTextAlignment;

	titleColor: UIColor;

	titleFont: UIFont;

	titleIcon: UIImage;

	titleIconTintColor: UIColor;
}

declare const enum MDCAnimationTimingFunction {

	Standard = 0,

	Deceleration = 1,

	Acceleration = 2,

	Sharp = 3,

	EaseInOut = 0,

	EaseOut = 1,

	EaseIn = 2,

	Translate = 0,

	TranslateOnScreen = 1,

	TranslateOffScreen = 2,

	FadeIn = 1,

	FadeOut = 2
}

declare class MDCBasicColorScheme extends NSObject implements MDCColorScheme, NSCopying {

	static alloc(): MDCBasicColorScheme; // inherited from NSObject

	static new(): MDCBasicColorScheme; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly primaryColor: UIColor; // inherited from MDCColorScheme

	readonly primaryDarkColor: UIColor; // inherited from MDCColorScheme

	readonly primaryLightColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryDarkColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryLightColor: UIColor; // inherited from MDCColorScheme

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { primaryColor: UIColor; });

	constructor(o: { primaryColor: UIColor; primaryLightColor: UIColor; primaryDarkColor: UIColor; });

	constructor(o: { primaryColor: UIColor; primaryLightColor: UIColor; primaryDarkColor: UIColor; secondaryColor: UIColor; secondaryLightColor: UIColor; secondaryDarkColor: UIColor; });

	constructor(o: { primaryColor: UIColor; secondaryColor: UIColor; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithPrimaryColor(primaryColor: UIColor): this;

	initWithPrimaryColorPrimaryLightColorPrimaryDarkColor(primaryColor: UIColor, primaryLightColor: UIColor, primaryDarkColor: UIColor): this;

	initWithPrimaryColorPrimaryLightColorPrimaryDarkColorSecondaryColorSecondaryLightColorSecondaryDarkColor(primaryColor: UIColor, primaryLightColor: UIColor, primaryDarkColor: UIColor, secondaryColor: UIColor, secondaryLightColor: UIColor, secondaryDarkColor: UIColor): this;

	initWithPrimaryColorSecondaryColor(primaryColor: UIColor, secondaryColor: UIColor): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCBasicFontScheme extends NSObject implements MDCFontScheme {

	static alloc(): MDCBasicFontScheme; // inherited from NSObject

	static new(): MDCBasicFontScheme; // inherited from NSObject

	body1: UIFont;

	body2: UIFont;

	button: UIFont;

	caption: UIFont;

	headline1: UIFont;

	headline2: UIFont;

	headline3: UIFont;

	headline4: UIFont;

	headline5: UIFont;

	headline6: UIFont;

	overline: UIFont;

	subtitle1: UIFont;

	subtitle2: UIFont;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCBottomNavigationBar extends UIView implements MDCElevatable, MDCElevationOverriding {

	static alloc(): MDCBottomNavigationBar; // inherited from NSObject

	static appearance(): MDCBottomNavigationBar; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCBottomNavigationBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCBottomNavigationBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCBottomNavigationBar; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCBottomNavigationBar; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCBottomNavigationBar; // inherited from UIAppearance

	static new(): MDCBottomNavigationBar; // inherited from NSObject

	alignment: MDCBottomNavigationBarAlignment;

	backgroundBlurEffectStyle: UIBlurEffectStyle;

	backgroundBlurEnabled: boolean;

	readonly barItemsBottomAnchor: NSLayoutYAxisAnchor;

	barTintColor: UIColor;

	delegate: MDCBottomNavigationBarDelegate;

	elevation: number;

	enableRippleBehavior: boolean;

	itemBadgeBackgroundColor: UIColor;

	itemBadgeTextColor: UIColor;

	itemTitleFont: UIFont;

	items: NSArray<UITabBarItem>;

	itemsContentHorizontalMargin: number;

	itemsContentVerticalMargin: number;

	selectedItem: UITabBarItem;

	selectedItemTintColor: UIColor;

	selectedItemTitleColor: UIColor;

	shadowColor: UIColor;

	sizeThatFitsIncludesSafeArea: boolean;

	titleVisibility: MDCBottomNavigationBarTitleVisibility;

	titlesNumberOfLines: number;

	traitCollectionDidChangeBlock: (p1: MDCBottomNavigationBar, p2: UITraitCollection) => void;

	truncatesLongTitles: boolean;

	unselectedItemTintColor: UIColor;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	viewForItem(item: UITabBarItem): UIView;
}

declare const enum MDCBottomNavigationBarAlignment {

	Justified = 0,

	JustifiedAdjacentTitles = 1,

	Centered = 2
}

declare class MDCBottomNavigationBarColorThemer extends NSObject {

	static alloc(): MDCBottomNavigationBarColorThemer; // inherited from NSObject

	static applyColorSchemeToBottomNavigationBar(colorScheme: MDCColorScheme, bottomNavigationBar: MDCBottomNavigationBar): void;

	static applySemanticColorSchemeToBottomNavigation(colorScheme: MDCColorScheming, bottomNavigation: MDCBottomNavigationBar): void;

	static new(): MDCBottomNavigationBarColorThemer; // inherited from NSObject
}

interface MDCBottomNavigationBarDelegate extends UINavigationBarDelegate {

	bottomNavigationBarDidSelectItem?(bottomNavigationBar: MDCBottomNavigationBar, item: UITabBarItem): void;

	bottomNavigationBarShouldSelectItem?(bottomNavigationBar: MDCBottomNavigationBar, item: UITabBarItem): boolean;
}
declare var MDCBottomNavigationBarDelegate: {

	prototype: MDCBottomNavigationBarDelegate;
};

declare const enum MDCBottomNavigationBarTitleVisibility {

	Selected = 0,

	Always = 1,

	Never = 2
}

declare class MDCBottomSheetController extends UIViewController implements MDCElevatable, MDCElevationOverriding {

	static alloc(): MDCBottomSheetController; // inherited from NSObject

	static new(): MDCBottomSheetController; // inherited from NSObject

	readonly contentViewController: UIViewController;

	delegate: MDCBottomSheetControllerDelegate;

	dismissOnBackgroundTap: boolean;

	dismissOnDraggingDownSheet: boolean;

	elevation: number;

	isScrimAccessibilityElement: boolean;

	scrimAccessibilityHint: string;

	scrimAccessibilityLabel: string;

	scrimAccessibilityTraits: number;

	scrimColor: UIColor;

	shouldFlashScrollIndicatorsOnAppearance: boolean;

	readonly state: MDCSheetState;

	trackingScrollView: UIScrollView;

	traitCollectionDidChangeBlock: (p1: MDCBottomSheetController, p2: UITraitCollection) => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { contentViewController: UIViewController; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithContentViewController(contentViewController: UIViewController): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setShapeGeneratorForState(shapeGenerator: MDCShapeGenerating, state: MDCSheetState): void;

	shapeGeneratorForState(state: MDCSheetState): MDCShapeGenerating;
}

interface MDCBottomSheetControllerDelegate extends NSObjectProtocol {

	bottomSheetControllerDidChangeYOffsetYOffset?(controller: MDCBottomSheetController, yOffset: number): void;

	bottomSheetControllerDidDismissBottomSheet?(controller: MDCBottomSheetController): void;

	bottomSheetControllerStateChangedState?(controller: MDCBottomSheetController, state: MDCSheetState): void;
}
declare var MDCBottomSheetControllerDelegate: {

	prototype: MDCBottomSheetControllerDelegate;
};

declare class MDCBottomSheetPresentationController extends UIPresentationController {

	static alloc(): MDCBottomSheetPresentationController; // inherited from NSObject

	static new(): MDCBottomSheetPresentationController; // inherited from NSObject

	delegate: MDCBottomSheetPresentationControllerDelegate;

	dismissOnBackgroundTap: boolean;

	dismissOnDraggingDownSheet: boolean;

	isScrimAccessibilityElement: boolean;

	preferredSheetHeight: number;

	scrimAccessibilityHint: string;

	scrimAccessibilityLabel: string;

	scrimAccessibilityTraits: number;

	scrimColor: UIColor;

	trackingScrollView: UIScrollView;

	traitCollectionDidChangeBlock: (p1: MDCBottomSheetPresentationController, p2: UITraitCollection) => void;
}

interface MDCBottomSheetPresentationControllerDelegate extends UIAdaptivePresentationControllerDelegate {

	bottomSheetDidChangeYOffsetYOffset?(bottomSheet: MDCBottomSheetPresentationController, yOffset: number): void;

	bottomSheetPresentationControllerDidDismissBottomSheet?(bottomSheet: MDCBottomSheetPresentationController): void;

	bottomSheetWillChangeStateSheetState?(bottomSheet: MDCBottomSheetPresentationController, sheetState: MDCSheetState): void;

	prepareForBottomSheetPresentation?(bottomSheet: MDCBottomSheetPresentationController): void;
}
declare var MDCBottomSheetPresentationControllerDelegate: {

	prototype: MDCBottomSheetPresentationControllerDelegate;
};

declare class MDCBottomSheetTransitionController extends NSObject implements UIViewControllerAnimatedTransitioning, UIViewControllerTransitioningDelegate {

	static alloc(): MDCBottomSheetTransitionController; // inherited from NSObject

	static new(): MDCBottomSheetTransitionController; // inherited from NSObject

	dismissOnBackgroundTap: boolean;

	dismissOnDraggingDownSheet: boolean;

	isScrimAccessibilityElement: boolean;

	preferredSheetHeight: number;

	scrimAccessibilityHint: string;

	scrimAccessibilityLabel: string;

	scrimAccessibilityTraits: number;

	scrimColor: UIColor;

	trackingScrollView: UIScrollView;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	animateTransition(transitionContext: UIViewControllerContextTransitioning): void;

	animationControllerForDismissedController(dismissed: UIViewController): UIViewControllerAnimatedTransitioning;

	animationControllerForPresentedControllerPresentingControllerSourceController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIViewControllerAnimatedTransitioning;

	animationEnded(transitionCompleted: boolean): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	interactionControllerForDismissal(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interactionControllerForPresentation(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interruptibleAnimatorForTransition(transitionContext: UIViewControllerContextTransitioning): UIViewImplicitlyAnimating;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentationControllerForPresentedViewControllerPresentingViewControllerSourceViewController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIPresentationController;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	transitionDuration(transitionContext: UIViewControllerContextTransitioning): number;
}

declare class MDCButton extends UIButton implements MDCElevatable, MDCElevationOverriding {

	static alloc(): MDCButton; // inherited from NSObject

	static appearance(): MDCButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCButton; // inherited from UIAppearance

	static buttonWithType(buttonType: UIButtonType): MDCButton; // inherited from UIButton

	static new(): MDCButton; // inherited from NSObject

	static systemButtonWithImageTargetAction(image: UIImage, target: any, action: string): MDCButton; // inherited from UIButton

	accessibilityTraitsIncludesButton: boolean;

	adjustsFontForContentSizeCategoryWhenScaledFontIsUnavailable: boolean;

	disabledAlpha: number;

	enableRippleBehavior: boolean;

	enableTitleFontForState: boolean;

	hitAreaInsets: UIEdgeInsets;

	inkColor: UIColor;

	inkMaxRippleRadius: number;

	inkStyle: MDCInkStyle;

	maximumSize: CGSize;

	mdc_adjustsFontForContentSizeCategory: boolean;

	minimumSize: CGSize;

	shapeGenerator: MDCShapeGenerating;

	traitCollectionDidChangeBlock: (p1: MDCButton, p2: UITraitCollection) => void;

	underlyingColorHint: UIColor;

	uppercaseTitle: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	applyContainedThemeWithScheme(scheme: MDCContainerScheming): void;

	applyOutlinedThemeWithScheme(scheme: MDCContainerScheming): void;

	applyTextThemeWithScheme(scheme: MDCContainerScheming): void;

	backgroundColorForState(state: UIControlState): UIColor;

	borderColorForState(state: UIControlState): UIColor;

	borderWidthForState(state: UIControlState): number;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	elevationForState(state: UIControlState): number;

	imageTintColorForState(state: UIControlState): UIColor;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setBackgroundColor(backgroundColor: UIColor): void;

	setBackgroundColorForState(backgroundColor: UIColor, state: UIControlState): void;

	setBorderColorForState(borderColor: UIColor, state: UIControlState): void;

	setBorderWidthForState(borderWidth: number, state: UIControlState): void;

	setElevationForState(elevation: number, state: UIControlState): void;

	setEnabledAnimated(enabled: boolean, animated: boolean): void;

	setImageTintColorForState(imageTintColor: UIColor, state: UIControlState): void;

	setShadowColorForState(shadowColor: UIColor, state: UIControlState): void;

	setTitleFontForState(font: UIFont, state: UIControlState): void;

	shadowColorForState(state: UIControlState): UIColor;

	titleFontForState(state: UIControlState): UIFont;
}

declare class MDCButtonColorThemer extends NSObject {

	static alloc(): MDCButtonColorThemer; // inherited from NSObject

	static applyColorSchemeToButton(colorScheme: MDCColorScheme, button: MDCButton): void;

	static applySemanticColorSchemeToButton(colorScheme: MDCColorScheming, button: MDCButton): void;

	static applySemanticColorSchemeToFlatButton(colorScheme: MDCColorScheming, flatButton: MDCButton): void;

	static applySemanticColorSchemeToFloatingButton(colorScheme: MDCColorScheming, floatingButton: MDCFloatingButton): void;

	static applySemanticColorSchemeToRaisedButton(colorScheme: MDCColorScheming, raisedButton: MDCButton): void;

	static new(): MDCButtonColorThemer; // inherited from NSObject
}

declare class MDCButtonScheme extends NSObject implements MDCButtonScheming {

	static alloc(): MDCButtonScheme; // inherited from NSObject

	static new(): MDCButtonScheme; // inherited from NSObject

	colorScheme: MDCColorScheming;

	cornerRadius: number;

	minimumHeight: number;

	shapeScheme: MDCShapeScheming;

	typographyScheme: MDCTypographyScheming;
}

interface MDCButtonScheming {

	colorScheme: MDCColorScheming;

	cornerRadius: number;

	minimumHeight: number;

	shapeScheme: MDCShapeScheming;

	typographyScheme: MDCTypographyScheming;
}
declare var MDCButtonScheming: {

	prototype: MDCButtonScheming;
};

declare class MDCButtonShapeThemer extends NSObject {

	static alloc(): MDCButtonShapeThemer; // inherited from NSObject

	static applyShapeSchemeToButton(shapeScheme: MDCShapeScheming, button: MDCButton): void;

	static new(): MDCButtonShapeThemer; // inherited from NSObject
}

declare class MDCButtonTypographyThemer extends NSObject {

	static alloc(): MDCButtonTypographyThemer; // inherited from NSObject

	static applyTypographySchemeToButton(typographyScheme: MDCTypographyScheming, button: MDCButton): void;

	static new(): MDCButtonTypographyThemer; // inherited from NSObject
}

declare class MDCCard extends UIControl implements MDCElevatable, MDCElevationOverriding {

	static alloc(): MDCCard; // inherited from NSObject

	static appearance(): MDCCard; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCCard; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCCard; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCCard; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCCard; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCCard; // inherited from UIAppearance

	static new(): MDCCard; // inherited from NSObject

	cornerRadius: number;

	enableRippleBehavior: boolean;

	readonly inkView: MDCInkView;

	interactable: boolean;

	readonly rippleView: MDCStatefulRippleView;

	shapeGenerator: MDCShapeGenerating;

	traitCollectionDidChangeBlock: (p1: MDCCard, p2: UITraitCollection) => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	borderColorForState(state: UIControlState): UIColor;

	borderWidthForState(state: UIControlState): number;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setBorderColorForState(borderColor: UIColor, state: UIControlState): void;

	setBorderWidthForState(borderWidth: number, state: UIControlState): void;

	setShadowColorForState(shadowColor: UIColor, state: UIControlState): void;

	setShadowElevationForState(shadowElevation: number, state: UIControlState): void;

	shadowColorForState(state: UIControlState): UIColor;

	shadowElevationForState(state: UIControlState): number;
}

declare const enum MDCCardCellHorizontalImageAlignment {

	Right = 0,

	Center = 1,

	Left = 2
}

declare const enum MDCCardCellState {

	Normal = 0,

	Highlighted = 1,

	Selected = 2,

	Dragged = 3
}

declare const enum MDCCardCellVerticalImageAlignment {

	Top = 0,

	Center = 1,

	Bottom = 2
}

declare class MDCCardCollectionCell extends UICollectionViewCell implements MDCElevatable, MDCElevationOverriding {

	static alloc(): MDCCardCollectionCell; // inherited from NSObject

	static appearance(): MDCCardCollectionCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCCardCollectionCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCCardCollectionCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCCardCollectionCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCCardCollectionCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCCardCollectionCell; // inherited from UIAppearance

	static new(): MDCCardCollectionCell; // inherited from NSObject

	cornerRadius: number;

	dragged: boolean;

	enableRippleBehavior: boolean;

	readonly inkView: MDCInkView;

	interactable: boolean;

	readonly rippleView: MDCStatefulRippleView;

	selectable: boolean;

	shapeGenerator: MDCShapeGenerating;

	readonly state: MDCCardCellState;

	traitCollectionDidChangeBlock: (p1: MDCCardCollectionCell, p2: UITraitCollection) => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	borderColorForState(state: MDCCardCellState): UIColor;

	borderWidthForState(state: MDCCardCellState): number;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	horizontalImageAlignmentForState(state: MDCCardCellState): MDCCardCellHorizontalImageAlignment;

	imageForState(state: MDCCardCellState): UIImage;

	imageTintColorForState(state: MDCCardCellState): UIColor;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setBorderColorForState(borderColor: UIColor, state: MDCCardCellState): void;

	setBorderWidthForState(borderWidth: number, state: MDCCardCellState): void;

	setHorizontalImageAlignmentForState(horizontalImageAlignment: MDCCardCellHorizontalImageAlignment, state: MDCCardCellState): void;

	setImageForState(image: UIImage, state: MDCCardCellState): void;

	setImageTintColorForState(imageTintColor: UIColor, state: MDCCardCellState): void;

	setShadowColorForState(shadowColor: UIColor, state: MDCCardCellState): void;

	setShadowElevationForState(shadowElevation: number, state: MDCCardCellState): void;

	setVerticalImageAlignmentForState(verticalImageAlignment: MDCCardCellVerticalImageAlignment, state: MDCCardCellState): void;

	shadowColorForState(state: MDCCardCellState): UIColor;

	shadowElevationForState(state: MDCCardCellState): number;

	verticalImageAlignmentForState(state: MDCCardCellState): MDCCardCellVerticalImageAlignment;
}

declare class MDCCardsColorThemer extends NSObject {

	static alloc(): MDCCardsColorThemer; // inherited from NSObject

	static applyOutlinedVariantWithColorSchemeToCard(colorScheme: MDCColorScheming, card: MDCCard): void;

	static applyOutlinedVariantWithColorSchemeToCardCell(colorScheme: MDCColorScheming, cardCell: MDCCardCollectionCell): void;

	static applySemanticColorSchemeToCard(colorScheme: MDCColorScheming, card: MDCCard): void;

	static applySemanticColorSchemeToCardCell(colorScheme: MDCColorScheming, cardCell: MDCCardCollectionCell): void;

	static new(): MDCCardsColorThemer; // inherited from NSObject
}

interface MDCColorScheme extends NSObjectProtocol {

	primaryColor: UIColor;

	primaryDarkColor?: UIColor;

	primaryLightColor?: UIColor;

	secondaryColor?: UIColor;

	secondaryDarkColor?: UIColor;

	secondaryLightColor?: UIColor;
}
declare var MDCColorScheme: {

	prototype: MDCColorScheme;
};

declare const enum MDCColorSchemeDefaults {

	Material201804 = 0,

	MaterialDark201907 = 1,

	Material201907 = 2
}

interface MDCColorScheming {

	backgroundColor: UIColor;

	elevationOverlayColor: UIColor;

	elevationOverlayEnabledForDarkMode: boolean;

	errorColor: UIColor;

	onBackgroundColor: UIColor;

	onPrimaryColor: UIColor;

	onSecondaryColor: UIColor;

	onSurfaceColor: UIColor;

	primaryColor: UIColor;

	primaryColorVariant: UIColor;

	secondaryColor: UIColor;

	surfaceColor: UIColor;
}
declare var MDCColorScheming: {

	prototype: MDCColorScheming;
};

declare class MDCContainedButtonColorThemer extends NSObject {

	static alloc(): MDCContainedButtonColorThemer; // inherited from NSObject

	static applySemanticColorSchemeToButton(colorScheme: MDCColorScheming, button: MDCButton): void;

	static new(): MDCContainedButtonColorThemer; // inherited from NSObject
}

declare class MDCContainedButtonThemer extends NSObject {

	static alloc(): MDCContainedButtonThemer; // inherited from NSObject

	static applySchemeToButton(scheme: MDCButtonScheming, button: MDCButton): void;

	static new(): MDCContainedButtonThemer; // inherited from NSObject
}

declare class MDCContainerScheme extends NSObject implements MDCContainerScheming {

	static alloc(): MDCContainerScheme; // inherited from NSObject

	static new(): MDCContainerScheme; // inherited from NSObject

	colorScheme: MDCSemanticColorScheme;

	shapeScheme: MDCShapeScheme;

	typographyScheme: MDCTypographyScheme;
}

interface MDCContainerScheming {

	colorScheme: MDCColorScheming;

	shapeScheme: MDCShapeScheming;

	typographyScheme: MDCTypographyScheming;
}
declare var MDCContainerScheming: {

	prototype: MDCContainerScheming;
};

declare class MDCCornerTreatment extends NSObject implements NSCopying {

	static alloc(): MDCCornerTreatment; // inherited from NSObject

	static cornerWithCurve(value: CGSize): MDCCurvedCornerTreatment;

	static cornerWithCurveValueType(value: CGSize, valueType: MDCCornerTreatmentValueType): MDCCurvedCornerTreatment;

	static cornerWithCut(value: number): MDCCutCornerTreatment;

	static cornerWithCutValueType(value: number, valueType: MDCCornerTreatmentValueType): MDCCutCornerTreatment;

	static cornerWithRadius(value: number): MDCRoundedCornerTreatment;

	static cornerWithRadiusValueType(value: number, valueType: MDCCornerTreatmentValueType): MDCRoundedCornerTreatment;

	static new(): MDCCornerTreatment; // inherited from NSObject

	valueType: MDCCornerTreatmentValueType;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	pathGeneratorForCornerWithAngle(angle: number): MDCPathGenerator;

	pathGeneratorForCornerWithAngleForViewSize(angle: number, size: CGSize): MDCPathGenerator;
}

declare const enum MDCCornerTreatmentValueType {

	Absolute = 0,

	Percentage = 1
}

declare class MDCCurvedCornerTreatment extends MDCCornerTreatment {

	static alloc(): MDCCurvedCornerTreatment; // inherited from NSObject

	static new(): MDCCurvedCornerTreatment; // inherited from NSObject

	size: CGSize;

	constructor(o: { size: CGSize; });

	initWithSize(size: CGSize): this;
}

declare class MDCCurvedRectShapeGenerator extends NSObject implements MDCShapeGenerating {

	static alloc(): MDCCurvedRectShapeGenerator; // inherited from NSObject

	static new(): MDCCurvedRectShapeGenerator; // inherited from NSObject

	cornerSize: CGSize;

	constructor(o: { cornerSize: CGSize; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithCornerSize(cornerSize: CGSize): this;

	pathForSize(size: CGSize): any;
}

declare class MDCCutCornerTreatment extends MDCCornerTreatment {

	static alloc(): MDCCutCornerTreatment; // inherited from NSObject

	static new(): MDCCutCornerTreatment; // inherited from NSObject

	cut: number;

	constructor(o: { cut: number; });

	initWithCut(cut: number): this;
}

declare class MDCDialogPresentationController extends UIPresentationController {

	static alloc(): MDCDialogPresentationController; // inherited from NSObject

	static new(): MDCDialogPresentationController; // inherited from NSObject

	dialogCornerRadius: number;

	dialogElevation: number;

	dialogPresentationControllerDelegate: MDCDialogPresentationControllerDelegate;

	dialogShadowColor: UIColor;

	dialogTransform: CGAffineTransform;

	dismissOnBackgroundTap: boolean;

	scrimColor: UIColor;

	traitCollectionDidChangeBlock: (p1: MDCDialogPresentationController, p2: UITraitCollection) => void;

	// frameOfPresentedViewInContainerView(): CGRect;
}

interface MDCDialogPresentationControllerDelegate extends NSObjectProtocol {

	dialogPresentationControllerDidDismiss?(dialogPresentationController: MDCDialogPresentationController): void;
}
declare var MDCDialogPresentationControllerDelegate: {

	prototype: MDCDialogPresentationControllerDelegate;
};

declare class MDCDialogTransitionController extends NSObject implements UIViewControllerAnimatedTransitioning, UIViewControllerTransitioningDelegate {

	static alloc(): MDCDialogTransitionController; // inherited from NSObject

	static new(): MDCDialogTransitionController; // inherited from NSObject

	dialogInitialScaleFactor: number;

	opacityAnimationDuration: number;

	scaleAnimationDuration: number;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	animateTransition(transitionContext: UIViewControllerContextTransitioning): void;

	animationControllerForDismissedController(dismissed: UIViewController): UIViewControllerAnimatedTransitioning;

	animationControllerForPresentedControllerPresentingControllerSourceController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIViewControllerAnimatedTransitioning;

	animationEnded(transitionCompleted: boolean): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	interactionControllerForDismissal(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interactionControllerForPresentation(animator: UIViewControllerAnimatedTransitioning): UIViewControllerInteractiveTransitioning;

	interruptibleAnimatorForTransition(transitionContext: UIViewControllerContextTransitioning): UIViewImplicitlyAnimating;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentationControllerForPresentedViewControllerPresentingViewControllerSourceViewController(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIPresentationController;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	transitionDuration(transitionContext: UIViewControllerContextTransitioning): number;
}

declare class MDCEdgeTreatment extends NSObject implements NSCopying {

	static alloc(): MDCEdgeTreatment; // inherited from NSObject

	static new(): MDCEdgeTreatment; // inherited from NSObject

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	pathGeneratorForEdgeWithLength(length: number): MDCPathGenerator;
}

interface MDCElevatable extends NSObjectProtocol {

	mdc_currentElevation: number;

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void;
}
declare var MDCElevatable: {

	prototype: MDCElevatable;
};

interface MDCElevationOverriding {

	mdc_overrideBaseElevation: number;
}
declare var MDCElevationOverriding: {

	prototype: MDCElevationOverriding;
};

declare class MDCFilledTextFieldColorThemer extends NSObject {

	static alloc(): MDCFilledTextFieldColorThemer; // inherited from NSObject

	static applySemanticColorSchemeToTextInputControllerFilled(colorScheme: MDCColorScheming, textInputControllerFilled: MDCTextInputControllerFilled): void;

	static new(): MDCFilledTextFieldColorThemer; // inherited from NSObject
}

declare class MDCFlatButton extends MDCButton {

	static alloc(): MDCFlatButton; // inherited from NSObject

	static appearance(): MDCFlatButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCFlatButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCFlatButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCFlatButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCFlatButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCFlatButton; // inherited from UIAppearance

	static buttonWithType(buttonType: UIButtonType): MDCFlatButton; // inherited from UIButton

	static new(): MDCFlatButton; // inherited from NSObject

	static systemButtonWithImageTargetAction(image: UIImage, target: any, action: string): MDCFlatButton; // inherited from UIButton

	hasOpaqueBackground: boolean;
}

declare class MDCFloatingActionButtonThemer extends NSObject {

	static alloc(): MDCFloatingActionButtonThemer; // inherited from NSObject

	static applySchemeToButton(scheme: MDCButtonScheming, button: MDCFloatingButton): void;

	static new(): MDCFloatingActionButtonThemer; // inherited from NSObject
}

declare class MDCFloatingButton extends MDCButton {

	static alloc(): MDCFloatingButton; // inherited from NSObject

	static appearance(): MDCFloatingButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCFloatingButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCFloatingButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCFloatingButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCFloatingButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCFloatingButton; // inherited from UIAppearance

	static buttonWithType(buttonType: UIButtonType): MDCFloatingButton; // inherited from UIButton

	static defaultDimension(): number;

	static floatingButtonWithShape(shape: MDCFloatingButtonShape): MDCFloatingButton;

	static miniDimension(): number;

	static new(): MDCFloatingButton; // inherited from NSObject

	static systemButtonWithImageTargetAction(image: UIImage, target: any, action: string): MDCFloatingButton; // inherited from UIButton

	imageLocation: MDCFloatingButtonImageLocation;

	imageTitleSpace: number;

	mode: MDCFloatingButtonMode;

	constructor(o: { frame: CGRect; shape: MDCFloatingButtonShape; });

	applySecondaryThemeWithScheme(scheme: MDCContainerScheming): void;

	collapseCompletion(animated: boolean, completion: () => void): void;

	expandCompletion(animated: boolean, completion: () => void): void;

	initWithFrameShape(frame: CGRect, shape: MDCFloatingButtonShape): this;

	setContentEdgeInsetsForShapeInMode(contentEdgeInsets: UIEdgeInsets, shape: MDCFloatingButtonShape, mode: MDCFloatingButtonMode): void;

	setHitAreaInsetsForShapeInMode(hitAreaInsets: UIEdgeInsets, shape: MDCFloatingButtonShape, mode: MDCFloatingButtonMode): void;

	setMaximumSizeForShapeInMode(maximumSize: CGSize, shape: MDCFloatingButtonShape, mode: MDCFloatingButtonMode): void;

	setMinimumSizeForShapeInMode(minimumSize: CGSize, shape: MDCFloatingButtonShape, mode: MDCFloatingButtonMode): void;
}

declare class MDCFloatingButtonColorThemer extends NSObject {

	static alloc(): MDCFloatingButtonColorThemer; // inherited from NSObject

	static applySemanticColorSchemeToButton(colorScheme: MDCColorScheming, button: MDCFloatingButton): void;

	static new(): MDCFloatingButtonColorThemer; // inherited from NSObject
}

declare const enum MDCFloatingButtonImageLocation {

	Leading = 0,

	Trailing = 1
}

declare const enum MDCFloatingButtonMode {

	Normal = 0,

	Expanded = 1
}

declare const enum MDCFloatingButtonShape {

	Default = 0,

	Mini = 1
}

declare class MDCFloatingButtonShapeThemer extends NSObject {

	static alloc(): MDCFloatingButtonShapeThemer; // inherited from NSObject

	static applyShapeSchemeToButton(shapeScheme: MDCShapeScheming, button: MDCFloatingButton): void;

	static new(): MDCFloatingButtonShapeThemer; // inherited from NSObject
}

declare class MDCFontScaler extends NSObject {

	static alloc(): MDCFontScaler; // inherited from NSObject

	static new(): MDCFontScaler; // inherited from NSObject

	static scalerForMaterialTextStyle(textStyle: string): MDCFontScaler;

	constructor(o: { forMaterialTextStyle: string; });

	initForMaterialTextStyle(textStyle: string): this;

	scaledFontWithFont(font: UIFont): UIFont;

	scaledValueForValue(value: number): number;
}

interface MDCFontScheme extends NSObjectProtocol {

	body1: UIFont;

	body2: UIFont;

	button: UIFont;

	caption: UIFont;

	headline1: UIFont;

	headline2: UIFont;

	headline3: UIFont;

	headline4: UIFont;

	headline5: UIFont;

	headline6: UIFont;

	overline: UIFont;

	subtitle1: UIFont;

	subtitle2: UIFont;
}
declare var MDCFontScheme: {

	prototype: MDCFontScheme;
};

declare const enum MDCFontTextStyle {

	Body1 = 0,

	Body2 = 1,

	Caption = 2,

	Headline = 3,

	Subheadline = 4,

	Title = 5,

	Display1 = 6,

	Display2 = 7,

	Display3 = 8,

	Display4 = 9,

	Button = 10
}

declare class MDCIcons extends NSObject {

	static alloc(): MDCIcons; // inherited from NSObject

	static bundleNamed(bundleName: string): NSBundle;

	static imageFor_ic_check_circle(): UIImage;

	static new(): MDCIcons; // inherited from NSObject

	static pathForIconNameWithBundleName(iconName: string, bundleName: string): string;

	static pathFor_ic_check_circle(): string;
}

declare class MDCInkColorThemer extends NSObject {

	static alloc(): MDCInkColorThemer; // inherited from NSObject

	static applyColorSchemeToInkView(colorScheme: MDCColorScheme, inkView: MDCInkView): void;

	static new(): MDCInkColorThemer; // inherited from NSObject
}

declare class MDCInkGestureRecognizer extends UIGestureRecognizer {

	static alloc(): MDCInkGestureRecognizer; // inherited from NSObject

	static new(): MDCInkGestureRecognizer; // inherited from NSObject

	cancelOnDragOut: boolean;

	dragCancelDistance: number;

	targetBounds: CGRect;

	isTouchWithinTargetBounds(): boolean;

	touchStartLocationInView(view: UIView): CGPoint;
}

declare const enum MDCInkStyle {

	Bounded = 0,

	Unbounded = 1
}

declare class MDCInkTouchController extends NSObject implements UIGestureRecognizerDelegate {

	static alloc(): MDCInkTouchController; // inherited from NSObject

	static new(): MDCInkTouchController; // inherited from NSObject

	cancelsOnDragOut: boolean;

	readonly defaultInkView: MDCInkView;

	delaysInkSpread: boolean;

	delegate: MDCInkTouchControllerDelegate;

	dragCancelDistance: number;

	readonly gestureRecognizer: MDCInkGestureRecognizer;

	requiresFailureOfScrollViewGestures: boolean;

	targetBounds: CGRect;

	readonly view: UIView;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { view: UIView; });

	addInkView(): void;

	cancelInkTouchProcessing(): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	gestureRecognizerShouldBeRequiredToFailByGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldReceivePress(gestureRecognizer: UIGestureRecognizer, press: UIPress): boolean;

	gestureRecognizerShouldReceiveTouch(gestureRecognizer: UIGestureRecognizer, touch: UITouch): boolean;

	gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldRequireFailureOfGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	initWithView(view: UIView): this;

	inkViewAtTouchLocation(location: CGPoint): MDCInkView;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface MDCInkTouchControllerDelegate extends NSObjectProtocol {

	inkTouchControllerDidProcessInkViewAtTouchLocation?(inkTouchController: MDCInkTouchController, inkView: MDCInkView, location: CGPoint): void;

	inkTouchControllerInkViewAtTouchLocation?(inkTouchController: MDCInkTouchController, location: CGPoint): MDCInkView;

	inkTouchControllerInsertInkViewIntoView?(inkTouchController: MDCInkTouchController, inkView: UIView, view: UIView): void;

	inkTouchControllerShouldProcessInkTouchesAtTouchLocation?(inkTouchController: MDCInkTouchController, location: CGPoint): boolean;
}
declare var MDCInkTouchControllerDelegate: {

	prototype: MDCInkTouchControllerDelegate;
};

declare class MDCInkView extends UIView {

	static alloc(): MDCInkView; // inherited from NSObject

	static appearance(): MDCInkView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCInkView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCInkView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCInkView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCInkView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCInkView; // inherited from UIAppearance

	static injectedInkViewForView(view: UIView): MDCInkView;

	static new(): MDCInkView; // inherited from NSObject

	animationDelegate: MDCInkViewDelegate;

	customInkCenter: CGPoint;

	readonly defaultInkColor: UIColor;

	inkColor: UIColor;

	inkStyle: MDCInkStyle;

	maxRippleRadius: number;

	traitCollectionDidChangeBlock: (p1: MDCInkView, p2: UITraitCollection) => void;

	usesCustomInkCenter: boolean;

	usesLegacyInkRipple: boolean;

	cancelAllAnimationsAnimated(animated: boolean): void;

	startTouchBeganAnimationAtPointCompletion(point: CGPoint, completionBlock: () => void): void;

	startTouchBeganAtPointAnimatedWithCompletion(point: CGPoint, animated: boolean, completionBlock: () => void): void;

	startTouchEndAtPointAnimatedWithCompletion(point: CGPoint, animated: boolean, completionBlock: () => void): void;

	startTouchEndedAnimationAtPointCompletion(point: CGPoint, completionBlock: () => void): void;
}

interface MDCInkViewDelegate extends NSObjectProtocol {

	inkAnimationDidEnd?(inkView: MDCInkView): void;

	inkAnimationDidStart?(inkView: MDCInkView): void;
}
declare var MDCInkViewDelegate: {

	prototype: MDCInkViewDelegate;
};

declare class MDCIntrinsicHeightTextView extends UITextView {

	static alloc(): MDCIntrinsicHeightTextView; // inherited from NSObject

	static appearance(): MDCIntrinsicHeightTextView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCIntrinsicHeightTextView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCIntrinsicHeightTextView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCIntrinsicHeightTextView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCIntrinsicHeightTextView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCIntrinsicHeightTextView; // inherited from UIAppearance

	static new(): MDCIntrinsicHeightTextView; // inherited from NSObject
}

declare class MDCKeyboardWatcher extends NSObject {

	static alloc(): MDCKeyboardWatcher; // inherited from NSObject

	static animationCurveOptionFromKeyboardNotification(notification: NSNotification): UIViewAnimationOptions;

	static animationDurationFromKeyboardNotification(notification: NSNotification): number;

	static new(): MDCKeyboardWatcher; // inherited from NSObject

	static sharedKeyboardWatcher(): MDCKeyboardWatcher;

	readonly keyboardOffset: number;

	readonly visibleKeyboardHeight: number;
}

declare var MDCKeyboardWatcherKeyboardWillChangeFrameNotification: string;

declare var MDCKeyboardWatcherKeyboardWillHideNotification: string;

declare var MDCKeyboardWatcherKeyboardWillShowNotification: string;

interface MDCLeadingViewTextInput extends MDCTextInput {

	leadingView: UIView;

	leadingViewMode: UITextFieldViewMode;
}
declare var MDCLeadingViewTextInput: {

	prototype: MDCLeadingViewTextInput;
};

declare class MDCMultilineTextField extends UIView implements MDCElevatable, MDCElevationOverriding, MDCMultilineTextInput, MDCTextInput {

	static alloc(): MDCMultilineTextField; // inherited from NSObject

	static appearance(): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCMultilineTextField; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCMultilineTextField; // inherited from UIAppearance

	static new(): MDCMultilineTextField; // inherited from NSObject

	adjustsFontForContentSizeCategory: boolean;

	layoutDelegate: MDCMultilineTextInputLayoutDelegate;

	multilineDelegate: MDCMultilineTextInputDelegate;

	textView: MDCIntrinsicHeightTextView;

	traitCollectionDidChangeBlock: (p1: MDCMultilineTextField, p2: UITraitCollection) => void;

	attributedPlaceholder: NSAttributedString; // inherited from MDCTextInput

	attributedText: NSAttributedString; // inherited from MDCTextInput

	borderPath: UIBezierPath; // inherited from MDCTextInput

	borderView: MDCTextInputBorderView; // inherited from MDCTextInput

	readonly clearButton: UIButton; // inherited from MDCTextInput

	clearButtonMode: UITextFieldViewMode; // inherited from MDCTextInput

	cursorColor: UIColor; // inherited from MDCTextInput

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly editing: boolean; // inherited from MDCTextInput

	enabled: boolean; // inherited from MDCTextInput

	expandsOnOverflow: boolean; // inherited from MDCMultilineTextInput

	font: UIFont; // inherited from MDCTextInput

	readonly hasTextContent: boolean; // inherited from MDCTextInput

	readonly hash: number; // inherited from NSObjectProtocol

	hidesPlaceholderOnInput: boolean; // inherited from MDCTextInput

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly leadingUnderlineLabel: UILabel; // inherited from MDCTextInput

	mdc_adjustsFontForContentSizeCategory: boolean; // inherited from MDCTextInput

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	minimumLines: number; // inherited from MDCMultilineTextInput

	placeholder: string; // inherited from MDCTextInput

	readonly placeholderLabel: UILabel; // inherited from MDCTextInput

	positioningDelegate: MDCTextInputPositioningDelegate; // inherited from MDCTextInput

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	text: string; // inherited from MDCTextInput

	textColor: UIColor; // inherited from MDCTextInput

	readonly textInsets: UIEdgeInsets; // inherited from MDCTextInput

	textInsetsMode: MDCTextInputTextInsetsMode; // inherited from MDCTextInput

	readonly trailingUnderlineLabel: UILabel; // inherited from MDCTextInput

	trailingView: UIView; // inherited from MDCTextInput

	trailingViewMode: UITextFieldViewMode; // inherited from MDCTextInput

	readonly underline: MDCTextInputUnderlineView; // inherited from MDCTextInput

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	clearText(): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface MDCMultilineTextInput extends MDCTextInput {

	expandsOnOverflow: boolean;

	minimumLines: number;
}
declare var MDCMultilineTextInput: {

	prototype: MDCMultilineTextInput;
};

interface MDCMultilineTextInputDelegate extends NSObjectProtocol {

	multilineTextFieldShouldClear?(textField: UIView): boolean;
}
declare var MDCMultilineTextInputDelegate: {

	prototype: MDCMultilineTextInputDelegate;
};

interface MDCMultilineTextInputLayoutDelegate extends NSObjectProtocol {

	multilineTextFieldDidChangeContentSize?(multilineTextField: MDCMultilineTextInput, size: CGSize): void;
}
declare var MDCMultilineTextInputLayoutDelegate: {

	prototype: MDCMultilineTextInputLayoutDelegate;
};

declare class MDCNumericValueLabel extends UIView implements UIContentSizeCategoryAdjusting {

	static alloc(): MDCNumericValueLabel; // inherited from NSObject

	static appearance(): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCNumericValueLabel; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCNumericValueLabel; // inherited from UIAppearance

	static new(): MDCNumericValueLabel; // inherited from NSObject

	font: UIFont;

	fontSize: number;

	text: string;

	textColor: UIColor;

	adjustsFontForContentSizeCategory: boolean; // inherited from UIContentSizeCategoryAdjusting

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCOutlinedButtonColorThemer extends NSObject {

	static alloc(): MDCOutlinedButtonColorThemer; // inherited from NSObject

	static applySemanticColorSchemeToButton(colorScheme: MDCColorScheming, button: MDCButton): void;

	static new(): MDCOutlinedButtonColorThemer; // inherited from NSObject
}

declare class MDCOutlinedButtonThemer extends NSObject {

	static alloc(): MDCOutlinedButtonThemer; // inherited from NSObject

	static applySchemeToButton(scheme: MDCButtonScheming, button: MDCButton): void;

	static new(): MDCOutlinedButtonThemer; // inherited from NSObject
}

declare class MDCOutlinedTextFieldColorThemer extends NSObject {

	static alloc(): MDCOutlinedTextFieldColorThemer; // inherited from NSObject

	static applySemanticColorSchemeToTextInputController(colorScheme: MDCColorScheming, textInputController: MDCTextInputController): void;

	static new(): MDCOutlinedTextFieldColorThemer; // inherited from NSObject
}

interface MDCOverlay extends NSObjectProtocol {

	frame: CGRect;

	identifier: string;
}
declare var MDCOverlay: {

	prototype: MDCOverlay;
};

declare class MDCOverlayObserver extends NSObject {

	static alloc(): MDCOverlayObserver; // inherited from NSObject

	static new(): MDCOverlayObserver; // inherited from NSObject

	static observerForScreen(screen: UIScreen): MDCOverlayObserver;

	addTargetAction(target: any, action: string): void;

	removeTarget(target: any): void;

	removeTargetAction(target: any, action: string): void;
}

interface MDCOverlayTransitioning extends NSObjectProtocol {

	animationCurve: UIViewAnimationCurve;

	compositeFrame: CGRect;

	customTimingFunction: CAMediaTimingFunction;

	duration: number;

	animateAlongsideTransition(animations: () => void): void;

	animateAlongsideTransitionWithOptionsAnimationsCompletion(options: UIViewAnimationOptions, animations: () => void, completion: (p1: boolean) => void): void;

	compositeFrameInView(targetView: UIView): CGRect;

	enumerateOverlays(handler: (p1: MDCOverlay, p2: number, p3: interop.Pointer | interop.Reference<boolean>) => void): void;
}
declare var MDCOverlayTransitioning: {

	prototype: MDCOverlayTransitioning;
};

declare class MDCOverlayWindow extends UIWindow {

	static alloc(): MDCOverlayWindow; // inherited from NSObject

	static appearance(): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCOverlayWindow; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCOverlayWindow; // inherited from UIAppearance

	static new(): MDCOverlayWindow; // inherited from NSObject

	activateOverlayWithLevel(overlay: UIView, level: number): void;

	deactivateOverlay(overlay: UIView): void;
}

declare class MDCPalette extends NSObject {

	static alloc(): MDCPalette; // inherited from NSObject

	static new(): MDCPalette; // inherited from NSObject

	static paletteGeneratedFromColor(target500Color: UIColor): MDCPalette;

	static paletteWithTintsAccents(tints: NSDictionary<string, UIColor>, accents: NSDictionary<string, UIColor>): MDCPalette;

	readonly accent100: UIColor;

	readonly accent200: UIColor;

	readonly accent400: UIColor;

	readonly accent700: UIColor;

	readonly tint100: UIColor;

	readonly tint200: UIColor;

	readonly tint300: UIColor;

	readonly tint400: UIColor;

	readonly tint50: UIColor;

	readonly tint500: UIColor;

	readonly tint600: UIColor;

	readonly tint700: UIColor;

	readonly tint800: UIColor;

	readonly tint900: UIColor;

	static readonly amberPalette: MDCPalette;

	static readonly blueGreyPalette: MDCPalette;

	static readonly bluePalette: MDCPalette;

	static readonly brownPalette: MDCPalette;

	static readonly cyanPalette: MDCPalette;

	static readonly deepOrangePalette: MDCPalette;

	static readonly deepPurplePalette: MDCPalette;

	static readonly greenPalette: MDCPalette;

	static readonly greyPalette: MDCPalette;

	static readonly indigoPalette: MDCPalette;

	static readonly lightBluePalette: MDCPalette;

	static readonly lightGreenPalette: MDCPalette;

	static readonly limePalette: MDCPalette;

	static readonly orangePalette: MDCPalette;

	static readonly pinkPalette: MDCPalette;

	static readonly purplePalette: MDCPalette;

	static readonly redPalette: MDCPalette;

	static readonly tealPalette: MDCPalette;

	static readonly yellowPalette: MDCPalette;

	constructor(o: { tints: NSDictionary<string, UIColor>; accents: NSDictionary<string, UIColor>; });

	initWithTintsAccents(tints: NSDictionary<string, UIColor>, accents: NSDictionary<string, UIColor>): this;
}

declare var MDCPaletteAccent100Name: string;

declare var MDCPaletteAccent200Name: string;

declare var MDCPaletteAccent400Name: string;

declare var MDCPaletteAccent700Name: string;

declare var MDCPaletteTint100Name: string;

declare var MDCPaletteTint200Name: string;

declare var MDCPaletteTint300Name: string;

declare var MDCPaletteTint400Name: string;

declare var MDCPaletteTint500Name: string;

declare var MDCPaletteTint50Name: string;

declare var MDCPaletteTint600Name: string;

declare var MDCPaletteTint700Name: string;

declare var MDCPaletteTint800Name: string;

declare var MDCPaletteTint900Name: string;

declare class MDCPathGenerator extends NSObject {

	static alloc(): MDCPathGenerator; // inherited from NSObject

	static new(): MDCPathGenerator; // inherited from NSObject

	static pathGenerator(): MDCPathGenerator;

	static pathGeneratorWithStartPoint(startPoint: CGPoint): MDCPathGenerator;

	readonly endPoint: CGPoint;

	readonly startPoint: CGPoint;

	addArcWithCenterRadiusStartAngleEndAngleClockwise(center: CGPoint, radius: number, startAngle: number, endAngle: number, clockwise: boolean): void;

	addArcWithTangentPointToPointRadius(tangentPoint: CGPoint, toPoint: CGPoint, radius: number): void;

	addCurveWithControlPoint1ControlPoint2ToPoint(controlPoint1: CGPoint, controlPoint2: CGPoint, toPoint: CGPoint): void;

	addLineToPoint(point: CGPoint): void;

	addQuadCurveWithControlPointToPoint(controlPoint: CGPoint, toPoint: CGPoint): void;

	appendToCGPathTransform(cgPath: any, transform: interop.Pointer | interop.Reference<CGAffineTransform>): void;
}

declare class MDCPillShapeGenerator extends NSObject implements MDCShapeGenerating {

	static alloc(): MDCPillShapeGenerator; // inherited from NSObject

	static new(): MDCPillShapeGenerator; // inherited from NSObject

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	pathForSize(size: CGSize): any;
}

declare class MDCProgressView extends UIView {

	static alloc(): MDCProgressView; // inherited from NSObject

	static appearance(): MDCProgressView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCProgressView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCProgressView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCProgressView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCProgressView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCProgressView; // inherited from UIAppearance

	static new(): MDCProgressView; // inherited from NSObject

	backwardProgressAnimationMode: MDCProgressViewBackwardAnimationMode;

	cornerRadius: number;

	progress: number;

	progressTintColor: UIColor;

	trackTintColor: UIColor;

	traitCollectionDidChangeBlock: (p1: MDCProgressView, p2: UITraitCollection) => void;

	setHiddenAnimatedCompletion(hidden: boolean, animated: boolean, completion: (p1: boolean) => void): void;

	setProgressAnimatedCompletion(progress: number, animated: boolean, completion: (p1: boolean) => void): void;
}

declare const enum MDCProgressViewBackwardAnimationMode {

	Reset = 0,

	Animate = 1
}

declare class MDCProgressViewColorThemer extends NSObject {

	static alloc(): MDCProgressViewColorThemer; // inherited from NSObject

	static applyColorSchemeToProgressView(colorScheme: MDCColorScheme, progressView: MDCProgressView): void;

	static new(): MDCProgressViewColorThemer; // inherited from NSObject
}

declare class MDCRaisedButton extends MDCButton {

	static alloc(): MDCRaisedButton; // inherited from NSObject

	static appearance(): MDCRaisedButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCRaisedButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCRaisedButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCRaisedButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCRaisedButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCRaisedButton; // inherited from UIAppearance

	static buttonWithType(buttonType: UIButtonType): MDCRaisedButton; // inherited from UIButton

	static new(): MDCRaisedButton; // inherited from NSObject

	static systemButtonWithImageTargetAction(image: UIImage, target: any, action: string): MDCRaisedButton; // inherited from UIButton
}

declare class MDCRectangleShapeGenerator extends NSObject implements MDCShapeGenerating {

	static alloc(): MDCRectangleShapeGenerator; // inherited from NSObject

	static new(): MDCRectangleShapeGenerator; // inherited from NSObject

	bottomEdge: MDCEdgeTreatment;

	bottomLeftCorner: MDCCornerTreatment;

	bottomLeftCornerOffset: CGPoint;

	bottomRightCorner: MDCCornerTreatment;

	bottomRightCornerOffset: CGPoint;

	leftEdge: MDCEdgeTreatment;

	rightEdge: MDCEdgeTreatment;

	topEdge: MDCEdgeTreatment;

	topLeftCorner: MDCCornerTreatment;

	topLeftCornerOffset: CGPoint;

	topRightCorner: MDCCornerTreatment;

	topRightCornerOffset: CGPoint;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	pathForSize(size: CGSize): any;

	setCorners(cornerShape: MDCCornerTreatment): void;

	setEdges(edgeShape: MDCEdgeTreatment): void;
}

declare const enum MDCRippleState {

	Normal = 0,

	Highlighted = 1,

	Selected = 2,

	Dragged = 4
}

declare const enum MDCRippleStyle {

	Bounded = 0,

	Unbounded = 1
}

declare class MDCRippleTouchController extends NSObject implements UIGestureRecognizerDelegate {

	static alloc(): MDCRippleTouchController; // inherited from NSObject

	static new(): MDCRippleTouchController; // inherited from NSObject

	delegate: MDCRippleTouchControllerDelegate;

	readonly gestureRecognizer: UILongPressGestureRecognizer;

	readonly rippleView: MDCRippleView;

	shouldProcessRippleWithScrollViewGestures: boolean;

	readonly view: UIView;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { view: UIView; });

	constructor(o: { view: UIView; deferred: boolean; });

	addRippleToView(view: UIView): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	gestureRecognizerShouldBeRequiredToFailByGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldReceivePress(gestureRecognizer: UIGestureRecognizer, press: UIPress): boolean;

	gestureRecognizerShouldReceiveTouch(gestureRecognizer: UIGestureRecognizer, touch: UITouch): boolean;

	gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	gestureRecognizerShouldRequireFailureOfGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

	initWithView(view: UIView): this;

	initWithViewDeferred(view: UIView, deferred: boolean): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface MDCRippleTouchControllerDelegate extends NSObjectProtocol {

	rippleTouchControllerDidProcessRippleViewAtTouchLocation?(rippleTouchController: MDCRippleTouchController, rippleView: MDCRippleView, location: CGPoint): void;

	rippleTouchControllerInsertRippleViewIntoView?(rippleTouchController: MDCRippleTouchController, rippleView: MDCRippleView, view: UIView): void;

	rippleTouchControllerShouldProcessRippleTouchesAtTouchLocation?(rippleTouchController: MDCRippleTouchController, location: CGPoint): boolean;
}
declare var MDCRippleTouchControllerDelegate: {

	prototype: MDCRippleTouchControllerDelegate;
};

declare class MDCRippleView extends UIView {

	static alloc(): MDCRippleView; // inherited from NSObject

	static appearance(): MDCRippleView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCRippleView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCRippleView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCRippleView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCRippleView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCRippleView; // inherited from UIAppearance

	static new(): MDCRippleView; // inherited from NSObject

	activeRippleColor: UIColor;

	maximumRadius: number;

	rippleColor: UIColor;

	rippleStyle: MDCRippleStyle;

	rippleViewDelegate: MDCRippleViewDelegate;

	traitCollectionDidChangeBlock: (p1: MDCRippleView, p2: UITraitCollection) => void;

	usesSuperviewShadowLayerAsMask: boolean;

	beginRippleTouchDownAtPointAnimatedCompletion(point: CGPoint, animated: boolean, completion: () => void): void;

	beginRippleTouchUpAnimatedCompletion(animated: boolean, completion: () => void): void;

	cancelAllRipplesAnimatedCompletion(animated: boolean, completion: () => void): void;

	fadeInRippleAnimatedCompletion(animated: boolean, completion: () => void): void;

	fadeOutRippleAnimatedCompletion(animated: boolean, completion: () => void): void;
}

interface MDCRippleViewDelegate extends NSObjectProtocol {

	rippleTouchDownAnimationDidBegin?(rippleView: MDCRippleView): void;

	rippleTouchDownAnimationDidEnd?(rippleView: MDCRippleView): void;

	rippleTouchUpAnimationDidBegin?(rippleView: MDCRippleView): void;

	rippleTouchUpAnimationDidEnd?(rippleView: MDCRippleView): void;
}
declare var MDCRippleViewDelegate: {

	prototype: MDCRippleViewDelegate;
};

declare class MDCRoundedCornerTreatment extends MDCCornerTreatment {

	static alloc(): MDCRoundedCornerTreatment; // inherited from NSObject

	static new(): MDCRoundedCornerTreatment; // inherited from NSObject

	radius: number;

	constructor(o: { radius: number; });

	initWithRadius(radius: number): this;
}

declare class MDCSemanticColorScheme extends NSObject implements MDCColorScheming, NSCopying {

	static alloc(): MDCSemanticColorScheme; // inherited from NSObject

	static blendColorWithBackgroundColor(color: UIColor, backgroundColor: UIColor): UIColor;

	static new(): MDCSemanticColorScheme; // inherited from NSObject

	backgroundColor: UIColor;

	elevationOverlayColor: UIColor;

	elevationOverlayEnabledForDarkMode: boolean;

	errorColor: UIColor;

	onBackgroundColor: UIColor;

	onPrimaryColor: UIColor;

	onSecondaryColor: UIColor;

	onSurfaceColor: UIColor;

	primaryColor: UIColor;

	primaryColorVariant: UIColor;

	secondaryColor: UIColor;

	surfaceColor: UIColor;

	constructor(o: { defaults: MDCColorSchemeDefaults; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithDefaults(defaults: MDCColorSchemeDefaults): this;
}

declare var MDCShadowElevationAppBar: number;

declare var MDCShadowElevationBottomAppBar: number;

declare var MDCShadowElevationBottomNavigationBar: number;

declare var MDCShadowElevationCardPickedUp: number;

declare var MDCShadowElevationCardResting: number;

declare var MDCShadowElevationDialog: number;

declare var MDCShadowElevationFABPressed: number;

declare var MDCShadowElevationFABResting: number;

declare var MDCShadowElevationMenu: number;

declare var MDCShadowElevationModalActionSheet: number;

declare var MDCShadowElevationModalBottomSheet: number;

declare var MDCShadowElevationNavDrawer: number;

declare var MDCShadowElevationNone: number;

declare var MDCShadowElevationPicker: number;

declare var MDCShadowElevationQuickEntry: number;

declare var MDCShadowElevationQuickEntryResting: number;

declare var MDCShadowElevationRaisedButtonPressed: number;

declare var MDCShadowElevationRaisedButtonResting: number;

declare var MDCShadowElevationRefresh: number;

declare var MDCShadowElevationRightDrawer: number;

declare var MDCShadowElevationSearchBarResting: number;

declare var MDCShadowElevationSearchBarScrolled: number;

declare var MDCShadowElevationSnackbar: number;

declare var MDCShadowElevationSubMenu: number;

declare var MDCShadowElevationSwitch: number;

declare class MDCShadowLayer extends CALayer implements CALayerDelegate {

	static alloc(): MDCShadowLayer; // inherited from NSObject

	static layer(): MDCShadowLayer; // inherited from CALayer

	static new(): MDCShadowLayer; // inherited from NSObject

	elevation: number;

	shadowMaskEnabled: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	actionForLayerForKey(layer: CALayer, event: string): CAAction;

	animateCornerRadiusWithTimingFunctionDuration(cornerRadius: number, timingFunction: CAMediaTimingFunction, duration: number): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	displayLayer(layer: CALayer): void;

	drawLayerInContext(layer: CALayer, ctx: any): void;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	layerWillDraw(layer: CALayer): void;

	layoutSublayersOfLayer(layer: CALayer): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCShadowMetrics extends NSObject {

	static alloc(): MDCShadowMetrics; // inherited from NSObject

	static metricsWithElevation(elevation: number): MDCShadowMetrics;

	static new(): MDCShadowMetrics; // inherited from NSObject

	readonly bottomShadowOffset: CGSize;

	readonly bottomShadowOpacity: number;

	readonly bottomShadowRadius: number;

	readonly topShadowOffset: CGSize;

	readonly topShadowOpacity: number;

	readonly topShadowRadius: number;
}

declare class MDCShapeCategory extends NSObject implements NSCopying {

	static alloc(): MDCShapeCategory; // inherited from NSObject

	static new(): MDCShapeCategory; // inherited from NSObject

	bottomLeftCorner: MDCCornerTreatment;

	bottomRightCorner: MDCCornerTreatment;

	topLeftCorner: MDCCornerTreatment;

	topRightCorner: MDCCornerTreatment;

	constructor(o: { cornersWithFamily: MDCShapeCornerFamily; andSize: number; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initCornersWithFamilyAndSize(cornerFamily: MDCShapeCornerFamily, cornerSize: number): this;
}

declare const enum MDCShapeCornerFamily {

	Rounded = 0,

	Cut = 1
}

interface MDCShapeGenerating extends NSCopying {

	pathForSize(size: CGSize): any;
}
declare var MDCShapeGenerating: {

	prototype: MDCShapeGenerating;
};

declare class MDCShapeScheme extends NSObject implements MDCShapeScheming {

	static alloc(): MDCShapeScheme; // inherited from NSObject

	static new(): MDCShapeScheme; // inherited from NSObject

	largeComponentShape: MDCShapeCategory;

	mediumComponentShape: MDCShapeCategory;

	smallComponentShape: MDCShapeCategory;

	constructor(o: { defaults: MDCShapeSchemeDefaults; });

	initWithDefaults(defaults: MDCShapeSchemeDefaults): this;
}

declare const enum MDCShapeSchemeDefaults {

	Material201809 = 0
}

interface MDCShapeScheming {

	largeComponentShape: MDCShapeCategory;

	mediumComponentShape: MDCShapeCategory;

	smallComponentShape: MDCShapeCategory;
}
declare var MDCShapeScheming: {

	prototype: MDCShapeScheming;
};

declare class MDCShapedShadowLayer extends MDCShadowLayer {

	static alloc(): MDCShapedShadowLayer; // inherited from NSObject

	static layer(): MDCShapedShadowLayer; // inherited from CALayer

	static new(): MDCShapedShadowLayer; // inherited from NSObject

	colorLayer: CAShapeLayer;

	shapeGenerator: MDCShapeGenerating;

	shapeLayer: CAShapeLayer;

	shapedBackgroundColor: UIColor;

	shapedBorderColor: UIColor;

	shapedBorderWidth: number;
}

declare class MDCShapedView extends UIView {

	static alloc(): MDCShapedView; // inherited from NSObject

	static appearance(): MDCShapedView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCShapedView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCShapedView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCShapedView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCShapedView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCShapedView; // inherited from UIAppearance

	static new(): MDCShapedView; // inherited from NSObject

	elevation: number;

	shapeGenerator: MDCShapeGenerating;

	constructor(o: { frame: CGRect; shapeGenerator: MDCShapeGenerating; });

	initWithFrameShapeGenerator(frame: CGRect, shapeGenerator: MDCShapeGenerating): this;
}

declare const enum MDCSheetState {

	Closed = 0,

	Preferred = 1,

	Extended = 2
}

declare class MDCSlantedRectShapeGenerator extends NSObject implements MDCShapeGenerating {

	static alloc(): MDCSlantedRectShapeGenerator; // inherited from NSObject

	static new(): MDCSlantedRectShapeGenerator; // inherited from NSObject

	slant: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	pathForSize(size: CGSize): any;
}

declare class MDCSlider extends UIControl implements MDCElevatable, MDCElevationOverriding, UIContentSizeCategoryAdjusting {

	static alloc(): MDCSlider; // inherited from NSObject

	static appearance(): MDCSlider; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCSlider; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCSlider; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCSlider; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCSlider; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCSlider; // inherited from UIAppearance

	static new(): MDCSlider; // inherited from NSObject

	color: UIColor;

	continuous: boolean;

	delegate: MDCSliderDelegate;

	disabledColor: UIColor;

	discrete: boolean;

	discreteValueLabelFont: UIFont;

	enableRippleBehavior: boolean;

	filledTrackAnchorValue: number;

	hapticsEnabled: boolean;

	inkColor: UIColor;

	maximumValue: number;

	minimumValue: number;

	numberOfDiscreteValues: number;

	rippleColor: UIColor;

	shouldDisplayDiscreteValueLabel: boolean;

	shouldEnableHapticsForAllDiscreteValues: boolean;

	statefulAPIEnabled: boolean;

	thumbElevation: number;

	thumbHollowAtStart: boolean;

	thumbRadius: number;

	thumbShadowColor: UIColor;

	trackBackgroundColor: UIColor;

	trackHeight: number;

	trackTickVisibility: MDCSliderTrackTickVisibility;

	traitCollectionDidChangeBlock: (p1: MDCSlider, p2: UITraitCollection) => void;

	value: number;

	valueLabelBackgroundColor: UIColor;

	valueLabelTextColor: UIColor;

	adjustsFontForContentSizeCategory: boolean; // inherited from UIContentSizeCategoryAdjusting

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	backgroundTrackTickColorForState(state: UIControlState): UIColor;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	filledTrackTickColorForState(state: UIControlState): UIColor;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setBackgroundTrackTickColorForState(tickColor: UIColor, state: UIControlState): void;

	setFilledTrackTickColorForState(tickColor: UIColor, state: UIControlState): void;

	setThumbColorForState(thumbColor: UIColor, state: UIControlState): void;

	setTrackBackgroundColorForState(backgroundColor: UIColor, state: UIControlState): void;

	setTrackFillColorForState(fillColor: UIColor, state: UIControlState): void;

	setValueAnimated(value: number, animated: boolean): void;

	thumbColorForState(state: UIControlState): UIColor;

	trackBackgroundColorForState(state: UIControlState): UIColor;

	trackFillColorForState(state: UIControlState): UIColor;
}

declare class MDCSliderColorThemer extends NSObject {

	static alloc(): MDCSliderColorThemer; // inherited from NSObject

	static applyColorSchemeToSlider(colorScheme: MDCColorScheme, slider: MDCSlider): void;

	static applySemanticColorSchemeToSlider(colorScheme: MDCColorScheming, slider: MDCSlider): void;

	static defaultSliderDarkColorScheme(): MDCBasicColorScheme;

	static defaultSliderLightColorScheme(): MDCBasicColorScheme;

	static new(): MDCSliderColorThemer; // inherited from NSObject
}

interface MDCSliderDelegate extends NSObjectProtocol {

	sliderAccessibilityLabelForValue?(slider: MDCSlider, value: number): string;

	sliderDisplayedStringForValue?(slider: MDCSlider, value: number): string;

	sliderShouldJumpToValue?(slider: MDCSlider, value: number): boolean;
}
declare var MDCSliderDelegate: {

	prototype: MDCSliderDelegate;
};

declare const enum MDCSliderTrackTickVisibility {

	Never = 0,

	WhenDragging = 1,

	Always = 2
}

declare const enum MDCSnackbarAlignment {

	Center = 0,

	Leading = 1
}

declare class MDCSnackbarColorThemer extends NSObject {

	static alloc(): MDCSnackbarColorThemer; // inherited from NSObject

	static applyColorSchemeToSnackbarMessageView(colorScheme: MDCColorScheme, snackbarMessageView: MDCSnackbarMessageView): void;

	static applySemanticColorScheme(colorScheme: MDCColorScheming): void;

	static applySemanticColorSchemeToSnackbarManager(colorScheme: MDCColorScheming, snackbarManager: MDCSnackbarManager): void;

	static new(): MDCSnackbarColorThemer; // inherited from NSObject
}

declare class MDCSnackbarManager extends NSObject implements MDCElevationOverriding {

	static alloc(): MDCSnackbarManager; // inherited from NSObject

	static buttonTitleColorForState(state: UIControlState): UIColor;

	static dismissAndCallCompletionBlocksWithCategory(category: string): void;

	static hasMessagesShowingOrQueued(): boolean;

	static new(): MDCSnackbarManager; // inherited from NSObject

	static resumeMessagesWithToken(token: MDCSnackbarSuspensionToken): void;

	static setBottomOffset(offset: number): void;

	static setButtonTitleColorForState(titleColor: UIColor, state: UIControlState): void;

	static setPresentationHostView(hostView: UIView): void;

	static showMessage(message: MDCSnackbarMessage): void;

	static suspendAllMessages(): MDCSnackbarSuspensionToken;

	static suspendMessagesWithCategory(category: string): MDCSnackbarSuspensionToken;

	adjustsFontForContentSizeCategoryWhenScaledFontIsUnavailable: boolean;

	alignment: MDCSnackbarAlignment;

	buttonFont: UIFont;

	buttonInkColor: UIColor;

	delegate: MDCSnackbarManagerDelegate;

	disabledButtonAlpha: number;

	mdc_adjustsFontForContentSizeCategory: boolean;

	mdc_elevationDidChangeBlockForMessageView: (p1: MDCElevatable, p2: number) => void;

	messageElevation: number;

	messageFont: UIFont;

	messageTextColor: UIColor;

	shouldApplyStyleChangesToVisibleSnackbars: boolean;

	shouldEnableAccessibilityViewIsModal: boolean;

	snackbarMessageViewBackgroundColor: UIColor;

	snackbarMessageViewShadowColor: UIColor;

	traitCollectionDidChangeBlockForMessageView: (p1: MDCSnackbarMessageView, p2: UITraitCollection) => void;

	uppercaseButtonTitle: boolean;

	static alignment: MDCSnackbarAlignment;

	static buttonFont: UIFont;

	static readonly defaultManager: MDCSnackbarManager;

	static delegate: MDCSnackbarManagerDelegate;

	static mdc_adjustsFontForContentSizeCategory: boolean;

	static messageFont: UIFont;

	static messageTextColor: UIColor;

	static shouldApplyStyleChangesToVisibleSnackbars: boolean;

	static snackbarMessageViewBackgroundColor: UIColor;

	static snackbarMessageViewShadowColor: UIColor;

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	buttonTitleColorForState(state: UIControlState): UIColor;

	dismissAndCallCompletionBlocksWithCategory(category: string): void;

	hasMessagesShowingOrQueued(): boolean;

	resumeMessagesWithToken(token: MDCSnackbarSuspensionToken): void;

	setBottomOffset(offset: number): void;

	setButtonTitleColorForState(titleColor: UIColor, state: UIControlState): void;

	setPresentationHostView(hostView: UIView): void;

	showMessage(message: MDCSnackbarMessage): void;

	suspendAllMessages(): MDCSnackbarSuspensionToken;

	suspendMessagesWithCategory(category: string): MDCSnackbarSuspensionToken;
}

interface MDCSnackbarManagerDelegate extends NSObjectProtocol {

	willPresentSnackbarWithMessageView(messageView: MDCSnackbarMessageView): void;
}
declare var MDCSnackbarManagerDelegate: {

	prototype: MDCSnackbarManagerDelegate;
};

declare class MDCSnackbarMessage extends NSObject implements NSCopying, UIAccessibilityIdentification {

	static alloc(): MDCSnackbarMessage; // inherited from NSObject

	static messageWithAttributedText(attributedText: NSAttributedString): MDCSnackbarMessage;

	static messageWithText(text: string): MDCSnackbarMessage;

	static new(): MDCSnackbarMessage; // inherited from NSObject

	action: MDCSnackbarMessageAction;

	attributedText: NSAttributedString;

	buttonTextColor: UIColor;

	category: string;

	completionHandler: (p1: boolean) => void;

	duration: number;

	enableRippleBehavior: boolean;

	focusOnShow: boolean;

	snackbarMessageWillPresentBlock: (p1: MDCSnackbarMessage, p2: MDCSnackbarMessageView) => void;

	text: string;

	readonly voiceNotificationText: string;

	static usesLegacySnackbar: boolean;

	accessibilityIdentifier: string; // inherited from UIAccessibilityIdentification

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCSnackbarMessageAction extends NSObject implements NSCopying, UIAccessibilityIdentification {

	static alloc(): MDCSnackbarMessageAction; // inherited from NSObject

	static new(): MDCSnackbarMessageAction; // inherited from NSObject

	handler: () => void;

	title: string;

	accessibilityIdentifier: string; // inherited from UIAccessibilityIdentification

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare var MDCSnackbarMessageBoldAttributeName: string;

declare var MDCSnackbarMessageDurationMax: number;

declare class MDCSnackbarMessageView extends UIView implements MDCElevatable, MDCElevationOverriding {

	static alloc(): MDCSnackbarMessageView; // inherited from NSObject

	static appearance(): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCSnackbarMessageView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCSnackbarMessageView; // inherited from UIAppearance

	static new(): MDCSnackbarMessageView; // inherited from NSObject

	actionButtons: NSMutableArray<MDCButton>;

	adjustsFontForContentSizeCategoryWhenScaledFontIsUnavailable: boolean;

	buttonFont: UIFont;

	elevation: number;

	mdc_adjustsFontForContentSizeCategory: boolean;

	messageFont: UIFont;

	messageTextColor: UIColor;

	snackbarMessageViewBackgroundColor: UIColor;

	snackbarMessageViewShadowColor: UIColor;

	snackbarMessageViewTextColor: UIColor;

	traitCollectionDidChangeBlock: (p1: MDCSnackbarMessageView, p2: UITraitCollection) => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	buttonTitleColorForState(state: UIControlState): UIColor;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setButtonTitleColorForState(titleColor: UIColor, state: UIControlState): void;
}

interface MDCSnackbarSuspensionToken extends NSObjectProtocol {
}
declare var MDCSnackbarSuspensionToken: {

	prototype: MDCSnackbarSuspensionToken;
};

declare class MDCStatefulRippleView extends MDCRippleView {

	static alloc(): MDCStatefulRippleView; // inherited from NSObject

	static appearance(): MDCStatefulRippleView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCStatefulRippleView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCStatefulRippleView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCStatefulRippleView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCStatefulRippleView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCStatefulRippleView; // inherited from UIAppearance

	static new(): MDCStatefulRippleView; // inherited from NSObject

	allowsSelection: boolean;

	dragged: boolean;

	rippleHighlighted: boolean;

	selected: boolean;

	rippleColorForState(state: MDCRippleState): UIColor;

	setRippleColorForState(rippleColor: UIColor, state: MDCRippleState): void;
}

declare class MDCSystemFontLoader extends NSObject implements MDCTypographyFontLoading {

	static alloc(): MDCSystemFontLoader; // inherited from NSObject

	static new(): MDCSystemFontLoader; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	boldFontFromFont(font: UIFont): UIFont;

	boldFontOfSize(fontSize: number): UIFont;

	boldItalicFontOfSize(fontSize: number): UIFont;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isLargeForContrastRatios(font: UIFont): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	italicFontFromFont(font: UIFont): UIFont;

	italicFontOfSize(fontSize: number): UIFont;

	lightFontOfSize(fontSize: number): UIFont;

	mediumFontOfSize(fontSize: number): UIFont;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	regularFontOfSize(fontSize: number): UIFont;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCTabBar extends UIView implements MDCElevatable, MDCElevationOverriding, UIBarPositioning {

	static alloc(): MDCTabBar; // inherited from NSObject

	static appearance(): MDCTabBar; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCTabBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCTabBar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCTabBar; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCTabBar; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCTabBar; // inherited from UIAppearance

	static defaultHeightForBarPositionItemAppearance(position: UIBarPosition, appearance: MDCTabBarItemAppearance): number;

	static defaultHeightForItemAppearance(appearance: MDCTabBarItemAppearance): number;

	static new(): MDCTabBar; // inherited from NSObject

	alignment: MDCTabBarAlignment;

	barTintColor: UIColor;

	bottomDividerColor: UIColor;

	delegate: MDCTabBarDelegate;

	displayDelegate: NSObject;

	displaysUppercaseTitles: boolean;

	enableRippleBehavior: boolean;

	inkColor: UIColor;

	itemAppearance: MDCTabBarItemAppearance;

	items: NSArray<UITabBarItem>;

	rippleColor: UIColor;

	selectedItem: UITabBarItem;

	selectedItemTintColor: UIColor;

	selectedItemTitleFont: UIFont;

	selectionIndicatorTemplate: MDCTabBarIndicatorTemplate;

	sizeClassDelegate: NSObject;

	titleTextTransform: MDCTabBarTextTransform;

	traitCollectionDidChangeBlock: (p1: MDCTabBar, p2: UITraitCollection) => void;

	unselectedItemTintColor: UIColor;

	unselectedItemTitleFont: UIFont;

	readonly barPosition: UIBarPosition; // inherited from UIBarPositioning

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	accessibilityElementForItem(item: UITabBarItem): any;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	imageTintColorForState(state: MDCTabBarItemState): UIColor;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setAlignmentAnimated(alignment: MDCTabBarAlignment, animated: boolean): void;

	setImageTintColorForState(color: UIColor, state: MDCTabBarItemState): void;

	setSelectedItemAnimated(selectedItem: UITabBarItem, animated: boolean): void;

	setTitleColorForState(color: UIColor, state: MDCTabBarItemState): void;

	titleColorForState(state: MDCTabBarItemState): UIColor;
}

declare const enum MDCTabBarAlignment {

	Leading = 0,

	Justified = 1,

	Center = 2,

	CenterSelected = 3
}

interface MDCTabBarControllerDelegate extends NSObjectProtocol {

	tabBarControllerDidSelectViewController?(tabBarController: MDCTabBarViewController, viewController: UIViewController): void;

	tabBarControllerShouldSelectViewController?(tabBarController: MDCTabBarViewController, viewController: UIViewController): boolean;
}
declare var MDCTabBarControllerDelegate: {

	prototype: MDCTabBarControllerDelegate;
};

interface MDCTabBarDelegate extends UIBarPositioningDelegate {

	tabBarDidSelectItem?(tabBar: MDCTabBar, item: UITabBarItem): void;

	tabBarShouldSelectItem?(tabBar: MDCTabBar, item: UITabBarItem): boolean;

	tabBarWillSelectItem?(tabBar: MDCTabBar, item: UITabBarItem): void;
}
declare var MDCTabBarDelegate: {

	prototype: MDCTabBarDelegate;
};

interface MDCTabBarDisplayDelegate {

	tabBarDidEndDisplayingItem(tabBar: MDCTabBar, item: UITabBarItem): void;

	tabBarWillDisplayItem(tabBar: MDCTabBar, item: UITabBarItem): void;
}
declare var MDCTabBarDisplayDelegate: {

	prototype: MDCTabBarDisplayDelegate;
};

declare const enum MDCTabBarExtendedAlignment {

	Leading = 0,

	Justified = 1,

	Center = 2,

	CenterSelected = 3,

	BestEffortJustified = 4
}

declare class MDCTabBarIndicatorAttributes extends NSObject implements NSCopying {

	static alloc(): MDCTabBarIndicatorAttributes; // inherited from NSObject

	static new(): MDCTabBarIndicatorAttributes; // inherited from NSObject

	path: UIBezierPath;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

interface MDCTabBarIndicatorContext extends NSObjectProtocol {

	bounds: CGRect;

	contentFrame: CGRect;

	item: UITabBarItem;
}
declare var MDCTabBarIndicatorContext: {

	prototype: MDCTabBarIndicatorContext;
};

interface MDCTabBarIndicatorTemplate extends NSObjectProtocol {

	indicatorAttributesForContext(context: MDCTabBarIndicatorContext): MDCTabBarIndicatorAttributes;
}
declare var MDCTabBarIndicatorTemplate: {

	prototype: MDCTabBarIndicatorTemplate;
};

declare const enum MDCTabBarItemAppearance {

	Titles = 0,

	Images = 1,

	TitledImages = 2
}

declare const enum MDCTabBarItemState {

	Normal = 0,

	Selected = 1
}

interface MDCTabBarSizeClassDelegate {

	horizontalSizeClassForObject?(object: UITraitEnvironment): UIUserInterfaceSizeClass;
}
declare var MDCTabBarSizeClassDelegate: {

	prototype: MDCTabBarSizeClassDelegate;
};

declare const enum MDCTabBarTextTransform {

	Automatic = 0,

	None = 1,

	Uppercase = 2
}

declare class MDCTabBarUnderlineIndicatorTemplate extends NSObject implements MDCTabBarIndicatorTemplate {

	static alloc(): MDCTabBarUnderlineIndicatorTemplate; // inherited from NSObject

	static new(): MDCTabBarUnderlineIndicatorTemplate; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	indicatorAttributesForContext(context: MDCTabBarIndicatorContext): MDCTabBarIndicatorAttributes;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCTabBarViewController extends UIViewController implements MDCTabBarDelegate, UIBarPositioningDelegate {

	static alloc(): MDCTabBarViewController; // inherited from NSObject

	static new(): MDCTabBarViewController; // inherited from NSObject

	delegate: MDCTabBarControllerDelegate;

	selectedViewController: UIViewController;

	readonly tabBar: MDCTabBar;

	tabBarHidden: boolean;

	traitCollectionDidChangeBlock: (p1: MDCTabBarViewController, p2: UITraitCollection) => void;

	viewControllers: NSArray<UIViewController>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	positionForBar(bar: UIBarPositioning): UIBarPosition;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setTabBarHiddenAnimated(hidden: boolean, animated: boolean): void;

	tabBarDidSelectItem(tabBar: MDCTabBar, item: UITabBarItem): void;

	tabBarShouldSelectItem(tabBar: MDCTabBar, item: UITabBarItem): boolean;

	tabBarWillSelectItem(tabBar: MDCTabBar, item: UITabBarItem): void;
}

declare var MDCTabBarViewControllerAnimationDuration: number;

declare class MDCTextButtonColorThemer extends NSObject {

	static alloc(): MDCTextButtonColorThemer; // inherited from NSObject

	static applySemanticColorSchemeToButton(colorScheme: MDCColorScheming, button: MDCButton): void;

	static new(): MDCTextButtonColorThemer; // inherited from NSObject
}

declare class MDCTextButtonThemer extends NSObject {

	static alloc(): MDCTextButtonThemer; // inherited from NSObject

	static applySchemeToButton(scheme: MDCButtonScheming, button: MDCButton): void;

	static new(): MDCTextButtonThemer; // inherited from NSObject
}

declare class MDCTextField extends UITextField implements MDCElevatable, MDCElevationOverriding, MDCLeadingViewTextInput, MDCTextInput {

	static alloc(): MDCTextField; // inherited from NSObject

	static appearance(): MDCTextField; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCTextField; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCTextField; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCTextField; // inherited from UIAppearance

	static new(): MDCTextField; // inherited from NSObject

	readonly inputLayoutStrut: UILabel;

	traitCollectionDidChangeBlock: (p1: MDCTextField, p2: UITraitCollection) => void;

	attributedPlaceholder: NSAttributedString; // inherited from MDCTextInput

	attributedText: NSAttributedString; // inherited from MDCTextInput

	borderPath: UIBezierPath; // inherited from MDCTextInput

	borderView: MDCTextInputBorderView; // inherited from MDCTextInput

	readonly clearButton: UIButton; // inherited from MDCTextInput

	clearButtonMode: UITextFieldViewMode; // inherited from MDCTextInput

	cursorColor: UIColor; // inherited from MDCTextInput

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly editing: boolean; // inherited from MDCTextInput

	enabled: boolean; // inherited from MDCTextInput

	font: UIFont; // inherited from MDCTextInput

	readonly hasTextContent: boolean; // inherited from MDCTextInput

	readonly hash: number; // inherited from NSObjectProtocol

	hidesPlaceholderOnInput: boolean; // inherited from MDCTextInput

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly leadingUnderlineLabel: UILabel; // inherited from MDCTextInput

	leadingView: UIView; // inherited from MDCLeadingViewTextInput

	leadingViewMode: UITextFieldViewMode; // inherited from MDCLeadingViewTextInput

	mdc_adjustsFontForContentSizeCategory: boolean; // inherited from MDCTextInput

	readonly mdc_currentElevation: number; // inherited from MDCElevatable

	mdc_elevationDidChangeBlock: (p1: MDCElevatable, p2: number) => void; // inherited from MDCElevatable

	mdc_overrideBaseElevation: number; // inherited from MDCElevationOverriding

	placeholder: string; // inherited from MDCTextInput

	readonly placeholderLabel: UILabel; // inherited from MDCTextInput

	positioningDelegate: MDCTextInputPositioningDelegate; // inherited from MDCTextInput

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	text: string; // inherited from MDCTextInput

	textColor: UIColor; // inherited from MDCTextInput

	readonly textInsets: UIEdgeInsets; // inherited from MDCTextInput

	textInsetsMode: MDCTextInputTextInsetsMode; // inherited from MDCTextInput

	readonly trailingUnderlineLabel: UILabel; // inherited from MDCTextInput

	trailingView: UIView; // inherited from MDCTextInput

	trailingViewMode: UITextFieldViewMode; // inherited from MDCTextInput

	readonly underline: MDCTextInputUnderlineView; // inherited from MDCTextInput

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	clearText(): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCTextFieldColorThemer extends NSObject {

	static alloc(): MDCTextFieldColorThemer; // inherited from NSObject

	static applyColorSchemeToAllTextInputControllersOfClass(colorScheme: MDCColorScheme, textInputControllerClass: typeof NSObject): void;

	static applyColorSchemeToTextInputController(colorScheme: MDCColorScheme, textInputController: MDCTextInputController): void;

	static applySemanticColorSchemeToAllTextInputControllersOfClass(colorScheme: MDCColorScheming, textInputControllerClass: typeof NSObject): void;

	static applySemanticColorSchemeToTextInput(colorScheme: MDCColorScheming, textInput: MDCTextInput): void;

	static applySemanticColorSchemeToTextInputController(colorScheme: MDCColorScheming, textInputController: MDCTextInputController): void;

	static new(): MDCTextFieldColorThemer; // inherited from NSObject
}

declare var MDCTextFieldTextDidSetTextNotification: string;

interface MDCTextInput extends NSObjectProtocol {

	attributedPlaceholder: NSAttributedString;

	attributedText: NSAttributedString;

	borderPath: UIBezierPath;

	borderView: MDCTextInputBorderView;

	clearButton: UIButton;

	clearButtonMode: UITextFieldViewMode;

	cursorColor: UIColor;

	editing: boolean;

	enabled: boolean;

	font: UIFont;

	hasTextContent: boolean;

	hidesPlaceholderOnInput: boolean;

	leadingUnderlineLabel: UILabel;

	mdc_adjustsFontForContentSizeCategory: boolean;

	placeholder: string;

	placeholderLabel: UILabel;

	positioningDelegate: MDCTextInputPositioningDelegate;

	text: string;

	textColor: UIColor;

	textInsets: UIEdgeInsets;

	textInsetsMode: MDCTextInputTextInsetsMode;

	trailingUnderlineLabel: UILabel;

	trailingView: UIView;

	trailingViewMode: UITextFieldViewMode;

	underline: MDCTextInputUnderlineView;

	clearText(): void;
}
declare var MDCTextInput: {

	prototype: MDCTextInput;
};

declare class MDCTextInputAllCharactersCounter extends NSObject implements MDCTextInputCharacterCounter {

	static alloc(): MDCTextInputAllCharactersCounter; // inherited from NSObject

	static new(): MDCTextInputAllCharactersCounter; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	characterCountForTextInput(textInput: UIView): number;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCTextInputBorderView extends UIView implements NSCopying {

	static alloc(): MDCTextInputBorderView; // inherited from NSObject

	static appearance(): MDCTextInputBorderView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCTextInputBorderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCTextInputBorderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCTextInputBorderView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCTextInputBorderView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCTextInputBorderView; // inherited from UIAppearance

	static new(): MDCTextInputBorderView; // inherited from NSObject

	borderFillColor: UIColor;

	borderPath: UIBezierPath;

	borderStrokeColor: UIColor;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

interface MDCTextInputCharacterCounter extends NSObjectProtocol {

	characterCountForTextInput(textInput: UIView): number;
}
declare var MDCTextInputCharacterCounter: {

	prototype: MDCTextInputCharacterCounter;
};

interface MDCTextInputController extends MDCTextInputPositioningDelegate, NSCopying, NSObjectProtocol {

	activeColor: UIColor;

	characterCountMax: number;

	characterCountViewMode: UITextFieldViewMode;

	characterCounter: MDCTextInputCharacterCounter;

	disabledColor: UIColor;

	errorColor: UIColor;

	errorText: string;

	helperText: string;

	inlinePlaceholderColor: UIColor;

	inlinePlaceholderFont: UIFont;

	leadingUnderlineLabelFont: UIFont;

	leadingUnderlineLabelTextColor: UIColor;

	mdc_adjustsFontForContentSizeCategory: boolean;

	normalColor: UIColor;

	placeholderText: string;

	roundedCorners: UIRectCorner;

	textInput: UIView;

	textInputClearButtonTintColor: UIColor;

	textInputFont: UIFont;

	trailingUnderlineLabelFont: UIFont;

	trailingUnderlineLabelTextColor: UIColor;

	underlineHeightActive: number;

	underlineHeightNormal: number;

	underlineViewMode: UITextFieldViewMode;

	initWithTextInput?(input: UIView): MDCTextInputController;

	setErrorTextErrorAccessibilityValue(errorText: string, errorAccessibilityValue: string): void;

	setHelperTextHelperAccessibilityLabel(helperText: string, helperAccessibilityLabel: string): void;
}
declare var MDCTextInputController: {

	prototype: MDCTextInputController;
};

declare class MDCTextInputControllerBase extends NSObject implements MDCTextInputControllerFloatingPlaceholder {

	static alloc(): MDCTextInputControllerBase; // inherited from NSObject

	static new(): MDCTextInputControllerBase; // inherited from NSObject

	borderFillColor: UIColor;

	borderStrokeColor: UIColor;

	expandsOnOverflow: boolean;

	minimumLines: number;

	static borderFillColorDefault: UIColor;

	activeColor: UIColor; // inherited from MDCTextInputController

	characterCountMax: number; // inherited from MDCTextInputController

	characterCountViewMode: UITextFieldViewMode; // inherited from MDCTextInputController

	characterCounter: MDCTextInputCharacterCounter; // inherited from MDCTextInputController

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	disabledColor: UIColor; // inherited from MDCTextInputController

	errorColor: UIColor; // inherited from MDCTextInputController

	readonly errorText: string; // inherited from MDCTextInputController

	floatingEnabled: boolean; // inherited from MDCTextInputControllerFloatingPlaceholder

	floatingPlaceholderActiveColor: UIColor; // inherited from MDCTextInputControllerFloatingPlaceholder

	floatingPlaceholderErrorActiveColor: UIColor; // inherited from MDCTextInputControllerFloatingPlaceholder

	floatingPlaceholderNormalColor: UIColor; // inherited from MDCTextInputControllerFloatingPlaceholder

	readonly floatingPlaceholderOffset: UIOffset; // inherited from MDCTextInputControllerFloatingPlaceholder

	floatingPlaceholderScale: number; // inherited from MDCTextInputControllerFloatingPlaceholder

	readonly hash: number; // inherited from NSObjectProtocol

	helperText: string; // inherited from MDCTextInputController

	inlinePlaceholderColor: UIColor; // inherited from MDCTextInputController

	inlinePlaceholderFont: UIFont; // inherited from MDCTextInputController

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	leadingUnderlineLabelFont: UIFont; // inherited from MDCTextInputController

	leadingUnderlineLabelTextColor: UIColor; // inherited from MDCTextInputController

	mdc_adjustsFontForContentSizeCategory: boolean; // inherited from MDCTextInputController

	normalColor: UIColor; // inherited from MDCTextInputController

	placeholderText: string; // inherited from MDCTextInputController

	roundedCorners: UIRectCorner; // inherited from MDCTextInputController

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	textInput: UIView; // inherited from MDCTextInputController

	textInputClearButtonTintColor: UIColor; // inherited from MDCTextInputController

	textInputFont: UIFont; // inherited from MDCTextInputController

	trailingUnderlineLabelFont: UIFont; // inherited from MDCTextInputController

	trailingUnderlineLabelTextColor: UIColor; // inherited from MDCTextInputController

	underlineHeightActive: number; // inherited from MDCTextInputController

	underlineHeightNormal: number; // inherited from MDCTextInputController

	underlineViewMode: UITextFieldViewMode; // inherited from MDCTextInputController

	readonly  // inherited from NSObjectProtocol

	static activeColorDefault: UIColor; // inherited from MDCTextInputController

	static disabledColorDefault: UIColor; // inherited from MDCTextInputController

	static errorColorDefault: UIColor; // inherited from MDCTextInputController

	static floatingEnabledDefault: boolean; // inherited from MDCTextInputControllerFloatingPlaceholder

	static floatingPlaceholderActiveColorDefault: UIColor; // inherited from MDCTextInputControllerFloatingPlaceholder

	static floatingPlaceholderNormalColorDefault: UIColor; // inherited from MDCTextInputControllerFloatingPlaceholder

	static floatingPlaceholderScaleDefault: number; // inherited from MDCTextInputControllerFloatingPlaceholder

	static inlinePlaceholderColorDefault: UIColor; // inherited from MDCTextInputController

	static inlinePlaceholderFontDefault: UIFont; // inherited from MDCTextInputController

	static leadingUnderlineLabelFontDefault: UIFont; // inherited from MDCTextInputController

	static leadingUnderlineLabelTextColorDefault: UIColor; // inherited from MDCTextInputController

	static mdc_adjustsFontForContentSizeCategoryDefault: boolean; // inherited from MDCTextInputController

	static normalColorDefault: UIColor; // inherited from MDCTextInputController

	static roundedCornersDefault: UIRectCorner; // inherited from MDCTextInputController

	static textInputClearButtonTintColorDefault: UIColor; // inherited from MDCTextInputController

	static textInputFontDefault: UIFont; // inherited from MDCTextInputController

	static trailingUnderlineLabelFontDefault: UIFont; // inherited from MDCTextInputController

	static trailingUnderlineLabelTextColorDefault: UIColor; // inherited from MDCTextInputController

	static underlineHeightActiveDefault: number; // inherited from MDCTextInputController

	static underlineHeightNormalDefault: number; // inherited from MDCTextInputController

	static underlineViewModeDefault: UITextFieldViewMode; // inherited from MDCTextInputController

	constructor(o: { textInput: UIView; }); // inherited from MDCTextInputController

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	editingRectForBoundsDefaultRect(bounds: CGRect, defaultRect: CGRect): CGRect;

	initWithTextInput(input: UIView): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	leadingViewRectForBoundsDefaultRect(bounds: CGRect, defaultRect: CGRect): CGRect;

	leadingViewTrailingPaddingConstant(): number;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setErrorTextErrorAccessibilityValue(errorText: string, errorAccessibilityValue: string): void;

	setHelperTextHelperAccessibilityLabel(helperText: string, helperAccessibilityLabel: string): void;

	textInputDidLayoutSubviews(): void;

	textInputDidUpdateConstraints(): void;

	textInsets(defaultInsets: UIEdgeInsets): UIEdgeInsets;

	textInsetsWithSizeThatFitsWidthHint(defaultInsets: UIEdgeInsets, widthHint: number): UIEdgeInsets;

	trailingViewRectForBoundsDefaultRect(bounds: CGRect, defaultRect: CGRect): CGRect;

	trailingViewTrailingPaddingConstant(): number;
}

declare var MDCTextInputControllerBaseDefaultBorderRadius: number;

declare class MDCTextInputControllerFilled extends MDCTextInputControllerBase {

	static alloc(): MDCTextInputControllerFilled; // inherited from NSObject

	static new(): MDCTextInputControllerFilled; // inherited from NSObject
}

interface MDCTextInputControllerFloatingPlaceholder extends MDCTextInputController {

	floatingEnabled: boolean;

	floatingPlaceholderActiveColor: UIColor;

	floatingPlaceholderErrorActiveColor: UIColor;

	floatingPlaceholderNormalColor: UIColor;

	floatingPlaceholderOffset: UIOffset;

	floatingPlaceholderScale: number;
}
declare var MDCTextInputControllerFloatingPlaceholder: {

	prototype: MDCTextInputControllerFloatingPlaceholder;
};

declare class MDCTextInputControllerFullWidth extends NSObject implements MDCTextInputController {

	static alloc(): MDCTextInputControllerFullWidth; // inherited from NSObject

	static new(): MDCTextInputControllerFullWidth; // inherited from NSObject

	backgroundColor: UIColor;

	static backgroundColorDefault: UIColor;

	activeColor: UIColor; // inherited from MDCTextInputController

	characterCountMax: number; // inherited from MDCTextInputController

	characterCountViewMode: UITextFieldViewMode; // inherited from MDCTextInputController

	characterCounter: MDCTextInputCharacterCounter; // inherited from MDCTextInputController

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	disabledColor: UIColor; // inherited from MDCTextInputController

	errorColor: UIColor; // inherited from MDCTextInputController

	readonly errorText: string; // inherited from MDCTextInputController

	readonly hash: number; // inherited from NSObjectProtocol

	helperText: string; // inherited from MDCTextInputController

	inlinePlaceholderColor: UIColor; // inherited from MDCTextInputController

	inlinePlaceholderFont: UIFont; // inherited from MDCTextInputController

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	leadingUnderlineLabelFont: UIFont; // inherited from MDCTextInputController

	leadingUnderlineLabelTextColor: UIColor; // inherited from MDCTextInputController

	mdc_adjustsFontForContentSizeCategory: boolean; // inherited from MDCTextInputController

	normalColor: UIColor; // inherited from MDCTextInputController

	placeholderText: string; // inherited from MDCTextInputController

	roundedCorners: UIRectCorner; // inherited from MDCTextInputController

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	textInput: UIView; // inherited from MDCTextInputController

	textInputClearButtonTintColor: UIColor; // inherited from MDCTextInputController

	textInputFont: UIFont; // inherited from MDCTextInputController

	trailingUnderlineLabelFont: UIFont; // inherited from MDCTextInputController

	trailingUnderlineLabelTextColor: UIColor; // inherited from MDCTextInputController

	underlineHeightActive: number; // inherited from MDCTextInputController

	underlineHeightNormal: number; // inherited from MDCTextInputController

	underlineViewMode: UITextFieldViewMode; // inherited from MDCTextInputController

	readonly  // inherited from NSObjectProtocol

	static activeColorDefault: UIColor; // inherited from MDCTextInputController

	static disabledColorDefault: UIColor; // inherited from MDCTextInputController

	static errorColorDefault: UIColor; // inherited from MDCTextInputController

	static inlinePlaceholderColorDefault: UIColor; // inherited from MDCTextInputController

	static inlinePlaceholderFontDefault: UIFont; // inherited from MDCTextInputController

	static leadingUnderlineLabelFontDefault: UIFont; // inherited from MDCTextInputController

	static leadingUnderlineLabelTextColorDefault: UIColor; // inherited from MDCTextInputController

	static mdc_adjustsFontForContentSizeCategoryDefault: boolean; // inherited from MDCTextInputController

	static normalColorDefault: UIColor; // inherited from MDCTextInputController

	static roundedCornersDefault: UIRectCorner; // inherited from MDCTextInputController

	static textInputClearButtonTintColorDefault: UIColor; // inherited from MDCTextInputController

	static textInputFontDefault: UIFont; // inherited from MDCTextInputController

	static trailingUnderlineLabelFontDefault: UIFont; // inherited from MDCTextInputController

	static trailingUnderlineLabelTextColorDefault: UIColor; // inherited from MDCTextInputController

	static underlineHeightActiveDefault: number; // inherited from MDCTextInputController

	static underlineHeightNormalDefault: number; // inherited from MDCTextInputController

	static underlineViewModeDefault: UITextFieldViewMode; // inherited from MDCTextInputController

	constructor(o: { textInput: UIView; }); // inherited from MDCTextInputController

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	editingRectForBoundsDefaultRect(bounds: CGRect, defaultRect: CGRect): CGRect;

	initWithTextInput(input: UIView): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	leadingViewRectForBoundsDefaultRect(bounds: CGRect, defaultRect: CGRect): CGRect;

	leadingViewTrailingPaddingConstant(): number;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setErrorTextErrorAccessibilityValue(errorText: string, errorAccessibilityValue: string): void;

	setHelperTextHelperAccessibilityLabel(helperText: string, helperAccessibilityLabel: string): void;

	textInputDidLayoutSubviews(): void;

	textInputDidUpdateConstraints(): void;

	textInsets(defaultInsets: UIEdgeInsets): UIEdgeInsets;

	textInsetsWithSizeThatFitsWidthHint(defaultInsets: UIEdgeInsets, widthHint: number): UIEdgeInsets;

	trailingViewRectForBoundsDefaultRect(bounds: CGRect, defaultRect: CGRect): CGRect;

	trailingViewTrailingPaddingConstant(): number;
}

declare class MDCTextInputControllerLegacyDefault extends MDCTextInputControllerBase {

	static alloc(): MDCTextInputControllerLegacyDefault; // inherited from NSObject

	static new(): MDCTextInputControllerLegacyDefault; // inherited from NSObject
}

declare class MDCTextInputControllerLegacyFullWidth extends MDCTextInputControllerFullWidth {

	static alloc(): MDCTextInputControllerLegacyFullWidth; // inherited from NSObject

	static new(): MDCTextInputControllerLegacyFullWidth; // inherited from NSObject
}

declare class MDCTextInputControllerOutlined extends MDCTextInputControllerBase {

	static alloc(): MDCTextInputControllerOutlined; // inherited from NSObject

	static new(): MDCTextInputControllerOutlined; // inherited from NSObject
}

declare class MDCTextInputControllerOutlinedTextArea extends MDCTextInputControllerBase {

	static alloc(): MDCTextInputControllerOutlinedTextArea; // inherited from NSObject

	static new(): MDCTextInputControllerOutlinedTextArea; // inherited from NSObject
}

declare class MDCTextInputControllerUnderline extends MDCTextInputControllerBase {

	static alloc(): MDCTextInputControllerUnderline; // inherited from NSObject

	static new(): MDCTextInputControllerUnderline; // inherited from NSObject
}

declare var MDCTextInputDidToggleEnabledNotification: string;

interface MDCTextInputPositioningDelegate extends NSObjectProtocol {

	editingRectForBoundsDefaultRect?(bounds: CGRect, defaultRect: CGRect): CGRect;

	leadingViewRectForBoundsDefaultRect?(bounds: CGRect, defaultRect: CGRect): CGRect;

	leadingViewTrailingPaddingConstant?(): number;

	textInputDidLayoutSubviews?(): void;

	textInputDidUpdateConstraints?(): void;

	textInsets?(defaultInsets: UIEdgeInsets): UIEdgeInsets;

	textInsetsWithSizeThatFitsWidthHint?(defaultInsets: UIEdgeInsets, widthHint: number): UIEdgeInsets;

	trailingViewRectForBoundsDefaultRect?(bounds: CGRect, defaultRect: CGRect): CGRect;

	trailingViewTrailingPaddingConstant?(): number;
}
declare var MDCTextInputPositioningDelegate: {

	prototype: MDCTextInputPositioningDelegate;
};

declare const enum MDCTextInputTextInsetsMode {

	Never = 0,

	IfContent = 1,

	Always = 2
}

declare class MDCTextInputUnderlineView extends UIView implements NSCopying {

	static alloc(): MDCTextInputUnderlineView; // inherited from NSObject

	static appearance(): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCTextInputUnderlineView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCTextInputUnderlineView; // inherited from UIAppearance

	static new(): MDCTextInputUnderlineView; // inherited from NSObject

	color: UIColor;

	disabledColor: UIColor;

	enabled: boolean;

	lineHeight: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var MDCTextStyleBody1: string;

declare var MDCTextStyleBody2: string;

declare var MDCTextStyleButton: string;

declare var MDCTextStyleCaption: string;

declare var MDCTextStyleHeadline1: string;

declare var MDCTextStyleHeadline2: string;

declare var MDCTextStyleHeadline3: string;

declare var MDCTextStyleHeadline4: string;

declare var MDCTextStyleHeadline5: string;

declare var MDCTextStyleHeadline6: string;

declare var MDCTextStyleOverline: string;

declare var MDCTextStyleSubtitle1: string;

declare var MDCTextStyleSubtitle2: string;

declare const enum MDCThumbDiscreteDotVisibility {

	Never = 0,

	WhenDragging = 1,

	Always = 2
}

declare class MDCThumbTrack extends UIControl implements UIContentSizeCategoryAdjusting {

	static alloc(): MDCThumbTrack; // inherited from NSObject

	static appearance(): MDCThumbTrack; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCThumbTrack; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCThumbTrack; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCThumbTrack; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCThumbTrack; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCThumbTrack; // inherited from UIAppearance

	static new(): MDCThumbTrack; // inherited from NSObject

	continuousUpdateEvents: boolean;

	delegate: MDCThumbTrackDelegate;

	disabledTrackHasThumbGaps: boolean;

	discrete: boolean;

	discreteDotVisibility: MDCThumbDiscreteDotVisibility;

	discreteValueLabelFont: UIFont;

	enableRippleBehavior: boolean;

	filledTrackAnchorValue: number;

	inkColor: UIColor;

	maximumValue: number;

	minimumValue: number;

	numDiscreteValues: number;

	panningAllowedOnEntireControl: boolean;

	primaryColor: UIColor;

	rippleColor: UIColor;

	shouldDisplayDiscreteValueLabel: boolean;

	shouldDisplayFilledTrack: boolean;

	shouldDisplayInk: boolean;

	shouldDisplayRipple: boolean;

	tapsAllowedOnThumb: boolean;

	thumbDisabledColor: UIColor;

	thumbElevation: number;

	thumbEnabledColor: UIColor;

	thumbGrowsWhenDragging: boolean;

	thumbIsHollowAtStart: boolean;

	thumbIsSmallerWhenDisabled: boolean;

	thumbMaxRippleRadius: number;

	readonly thumbPosition: CGPoint;

	thumbRadius: number;

	thumbRippleMaximumRadius: number;

	thumbShadowColor: UIColor;

	thumbView: MDCThumbView;

	trackDisabledColor: UIColor;

	trackEndsAreInset: boolean;

	trackEndsAreRounded: boolean;

	trackHeight: number;

	trackOffColor: UIColor;

	trackOffTickColor: UIColor;

	trackOnColor: UIColor;

	trackOnTickColor: UIColor;

	value: number;

	valueLabelBackgroundColor: UIColor;

	valueLabelTextColor: UIColor;

	adjustsFontForContentSizeCategory: boolean; // inherited from UIContentSizeCategoryAdjusting

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { frame: CGRect; onTintColor: UIColor; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithFrameOnTintColor(frame: CGRect, onTintColor: UIColor): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setIcon(icon: UIImage): void;

	setValueAnimated(value: number, animated: boolean): void;

	setValueAnimatedAnimateThumbAfterMoveUserGeneratedCompletion(value: number, animated: boolean, animateThumbAfterMove: boolean, userGenerated: boolean, completion: () => void): void;
}

interface MDCThumbTrackDelegate extends NSObjectProtocol {

	thumbTrackDidAnimateToValue?(thumbTrack: MDCThumbTrack, value: number): void;

	thumbTrackShouldJumpToValue?(thumbTrack: MDCThumbTrack, value: number): boolean;

	thumbTrackStringForValue?(thumbTrack: MDCThumbTrack, value: number): string;

	thumbTrackWillAnimateToValue?(thumbTrack: MDCThumbTrack, value: number): void;

	thumbTrackWillJumpToValue?(thumbTrack: MDCThumbTrack, value: number): void;
}
declare var MDCThumbTrackDelegate: {

	prototype: MDCThumbTrackDelegate;
};

declare class MDCThumbView extends UIView {

	static alloc(): MDCThumbView; // inherited from NSObject

	static appearance(): MDCThumbView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): MDCThumbView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): MDCThumbView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCThumbView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): MDCThumbView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): MDCThumbView; // inherited from UIAppearance

	static new(): MDCThumbView; // inherited from NSObject

	borderWidth: number;

	cornerRadius: number;

	elevation: number;

	shadowColor: UIColor;

	setIcon(icon: UIImage): void;
}

declare class MDCTonalColorScheme extends NSObject implements MDCColorScheme, NSCopying {

	static alloc(): MDCTonalColorScheme; // inherited from NSObject

	static new(): MDCTonalColorScheme; // inherited from NSObject

	readonly primaryTonalPalette: MDCTonalPalette;

	readonly secondaryTonalPalette: MDCTonalPalette;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly primaryColor: UIColor; // inherited from MDCColorScheme

	readonly primaryDarkColor: UIColor; // inherited from MDCColorScheme

	readonly primaryLightColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryDarkColor: UIColor; // inherited from MDCColorScheme

	readonly secondaryLightColor: UIColor; // inherited from MDCColorScheme

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { primaryTonalPalette: MDCTonalPalette; secondaryTonalPalette: MDCTonalPalette; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithPrimaryTonalPaletteSecondaryTonalPalette(primaryTonalPalette: MDCTonalPalette, secondaryTonalPalette: MDCTonalPalette): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class MDCTonalPalette extends NSObject implements NSCopying {

	static alloc(): MDCTonalPalette; // inherited from NSObject

	static new(): MDCTonalPalette; // inherited from NSObject

	readonly colors: NSArray<UIColor>;

	readonly darkColor: UIColor;

	readonly darkColorIndex: number;

	readonly lightColor: UIColor;

	readonly lightColorIndex: number;

	readonly mainColor: UIColor;

	readonly mainColorIndex: number;

	constructor(o: { colors: NSArray<UIColor> | UIColor[]; mainColorIndex: number; lightColorIndex: number; darkColorIndex: number; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithColorsMainColorIndexLightColorIndexDarkColorIndex(colors: NSArray<UIColor> | UIColor[], mainColorIndex: number, lightColorIndex: number, darkColorIndex: number): this;
}

declare const enum MDCTriangleEdgeStyle {

	Handle = 0,

	Cut = 1
}

declare class MDCTriangleEdgeTreatment extends MDCEdgeTreatment {

	static alloc(): MDCTriangleEdgeTreatment; // inherited from NSObject

	static new(): MDCTriangleEdgeTreatment; // inherited from NSObject

	size: number;

	style: MDCTriangleEdgeStyle;

	constructor(o: { size: number; style: MDCTriangleEdgeStyle; });

	initWithSizeStyle(size: number, style: MDCTriangleEdgeStyle): this;
}

declare class MDCTypography extends NSObject {

	static alloc(): MDCTypography; // inherited from NSObject

	static body1Font(): UIFont;

	static body1FontOpacity(): number;

	static body2Font(): UIFont;

	static body2FontOpacity(): number;

	static boldFontFromFont(font: UIFont): UIFont;

	static buttonFont(): UIFont;

	static buttonFontOpacity(): number;

	static captionFont(): UIFont;

	static captionFontOpacity(): number;

	static display1Font(): UIFont;

	static display1FontOpacity(): number;

	static display2Font(): UIFont;

	static display2FontOpacity(): number;

	static display3Font(): UIFont;

	static display3FontOpacity(): number;

	static display4Font(): UIFont;

	static display4FontOpacity(): number;

	static fontLoader(): MDCTypographyFontLoading;

	static headlineFont(): UIFont;

	static headlineFontOpacity(): number;

	static isLargeForContrastRatios(font: UIFont): boolean;

	static italicFontFromFont(font: UIFont): UIFont;

	static new(): MDCTypography; // inherited from NSObject

	static setFontLoader(fontLoader: MDCTypographyFontLoading): void;

	static subheadFont(): UIFont;

	static subheadFontOpacity(): number;

	static titleFont(): UIFont;

	static titleFontOpacity(): number;
}

interface MDCTypographyFontLoading extends NSObjectProtocol {

	boldFontFromFont?(font: UIFont): UIFont;

	boldFontOfSize?(fontSize: number): UIFont;

	boldItalicFontOfSize?(fontSize: number): UIFont;

	isLargeForContrastRatios?(font: UIFont): boolean;

	italicFontFromFont?(font: UIFont): UIFont;

	italicFontOfSize?(fontSize: number): UIFont;

	lightFontOfSize(fontSize: number): UIFont;

	mediumFontOfSize(fontSize: number): UIFont;

	regularFontOfSize(fontSize: number): UIFont;
}
declare var MDCTypographyFontLoading: {

	prototype: MDCTypographyFontLoading;
};

declare class MDCTypographyScheme extends NSObject implements MDCTypographyScheming, NSCopying {

	static alloc(): MDCTypographyScheme; // inherited from NSObject

	static new(): MDCTypographyScheme; // inherited from NSObject

	body1: UIFont;

	body2: UIFont;

	button: UIFont;

	caption: UIFont;

	headline1: UIFont;

	headline2: UIFont;

	headline3: UIFont;

	headline4: UIFont;

	headline5: UIFont;

	headline6: UIFont;

	overline: UIFont;

	subtitle1: UIFont;

	subtitle2: UIFont;

	useCurrentContentSizeCategoryWhenApplied: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { defaults: MDCTypographySchemeDefaults; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithDefaults(defaults: MDCTypographySchemeDefaults): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare const enum MDCTypographySchemeDefaults {

	Material201804 = 0,

	Material201902 = 1
}

interface MDCTypographyScheming extends NSObjectProtocol {

	body1: UIFont;

	body2: UIFont;

	button: UIFont;

	caption: UIFont;

	headline1: UIFont;

	headline2: UIFont;

	headline3: UIFont;

	headline4: UIFont;

	headline5: UIFont;

	headline6: UIFont;

	overline: UIFont;

	subtitle1: UIFont;

	subtitle2: UIFont;

	useCurrentContentSizeCategoryWhenApplied: boolean;
}
declare var MDCTypographyScheming: {

	prototype: MDCTypographyScheming;
};

declare var MaterialComponentsVersionNumber: number;

declare var MaterialComponentsVersionString: interop.Reference<number>;
