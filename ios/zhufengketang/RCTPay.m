//
//  RCTPay.m
//  zhufengketang
//
//  Created by 魏蒙 on 2017/1/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTPay.h"
#import <AlipaySDK/AlipaySDK.h>

@implementation RCTPay

RCT_EXPORT_MODULE();


RCT_REMAP_METHOD(alipay,
                 orderString:(NSString *)orderString
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter :(RCTPromiseRejectBlock)reject)
{
  
  // 在主线程中执行
  dispatch_async(dispatch_get_main_queue(), ^{
    //Your main thread code goes in here
    [[AlipaySDK defaultService] payOrder:orderString fromScheme:@"zhufengketang" callback:^(NSDictionary *resultDic) {
      resolve(resultDic);
      //NSLog(@"reslut = %@",resultDic);
    }];
  });

}

@end
