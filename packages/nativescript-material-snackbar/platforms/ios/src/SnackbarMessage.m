
#import "SnackbarMessage.h"
#import "SnackbarMessageView.h"
@implementation SnackbarMessage : MDCSnackbarMessage {


}
-(instancetype)init {
  self = [super init];
  if (self) {
  }
  return self;
}
- (Class)viewClass {
        NSLog(@"SnackbarMessage viewClass %@", [SnackbarMessageView class]);
  return [SnackbarMessageView class];
}
@end
