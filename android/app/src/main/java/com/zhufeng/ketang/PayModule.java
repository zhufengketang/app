package com.zhufeng.ketang;

import android.os.Message;

import com.alipay.sdk.app.PayTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

/**
 * Created by weimeng on 2017/1/15.
 */
public class PayModule extends ReactContextBaseJavaModule {
    public PayModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Pay";
    }

    static Promise promise = null;

    @ReactMethod
    public void alipay(final String orderString, final Promise promise) {

        PayModule.promise = promise;

        Runnable payRunnable = new Runnable() {

            final String payInfo = orderString;
            @Override
            public void run() {
                // 构造PayTask 对象
                PayTask alipay = new PayTask(MainActivity.activity);

//                // 调用支付接口，获取支付结果
                Map<String, String> result = alipay.payV2(orderString, true);
//
                Message msg = new Message();
                msg.what = 1;
                msg.obj = result;
                MainActivity.activity.mHandler.sendMessage(msg);
            }
        };

        // 必须异步调用
        Thread payThread = new Thread(payRunnable);
        payThread.start();

    }


}
