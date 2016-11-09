/***********************************************
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

import {View, Text} from 'react-native'

import {ZButton} from "domain/component"
import {flexCenter} from "basic"

import {Routes} from "domain/page"

export class Example3 extends Component{
  
  _onPress(){
    // POP 两次 --- 会连续跳两张页面
    // 体验很糟糕
    // this.props.navigator.pop()
    // this.props.navigator.pop()
    
    
    // 可以
    // 但是很难确定应该pop几张页面
    // 程序不好维护
    // this.props.navigator.popN(2)
    

    /**  方法1 **/
    // 拿到RouteStack
    // const routes = this.props.navigator.getCurrentRoutes()
    // Es6的语法, find方法传入一个prediction
    // const routeTo = routes.reverse().find(v => v.name === "Example1")
    // this.props.navigator.popToRoute(routeTo)
    
    
    /** 方法2 **/
    // const routes = this.props.navigator.getCurrentRoutes()
    // const routeTo = routes.find(v => v.name === "Example1")
    // this.props.navigator.resetTo(routeTo)
    
    
    /** 方法3 - 万不得以 **/
    
    //[Example1, Example2, Example3] -> [Example1, Example3] 
    //有性能问题
    this.props.navigator.immediatelyResetRouteStack([Routes.Example1, Routes.Example3])
    
    // 有时序问题
    // 此处在特定机型上可能触发bug,在10ms内 immediatelyResetRouteStack没有执行完成
    setTimeout( (() => {
      // [Example1, Example2] -> [Example1]
      this.props.navigator.pop()  
    }).bind(this), 10)
    
  }
  
  
  render(){
    
    
    return <View style={{flex : 1, ...flexCenter, backgroundColor : "yellow"}}>
      <Text>页面Example3</Text>
      <ZButton onPress={this._onPress.bind(this)}>成功</ZButton>
    </View>
  }
}

// 到了Example3 路由栈 [Example1, Example2, Example3]
// 期望"成功"按钮返回Example1 ----> [Example1]