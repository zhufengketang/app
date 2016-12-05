### 珠峰课堂

珠峰课堂是珠峰联合业内大牛开发的国内首开源React Native App，并同步珠峰发售开发过程视频。

#### 运行方法

1. 进入项目目录
```
npm install
```

2. 如果是ios
用xcode打开ios/zhufengketang.xcodeproj

3. 如果是android
在android studio打开android目录作为一个工程


#### 架构阐述

##### 依赖关系
目前分成两层basic和domain。 domain目录中本次项目相关的组件、服务、配置参数和Helper函数，basic目录是本次开发过程中的额外产出的通用组件、方法等
- domain依赖于basic, 但basic不依赖于domain
- domain和basic之间的关系是单向的依赖

##### 路由
目前使用的是React Native 自带的Navigator， 增加一个页面请遵循以下步骤：
- 在domain/page目录下增加一个组件*
- 在路由元数据文件domain/pages/index.js中增加描述


