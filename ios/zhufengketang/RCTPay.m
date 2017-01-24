//
//  RCTPay.m
//  zhufengketang
//
//  Created by 魏蒙 on 2017/1/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTPay.h"
#import "AppDelegate.h"
#import <AlipaySDK/AlipaySDK.h>

#import "RCTEventDispatcher.h"

@implementation RCTPay
@synthesize bridge = _bridge;
RCT_EXPORT_MODULE();


RCT_REMAP_METHOD(alipay,
                 orderString:(NSString *)orderString
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter :(RCTPromiseRejectBlock)reject)
{
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(notify:)
                                               name:@"AlipayUrlNotify" object:nil];

  // 在主线程中执行
  dispatch_async(dispatch_get_main_queue(), ^{
    //Your main thread code goes in here
    
    [[AlipaySDK defaultService] payOrder:orderString fromScheme:@"zhufengketang" callback:^(NSDictionary *resultDic) {
      [self.bridge.eventDispatcher sendAppEventWithName:@"ALIPAY_RESULT"
                                                   body: resultDic];
     
    }];

  });

}

- (void)notify:(NSNotification*) notification {
  NSDictionary *userInfo = notification.userInfo;
  [self.bridge.eventDispatcher sendAppEventWithName:@"ALIPAY_RESULT"
                                               body: userInfo];

}

- (void)sendPayResultToJs:(NSDictionary *)dict
{
   dispatch_async(dispatch_get_main_queue(), ^{
     [self.bridge.eventDispatcher sendAppEventWithName:@"ALIPAY_RESULT"
                                               body: dict];
   });
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  

  return YES;
}


@end
