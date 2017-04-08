/**
 * Created by wangcong (king6cong@gmail.com) on 7/13/16.
 */

package com.zhufeng.ijk;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import tv.danmaku.ijk.media.player.IjkMediaPlayer;

import java.util.LinkedList;

public class RCTIJKPlayerView extends FrameLayout {
    private static final String TAG = "RCTIJKPlayerView";
    private final Context _context;
    private SurfaceView mPreviewView;
    private Activity activity = null;
    private FrameLayout framelayout;
    private IjkVideoView mIJKPlayerView;

    public IjkVideoView getPlayer() {
        return this.mIJKPlayerView;
    }

    public RCTIJKPlayerView(Context context, Activity activity) {
        super(context);
        this._context = context;
        this.activity = activity;
        Log.e(TAG, "*******constructor start");
        // framelayout = new FrameLayout(context);

        IjkMediaPlayer.loadLibrariesOnce(null);
        IjkMediaPlayer.native_profileBegin("libijkplayer.so");
        mIJKPlayerView = new IjkVideoView(context);
        // mIJKPlayerView.setLayoutParams(new FrameLayout.LayoutParams(LayoutParams.WRAP_CONTENT,
        //         LayoutParams.WRAP_CONTENT));

        // framelayout.addView(mIJKPlayerView);

        RCTIJKPlayer.getInstance().setIJKPlayerView(this);

        // String mVideoPath = "http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear1/prog_index.m3u8";
        // mVideoPath = "/Users/cong/Downloads/111.mov";

        // mIJKPlayerView.setVideoPath(mVideoPath);
        // mIJKPlayerView.start();

        // addView(framelayout);
        addView(mIJKPlayerView);
        // mIJKPlayerView.setContainer(this);
    }

    public void refresh() {
        Log.e(TAG, "view refresh");
        this.postInvalidate();
        UiThreadUtil.runOnUiThread(new Runnable() {
            public void run() {
                requestLayout();
            }
        });

    }

    // @Override
    // protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    //     Log.e(TAG, String.format("this.getLeft(), this.getTop(), this.getRight(), this.getBottom() %d %d %d %d", this.getLeft(), this.getTop(), this.getRight(), this.getBottom()));
    //     mIJKPlayerView.layout(this.getLeft(), this.getTop(), this.getRight(), this.getBottom());
    //     this.postInvalidate(this.getLeft(), this.getTop(), this.getRight(), this.getBottom());
    // }

    // @Override
    // public void onViewAdded(View child) {
    //     Log.e(TAG, String.format("onViewAdded " + child));
    //     if (this.framelayout == child) return;
    //     this.removeView(this.framelayout);
    //     this.addView(this.framelayout, 0);
    // }

    private void sendEvent(int state) {
        Log.e(TAG, "sendEvent");
        ReactContext reactContext = (ReactContext) getContext();
        WritableMap params = Arguments.createMap();
        params.putString("state", Integer.toString(state));
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("PlayBackState", params);

    }

    public void start(final String URL) {
        Log.e(TAG, String.format("start URL %s", URL));
        UiThreadUtil.runOnUiThread(new Runnable() {
            public void run() {
                mIJKPlayerView.setVideoPath(URL);
                mIJKPlayerView.start();
                // RCTIJKPlayerView.this.invalidate();
                // requestLayout();
            }
        });
    }

    public void stop() {
        Log.e(TAG, String.format("stop"));
        mIJKPlayerView.stopPlayback();
    }

    public void pause() {
        Log.e(TAG, String.format("pause"));
        mIJKPlayerView.pause();
    }

    public void resume() {
        Log.e(TAG, String.format("resume"));
        UiThreadUtil.runOnUiThread(new Runnable() {
            public void run() {
                mIJKPlayerView.resume();
            }
        });

    }

    public void shutdown() {
        Log.e(TAG, String.format("shutdown"));
        mIJKPlayerView.release(true);
    }

    public void seekTo(double currentPlaybackTime) {
        int position = (int)(currentPlaybackTime * 1000);
        Log.e(TAG, "seekTo "+ currentPlaybackTime + ", " + position);
        mIJKPlayerView.seekTo(position);
    }
}
