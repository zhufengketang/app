package com.facebook.react;

/**
 * Created by weimeng on 2017/1/15.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.Display;
import android.view.KeyEvent;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import javax.annotation.Nullable;


import javax.annotation.Nullable;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.remobile.splashscreen.RCTSplashScreen;
import com.remobile.splashscreen.RCTSplashScreenPackage;

/**
 * Base Activity for React Native applications.
 */
public abstract class CustomReactActivity extends Activity
        implements DefaultHardwareBackBtnHandler, PermissionAwareActivity {


    protected final ReactActivityDelegate mDelegate;
    protected RCTSplashScreenPackage splashScreenPackage;

    protected CustomReactActivity() {
        mDelegate = createReactActivityDelegate();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     * e.g. "MoviesApp"
     */
    protected
    @Nullable
    String getMainComponentName() {
        return null;
    }

    /**
     * Called at construction time, override if you have a custom delegate implementation.
     */
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName());
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        splashScreenPackage = new RCTSplashScreenPackage(this);
        showSplashScreen();
        mDelegate.onCreate(savedInstanceState);
    }

    public RCTSplashScreenPackage getRCTSplashScreenPackage(){
        return this.splashScreenPackage;
    }

    @Override
    protected void onPause() {
        super.onPause();
        mDelegate.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mDelegate.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mDelegate.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mDelegate.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        return mDelegate.onKeyUp(keyCode, event) || super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if (!mDelegate.onBackPressed()) {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    public void onNewIntent(Intent intent) {
        if (!mDelegate.onNewIntent(intent)) {
            super.onNewIntent(intent);
        }
    }

    @Override
    public void requestPermissions(
            String[] permissions,
            int requestCode,
            PermissionListener listener) {
        mDelegate.requestPermissions(permissions, requestCode, listener);
    }

    @Override
    public void onRequestPermissionsResult(
            int requestCode,
            String[] permissions,
            int[] grantResults) {
        mDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    protected final ReactNativeHost getReactNativeHost() {
        return mDelegate.getReactNativeHost();
    }

    protected final ReactInstanceManager getReactInstanceManager() {
        return mDelegate.getReactInstanceManager();
    }

    protected final void loadApp(String appKey) {
        mDelegate.loadApp(appKey);
    }

    private void showSplashScreen() {
        final int drawableId = getSplashId();
        if ((RCTSplashScreen.splashDialog != null && RCTSplashScreen.splashDialog.isShowing())||(drawableId == 0)) {
            return;
        }
        getActivity().runOnUiThread(new Runnable() {
            public void run() {
                // Get reference to display
                Display display = getActivity().getWindowManager().getDefaultDisplay();
                Context context = getActivity();

                // Use an ImageView to render the image because of its flexible scaling options.
                RCTSplashScreen.splashImageView = new ImageView(context);
                RCTSplashScreen.splashImageView.setImageResource(drawableId);
                ViewGroup.LayoutParams layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
                RCTSplashScreen.splashImageView.setLayoutParams(layoutParams);
                RCTSplashScreen.splashImageView.setMinimumHeight(display.getHeight());
                RCTSplashScreen.splashImageView.setMinimumWidth(display.getWidth());
                RCTSplashScreen.splashImageView.setBackgroundColor(Color.BLACK);
                RCTSplashScreen.splashImageView.setScaleType(ImageView.ScaleType.FIT_XY);

                // Create and show the dialog
                RCTSplashScreen.splashDialog = new Dialog(context, android.R.style.Theme_Translucent_NoTitleBar);
                // check to see if the splash screen should be full screen
                if ((getActivity().getWindow().getAttributes().flags & WindowManager.LayoutParams.FLAG_FULLSCREEN)
                        == WindowManager.LayoutParams.FLAG_FULLSCREEN) {
                    RCTSplashScreen.splashDialog.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                            WindowManager.LayoutParams.FLAG_FULLSCREEN);
                }
                RCTSplashScreen.splashDialog.setContentView(RCTSplashScreen.splashImageView);
                RCTSplashScreen.splashDialog.setCancelable(false);
                RCTSplashScreen.splashDialog.show();
            }
        });
    }

    private int getSplashId() {
        int drawableId = getActivity().getResources().getIdentifier("splash", "drawable", getActivity().getClass().getPackage().getName());
        if (drawableId == 0) {
            drawableId = getActivity().getResources().getIdentifier("splash", "drawable", getActivity().getPackageName());
        }
        return drawableId;
    }

    protected Activity getActivity() {
        return this;
    }


}

