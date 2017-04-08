//
//  AVViewController.h
//  zhufengketang
//
//  Created by 魏蒙 on 2016/12/31.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#import <AVFoundation/AVFoundation.h>
@interface AVViewController : UIViewController
@property AVPlayerLayer * playerLayer;
@property (weak, nonatomic) IBOutlet UIView *container;
@property AVPlayer * player;
@end
