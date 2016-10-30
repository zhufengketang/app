/**
 * ramroll on 2016/10/16.
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
    flexDirection : 'column', ...flexCenter, flex : 1 
  }
})
