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

import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native'

import {flexCenter} from "basic/style"


/**
 * 按钮
 */
export class Button extends Component{

  
  static propTypes = {
    backgroundColor : React.PropTypes.string
  }
  
  static defaultProps  = {
    backgroundColor : "#ddd",
    height : 40,
    width : 100,
    loading : false,
    fontSize : 14
  }
  
  
  onPress(){
    this.props.onPress && this.props.onPress()
  }
 
  
  render(){

    // 从父组件接收属性
    const {height, width, backgroundColor, children, loading, fontSize} = this.props
    // const height = this.props.height

    
    let borderRadius = 0

    // 在IOS上给按钮增加5dp的BorderRadius
    if(Platform.OS === 'ios') {
      borderRadius = 5    
    }

    // 在Android 文字会比IOS大一些
    let fSize = Platform.OS === 'android' ? fontSize * 1.2 : fontSize


    // Loading效果
    if(loading) {
      return (
        <View
          style={{backgroundColor, width,  height, ...flexCenter}}>
          <ActivityIndicator />
        </View>
      )
    }
    return(
      <TouchableOpacity
        onPress={this.onPress.bind(this)}
        style={{backgroundColor, width,  height, ...flexCenter, borderRadius, ...this.props.style}}>
        <Text style={{color : 'white', fontSize : fSize, fontWeight : Platform.OS === 'android' ? "bold" : "normal"}}>{children}</Text>
      </TouchableOpacity>
    )
  }

}


