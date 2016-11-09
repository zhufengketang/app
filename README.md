### 珠峰课堂

国内第一款开源React Native App


#### 运行方法

STEP1 进入项目目录
```
执行npm install
```
STEP2 ios
用xcode打开ios/zhufengketang.xcodeproj

STEP3 android
在android studio打开android目录作为一个工程

#### 架构相关

##### 增加页面
- 在domain/page目录下增加一个组件*
- 在路由元数据文件domain/pages/index.js中增加描述

##### 依赖关系
domain目录中本次项目相关的组件,服务,配置参数和Helper函数
basic目录是本次开发过程中的额外产出的通用组件,方法等
domain依赖于basic, 但basic不依赖于domain
domain和basic之间的关系是单向的依赖

