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
 * OUT OF OR IN CONNCTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React, {Component} from 'react'

import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native'

const {width, height} = Dimensions.get('window')
const sliderItemStyle = {width, height : width * 0.6}

import {Routes} from "domain/page"
import {connect} from 'react-redux'
class _UserCenter extends Component{

  _about(){
    this.props.navigator.push({...Routes.About})
  }
  
  _reset(){
    this.props.navigator.push({...Routes.ResetPassword})
  }
  
  _logout(){
    
    store.dispatch({type : "LOGOUT"})
    
    this.props.switch_to("home")
  }
  
  
  
  render(){
    return (
      <ScrollView style={{backgroundColor : "white"}}>
        <View style={{backgroundColor : "white"}}>
          <Image source={require("./images/usercenter.png")} style={sliderItemStyle} >
          </Image>
          <View style={{position : "absolute", top : sliderItemStyle.height * 0.7, backgroundColor: "rgba(0,0,0,0)", width : Dimensions.get("window").width, alignItems : 'center'}}>
            <Text style={{color : 'white', fontSize : 16}}>{this.props.name}</Text>
          </View>
        </View>

        <View style={{marginTop : 10}}>
          {/*<StripedButton icon={require("./images/uc/question.png")}>常见问题</StripedButton>*/}
          <StripedButton onPress={this._about.bind(this)} icon={require("./images/uc/user.png")}>关于《珠峰课堂》</StripedButton>
          <StripedButton onPress={this._reset.bind(this)} icon={require("./images/uc/password.png")}>修改密码</StripedButton>
          <StripedButton onPress={this._logout.bind(this)} icon={require("./images/uc/password.png")}>登出</StripedButton>
        </View>
      </ScrollView>
    )
  }
}

const StripedButton = ({icon, children, onPress}) => {

  return <TouchableOpacity onPress={onPress} style={styles.stripedButton}>
    <Image source={icon} style={styles.icon} />
    <View style={{flex : 1, marginLeft : 10}}>
      <Text>{children}</Text>
    </View>
    <Image style={styles.iconR} source={require("./images/right-arrow.png")}></Image>
  </TouchableOpacity>
}




const styles = StyleSheet.create({
  stripedButton : {
    flexDirection : 'row',
    height : 40,
    alignItems : 'center',
    borderBottomWidth : 1,
    borderBottomColor : '#f2f3f4'
  },
  icon : {
    width : 18,
    height : 18,
    marginLeft : 20
  },
  iconR : {
    width : 12,
    height : 12,
    marginRight : 20
  }
  
})

const map = (state) => {
  
  return {
    name : state.user.name
  }
  
}

export let UserCenter = connect(map)(_UserCenter)