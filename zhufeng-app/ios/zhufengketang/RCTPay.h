//
//  RCTPay.h
//  zhufengketang
//
//  Created by 魏蒙 on 2017/1/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#ifndef RCTPay_h
#define RCTPay_h

#import "RCTBridgeModule.h"
#import <UIKit/UIKit.h>
#import <AlipaySDK/AlipaySDK.h>

@interface RCTPay : NSObject <RCTBridgeModule>
- (void)sendPayResultToJs:(NSDictionary *)dict;
@end

#endif /* RCTPay_h */
