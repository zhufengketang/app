/**
 * Created by wangcong (king6cong@gmail.com) on 7/13/16.
 */

package com.zhufeng.ijk;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.UiThreadUtil;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class RCTIJKPlayerModule extends ReactContextBaseJavaModule {
    private static final String TAG = "RCTIJKPlayerModule";


    private final ReactApplicationContext _reactContext;
    public RCTIJKPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        _reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RCTIJKPlayerModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return Collections.unmodifiableMap(new HashMap<String, Object>() {
            {
            }
        });
    }

    @ReactMethod
    public void start(final ReadableMap options, final Promise promise) {
        final String URL = options.getString("url");
        UiThreadUtil.runOnUiThread(new Runnable() {
            public void run() {
                Log.e(TAG, "****start URL: " + URL);
                RCTIJKPlayer.getViewInstance().start(URL);
            }
        });
    }

    @ReactMethod
    public void stop() {
        Log.e(TAG, "stop");
        RCTIJKPlayer.getViewInstance().stop();
    }

    @ReactMethod
    public void pause() {
        Log.e(TAG, "pause");
        RCTIJKPlayer.getViewInstance().pause();
    }

    @ReactMethod
    public void resume() {
        Log.e(TAG, "resume");
        RCTIJKPlayer.getViewInstance().resume();
    }

    @ReactMethod
    public void shutdown() {
        Log.e(TAG, "shutdown");
        RCTIJKPlayer.getViewInstance().shutdown();
    }

    @ReactMethod
    public void seekTo(double currentPlaybackTime) {
        Log.e(TAG, "seekTo "+ currentPlaybackTime);
        RCTIJKPlayer.getViewInstance().seekTo(currentPlaybackTime);
    }

    @ReactMethod
    public void playbackInfo(final Promise promise) {
        IjkVideoView player = RCTIJKPlayer.getViewInstance().getPlayer();
        WritableMap data = new WritableNativeMap();
        int currentPlaybackTime = player.getCurrentPosition() / 1000;
        int duration = player.getDuration() / 1000;
        int bufferingProgress = player.getBufferPercentage();
        int playbackState = player.CurrentState();

        data.putString("currentPlaybackTime", Integer.toString(currentPlaybackTime));
        data.putString("duration", Integer.toString(duration));
        data.putString("playableDuration", "");
        data.putString("bufferingProgress", Integer.toString(bufferingProgress));
        data.putString("playbackState", Integer.toString(playbackState));
        data.putString("loadState", "");
        data.putString("isPreparedToPlay", "");
        promise.resolve(data);
    }


}
