#!/bin/bash

# 获取当前文件夹
BASE_DIR=$(cd "$(dirname "$0")"; pwd)
cd $BASE_DIR

# 打包
./gradlew assembleRelease


# 将包传到蒲公英

