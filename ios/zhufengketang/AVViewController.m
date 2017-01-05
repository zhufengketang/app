//
//  AVViewController.m
//  zhufengketang
//
//  Created by 魏蒙 on 2016/12/31.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "AVViewController.h"

@interface AVViewController ()

@end

@implementation AVViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  
  //self.container.frame = CGRectMake(0, 64, self.view.bounds.size.width, self.view.bounds.size.width);
  self.view.frame =CGRectMake(0, 0, self.view.bounds.size.width, self.view.bounds.size.height);

  NSString *encodedString = [@"" stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  NSURL *url = [[NSURL alloc] initWithString: encodedString];
    AVAsset*liveAsset = [AVURLAsset URLAssetWithURL:url options:nil];
  AVPlayerItem *playerItem = [AVPlayerItem playerItemWithAsset:liveAsset];


  
  AVPlayer *player = [AVPlayer playerWithPlayerItem:playerItem];

  self.player = player;

  
  self.playerLayer = [AVPlayerLayer playerLayerWithPlayer:self.player];
  self.playerLayer.frame = self.view.bounds;
  self.playerLayer.videoGravity = AVLayerVideoGravityResize;
  [self.view.layer addSublayer:self.playerLayer];
  [player play];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
