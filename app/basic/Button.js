/**
 *
 * ramroll on 2016/10/24.
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
        style={{backgroundColor, width,  height, ...flexCenter, borderRadius}}>
        <Text style={{color : 'white', fontSize : fSize, fontWeight : Platform.OS === 'android' ? "bold" : "normal"}}>{children}</Text>
      </TouchableOpacity>
    )
  }

}


