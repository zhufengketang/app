/***********************************************
 *
 * MIT License
 *
 * Copyright (c) 2016 珠峰课堂,Ramroll
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React, {Component} from 'react'

import {View, Text, StyleSheet, ScrollView, Link} from 'react-native'

const text = "中国是个人口大国，但教育资源非常稀缺。学生找不到好的老师，教育资源集中在了少数地方或人群手里。 为了改变这样的现状，越来越多的在线教育，甚至一些有良心的学校如MIT提供了大量的公开课。在这样的背景下，珠峰也开始着手向网络教育（智能教育）领域布局，为大家提供更好的学习体验。\n" +
"另外受开源运动的影响，我们从前辈们的努力中受益。 从Linux到后来的V8、hadoop、opencv等等，都为我们今天的如此繁荣的信息产业做出了巨大的贡献。因此，珠峰效仿先贤，一直也希望开发一款开源的应用来帮助更多学员。\n" + 
"同时，珠峰也发现学员从学习知识到实际应用的巨大距离，珠峰也一直在为此而努力。我们不希望《珠峰课堂》如同其他开源App，如Facebook的F8 APP，没有太多的实际意义。我们要打造的是一款走在前沿的教育APP给学员提供更好的教学体验。作为纯商业公司固然不肯讲自己的核心代码公布，而作为教育领域的良心，珠峰可以这样坚持下去。\n" +
"作为目前的v1.0版本，学员还只能在珠峰课堂上浏览课程、购课。 但我们正在开发的v2.0版本我们将加入视频播放功能。而在v3.0版本，我们将为珠峰课堂加入教育直播功能。 我们会持续推进这个软件，我们前后端都会开源。我们甚至以后会集成机器学习和智能推荐算法进去，这些也将对学员开源。\n"+ 
"珠峰课堂Github地址: http://www.github.com/zhufengketang/app。\n"

export class About extends Component{


  render(){

    return <ScrollView style={{flex : 1, paddingTop : 20}}>
      
      {text.split("\n").map((para, i) => {
        
        return <View key={i} style={styles.para}><Text style={styles.text}>{para}</Text></View>
      })}
      
    </ScrollView>
  }
}
const styles = StyleSheet.create({
  para : {
    paddingLeft : 20,  
    paddingRight : 20,
    marginBottom : 20,

  },
  text : {
    fontSize : 15
  }
})
