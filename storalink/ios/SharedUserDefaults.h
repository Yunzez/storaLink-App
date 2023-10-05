#ifndef SharedUserDefaults_h
#define SharedUserDefaults_h
#endif

#import <Foundation/Foundation.h>

#if __has_include(<React/RCTAssert.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface SharedUserDefaults : NSObject <RCTBridgeModule>
@end
