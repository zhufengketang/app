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

import {View, Text, StyleSheet, Dimensions} from 'react-native'

import {ZButton} from "domain/component"

import {flexCenter} from 'basic'
import {COLOR_TEXT_LIGHT, COLOR_TITLE} from "domain/def/color"

export class NetworkError extends Component{

  _press(){
    const {url, requestOptions, resolve} = this.props.cache
    
    fetch(url, requestOptions)
      .then(response => {
        resolve(response)
        store.dispatch({
          type : "NETWORK_RETRY"
        })
      })
      .catch(ex => {
        alert("网络请求失败")  
        
      })
  }

  render(){
    return <View style={styles.container}>
      <Text style={{fontSize : 24, color : COLOR_TITLE}}>亲!网络出错啦!</Text>
      <View style={{height : 20}}></View>
      <Text style={{fontSize : 14, color : COLOR_TEXT_LIGHT}}>您可以尝试去设置中调整网络配置,然后点击重试按钮</Text>

      <View style={{height : 20}}></View>
      <ZButton onPress={this._press.bind(this)}>重试</ZButton>
    </View>

  }
}

const styles = StyleSheet.create({
  container  : {
    position : "absolute",
    top : 0,
    left : 0,
    zIndex : 1,
    backgroundColor : "white",
    height : Dimensions.get("window").height,
    width : Dimensions.get("window").width,
    ...flexCenter
  }
})