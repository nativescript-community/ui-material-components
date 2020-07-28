
#import "TextInputControllerUnderline.h"
#import "UIFont+MaterialTypography.h"
#import "UIFont+MaterialSimpleEquality.h"

@implementation TextInputControllerUnderline : MDCTextInputControllerUnderline {
}
- (void)updateTextInput {
  UIFont *font = self.textInputFont;
  if (self.mdc_adjustsFontForContentSizeCategory) {
    font = [font mdc_fontSizedForMaterialTextStyle:MDCFontTextStyleBody1
                              scaledForDynamicType:self.mdc_adjustsFontForContentSizeCategory];
    // TODO: (#4331) This needs to be converted to the new text scheme.
  }

  if (![self.textInput.font mdc_isSimplyEqual:font]){
    self.textInput.font = font;
  }
}
@end