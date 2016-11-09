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
  StyleSheet,
  Alert
} from 'react-native'

import {
  flexCenter,
} from "basic"

import {
  ZButton
} from 'domain/component'

export class Example0 extends Component {
  
  onPress() {
    
    this.setState({
      loading : true
    })
    setTimeout( (() => {
      this.setState({
        loading : false
      })
      Alert.alert("Hello", "world")
    }).bind(this), 3000)
    
  }
  
  constructor(){
    super() // 必须

    // 设置初始状态
    this.state = {
      loading : false  
    }
  }
  
  render() {
    const {loading} = this.state
    
    return (
      <View style={styles.container}>
        
        <Text>
          Hi !
        </Text>
        <Text>
          Welcome to React Native
        </Text>

        
        <View style={{height : 50,width : 100, flexDirection : 'row'}}>
          <View style={{flex:1, backgroundColor : 'red'}}></View>
          <View style={{flex:2, backgroundColor : "blue"}}></View>
          <View style={{flex:1, backgroundColor : "green"}}></View>
        </View>


        <ZButton loading={loading} onPress={this.onPress.bind(this)} >登录</ZButton>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  
  container : {
    flexDirection : 'column', ...flexCenter, flex : 1 ,
  }
})
