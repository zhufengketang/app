package com.zhufeng.ijk;

import android.app.Activity;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class RCTIJKPlayerViewManager extends ViewGroupManager<RCTIJKPlayerView> {
    private static final String REACT_CLASS = "RCTIJKPlayer";

    private Activity activity = null;

    public RCTIJKPlayerViewManager(Activity activity){
        this.activity = activity;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RCTIJKPlayerView createViewInstance(ThemedReactContext context) {
        return new RCTIJKPlayerView(context, this.activity);
    }

}
