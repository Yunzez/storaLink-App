#import <Foundation/Foundation.h>
#import "SharedUserDefaults.h"

@implementation SharedUserDefaults

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXPORT_METHOD(set:(NSString *)suiteName
                  key:(NSString *)keyName
                  value:(NSString *)value)
{
  NSUserDefaults *shareExtensionDefaults = [[NSUserDefaults alloc] initWithSuiteName: suiteName];
  [shareExtensionDefaults setObject:value forKey:keyName];
  NSLog(@"val written %@", value);
}

RCT_EXPORT_METHOD(get:(NSString *)suiteName
                  key:(NSString *)keyName
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSUserDefaults *shareExtensionDefaults = [[NSUserDefaults alloc] initWithSuiteName: suiteName];
  NSString *val = [shareExtensionDefaults stringForKey:keyName];
  if (val == nil) {
    NSError *error = [NSError errorWithDomain:@"org.reactjs.native.example.Bill" code:0 userInfo:@{ @"message": @"Empty" }];
    reject(@"error", @"error description", error);
  } else {
    resolve(val);
  }
}

@end
