/**
 * Created by wangcong (king6cong@gmail.com) on 7/13/16.
 */

package com.zhufeng.ijk;

import android.util.Log;


public class RCTIJKPlayer {

    private static final RCTIJKPlayer ourInstance = new RCTIJKPlayer();
    private RCTIJKPlayerView mIJKPlayerView;


    public static RCTIJKPlayer getInstance() {
        return ourInstance;
    }

    public static RCTIJKPlayerView getViewInstance() {
        return ourInstance.mIJKPlayerView;
    }

    public void setIJKPlayerView(RCTIJKPlayerView mIJKPlayerView) {
        this.mIJKPlayerView = mIJKPlayerView;
    }

    private RCTIJKPlayer() {
    }

}
