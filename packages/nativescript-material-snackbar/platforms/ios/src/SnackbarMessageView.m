
#import "SnackbarMessage.h"
#import "SnackbarMessageView.h"

@interface SnackbarMessageView ()
    @property(nonatomic, strong) SnackbarMessage *_message;
@end


@interface MDCSnackbarMessageView ()
    - (instancetype)initWithMessage:(MDCSnackbarMessage *)message
                 dismissHandler:(id)handler
    snackbarManager:(MDCSnackbarManager *)manager;
@end
@implementation SnackbarMessageView : MDCSnackbarMessageView {
}

-(SnackbarMessage*) message {
    return self._message;
}
- (instancetype)initWithMessage:(MDCSnackbarMessage *)message
                 dismissHandler:(id)handler
    snackbarManager:(MDCSnackbarManager *)manager {
        NSLog(@"SnackbarMessage initWithMessage %@", message);
        return [super initWithMessage:message
                dismissHandler:handler
                snackbarManager:manager];
}
@end