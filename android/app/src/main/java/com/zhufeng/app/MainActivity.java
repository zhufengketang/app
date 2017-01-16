package com.zhufeng.app;

import android.annotation.SuppressLint;
import android.os.Handler;
import android.os.Message;

import com.facebook.react.CustomReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class MainActivity extends CustomReactActivity {

    public static MainActivity activity;


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        activity = this;
        return "zhufengketang";
    }


    @SuppressLint("HandlerLeak")
    public Handler mHandler = new Handler() {
        @SuppressWarnings("unused")
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case 1: {
                    PayResult payResult = new PayResult((String) msg.obj);
                    /**
                     * 同步返回的结果必须放置到服务端进行验证（验证的规则请看https://doc.open.alipay.com/doc2/
                     * detail.htm?spm=0.0.0.0.xdvAU6&treeId=59&articleId=103665&
                     * docType=1) 建议商户依赖异步通知
                     */
                    String resultInfo = payResult.getResult();// 同步返回需要验证的信息


                    WritableMap map = Arguments.createMap();
                    map.putString("memo", payResult.getMemo());
                    map.putString("resultStatus", payResult.getResultStatus());
                    map.putString("result", payResult.getResult());


                    PayModule.promise.resolve(map);

                    break;
                }
                default:
                    break;
            }
        };
    };
}
