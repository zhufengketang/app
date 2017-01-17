### 通用定义

#### 请求方式(HTTP_METHOD)
按照Restful规范, GET用于请求/查询数据, POST用于新增, PUT用于修改,DELETE用于删除



#### 资源命名
主要分成几类资源,所有资源都用单数结尾
1. /course 课程
2. /user 用户
3. /order 支付



#### 接口返回格式

为了简化,此处和严格的Restful接口定义略有不同, 请求无论成功失败都返回200的状态码
注: 严格按照restful规范请求成功返回 200 - 299 的状态码,请求失败返回 400 - 599 的状态码

一次请求会返回一个JSON对象, 对于从逻辑上成功的请求, 如登录成功/获取数据成功/查询成功等
返回code : 0, errorMessage : "", data : {...数据}

**逻辑成功调用的示例:**
```
{
    code : 0,
    errorMessage : "",
    data : ... //返回的数据,如果不需要返回数据的接口, data = null 
}
```

**逻辑失败的调用示例**
```
{

    code : 201,
    errorMessage : "请登录",
    data : null
}
```


#### code定义
为了简化需求, 目前定义3个code

0 : 成功
201 : 用户授权失败(需要登录)
1000 : 其他错误


#### TOKEN
为了让APP和服务端保持状态同步,需要服务端生成一个TOKEN
流程如下:
 1. 任何一个APP接口发生请求时,如果Headers里没有token,都会进入2
 2. 服务端验证通过生成一个16位的TOKEN,伴随接口的headers返回,客户端接进行缓存
 3. 每一个请求,客户端都会在HTTP_HEADERS中增加{token : "XXXXXXXX"}
 4. 服务器接收到客户端的请求,如果发现TOKEN有效,则正常返回数据, 如果发现TOKEN无效,则返回code=201
 5. 客户端看到code=201后,清除本地缓存token并跳转到登录页



### 接口定义
#### GET /course
接口定义:获取课程列表2

**URL参数说明**
start : 获取课程开始的位置
take : 总共获取多少个课程

**成功返回结果示例**
请求 GET /course?start=0&take=5
```
{
    code : 0,
    data : {
        courses : [{
            id : 100,
            title : "顶级大神教你写node.js",
            author : "张仁阳",
            author_profile : "教师简介...", // 较长
            hours : "24", //课时 
            description : "国内顶尖大神教你写node.js.从零开始,循序渐进.......",
            price : 3000.00,
            start : "2016-10-30",
            address : "珠峰"
            image :  "http://a1.jikexueyuan.com/home/201506/24/a082/558a11c35f925.jpg",
            contents : [
                "第一个小例子,实现request.queryString",
                "第二个小例子,实现request.queryString",
                "第三个小例子,实现request.queryString",
                "第四个小例子,实现request.queryString",
                "第五个小例子,实现request.queryString",
            ]}, {
                ...重复4次
            }
        ],
        total : 205 //课程总数
        
    }
}
```

**没有更多数据的返回示例**
请求 GET /course?start=10000&take=20
```
{
    code : 0,
    data : {
        courses : null, 
        total : 205
    }
}
```

#### POST /order/{course_id}
接口定义 : 下单/报名


**URL参数说明**
course_id:课程ID

**成功返回**
```
{
    code : 0,
    data : af23412123123a23 // 订单编号 
}
```

**失败**
如: 课程已经订满/已经预定过此课程等
```
{
    code : 1000,
    errorMessage : "抱歉!课程已经订满!"
}
```

#### GET /order
接口定义: 订单列表

返回用户所有已选课程

**成功返回**
```
{

    code : 1000,
    data : {
        total : 2,
        orders : [{
            id : 100, //订单ID
            title : "顶级大神教你写node.js",
            author : "张仁阳",
            description : "国内顶尖大神教你写node.js.从零开始,循序渐进.......",
            price : 3000.00,
            start : "2016-10-30",
            address : "珠峰"
            image :  "http://a1.jikexueyuan.com/home/201506/24/a082/558a11c35f925.jpg",     
        }, {
            ...与上一条相同
        }]
        
    }
    
}
```

#### GET /order/sign/alipay
接口定义,获取调转到支付宝接口的签名, 大致过程如下:

1. 服务端根据以下参数拼接成一个订单描述， 用'&'连接
outTradeNO 流水号（珠峰课堂的系统为此笔交易生成的号码,注意不是订单号）
subject 商品标题
body 商品描述
totalFee 商品价格
notifyURL 回调地址
service="mobile.securitypay.pay" 固定
paymentType = "1"; 固定
inputCharset = "utf-8"; 固定
itBPay = "30m"; 固定
showURL = "m.alipay.com"; 固定


得到如下一个字符串(orderSpec)
```
partner="2088221872110871"&seller_id="1144709265@qq.com"&out_trade_no="W6ZXRT4F24EUHIV"&subject="1"&body="我是测试数据"&total_fee="0.02"&notify_url="http://www.xxx.com"&service="mobile.securitypay.pay"&payment_type="1"&_input_charset="utf-8"&it_b_pay="30m"&show_url="m.alipay.com
```



2. 服务端将orderSpec用RSA算法签名

用上传给支付宝的私钥签名上述订单描述，得到签名sign


3. 服务端将{sign,orderSpec}返回给客户端

4. 客户端调用AlipaySDK的payOrder方法跳转

** 传入参数 **
orderId : 订单编号

** 成功返回 **
```
{

    code : 1000,
    data : {
        orderSpec : 'partner="2088221872110871"&seller_id="1144709265@qq.com"&out_trade_no="W6ZXRT4F24EUHIV"&subject="1"&body="我是测试数据"&total_fee="0.02"&notify_url="http://www.xxx.com"&service="mobile.securitypay.pay"&payment_type="1"&_input_charset="utf-8"&it_b_pay="30m"&show_url="m.alipay.com' ,
        sign : //RSA算法签名 
        
    }
    
}
```


#### GET /user/identity
接口定义:用户登录

**URL参数说明**
```
{
    mobile : "18611223345",
    password : "abcdefg"
}
```


**成功返回**
```
{
    code : 0,
    data : {
        name : '张三'
    }
}
```

**失败返回**
```
{
    code : 1000,
    errorMessage : "用户名或密码错误"
}
```


#### POST /user
接口定义: 注册


**URL参数说明**
```
{
    name : "张老师", // 真实姓名
    password : "abcdefg",
    mobile : "18611223344",
    vcode : "123456" //验证码,
    imgcode : "123456" //图片校验码
}
```

**成功返回**
```
{
    code : 0,
    data : null 
}
```

#### PUT /user
接口定义:修改密码 

**URL参数说明**
```
{
    mobile : "18611223344",
    password : "abcdefg",
    imgcode : "123456", //图片校验码
    vcode : "123456" //验证码
}
```

**成功返回**
```
{
    code : 0,
    data : null 
}
```



#### GET /user/vcode
接口定义: 获取短信验证码


**URL参数说明**
mobile : 手机号
type : register或者forget
img_code : 图片验证码

type=register代表注册验证码
type=forget忘记密码验证码


**成功返回**
请求: /user/vcode?mobile=18611223344&type=register&img_code=123456
```
{
    code : 0,
    data : null
}

```


### 图片验证码
GET /imgcode


每次请求返回一张6位数字的图片,服务端大致流程如下
1. 客户端提交请求 GET /imgcode 和 HEADERS={token : "XXXXXXXXX" }
2. 服务器接受请求,然后生成图片, 将验证码结果和token绑定, 存储成为一条记录, 加上过期时间
3. 任何需要验证图片的地方从数据库中进行校验


