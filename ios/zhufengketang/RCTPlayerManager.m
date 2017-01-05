//
//  RCTPlayerManager.m
//  zhufengketang
//
//  Created by 魏蒙 on 2016/12/30.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTViewManager.h"
#import "AVViewController.h"
#import "AppDelegate.h"

@interface RCTPlayerManager : RCTViewManager
@property AVViewController * avController;
@end


@implementation RCTPlayerManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(play:(NSString *) video)
{

  self.avController = [[AVViewController alloc] init];
  
  
  
  //self.avController.view.backgroundColor =  [[UIColor alloc]initWithRed:57.0/255.0 green:156.0/255.0 blue:52.0/255.0 alpha:1.0];
  [self performSelectorOnMainThread:@selector(play) withObject:nil waitUntilDone:YES];



}

- (void) play {
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  
  self.avController.view.frame = CGRectMake(50,50,500,300);
  UIViewController * rootViewController = delegate.window.rootViewController;
  
  [rootViewController presentViewController:self.avController animated:true completion:nil];
  
}



@end
