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

import {TextInput, StyleSheet, View, Text, TouchableOpacity} from 'react-native'

import {flexCenter} from 'basic'
import {COLOR_TEXT_LIGHT, COLOR_LIGHT_BLUE, COLOR_PRIMARY} from "domain/def"

export class ZVCode extends Component{

  constructor(){
    super()
    this.state = {
      tick : 0
    }
  }

  async _send(){

    
    if(this.state.tick != 0){
      return
    }

    const pass = await this.props.send()
    
    if(pass) {
      this.setState({
        tick : 60
      }, () => {
        if(this.I) {
          clearInterval(this.I)
        }
        this.I = setInterval(this._tick.bind(this), 1000)
      })
    }


    
  }
  
  componentWillUnmount(){
    clearInterval(this.I)
  }

  _change(value){
    this.props.onChange(value)
  }

  _tick(){

    if(this.state.tick > 0) {
      this.setState ({tick : this.state.tick - 1})
    } else {
      clearInterval(this.I)
    }

  }

  _btnText(tick) {

    if(tick == 0) {
      return "发送验证码"
    }
    else {
      return tick
    }

  }

  render(){
    const {error, ...others} = this.props
    const {tick} = this.state

    return  <View style={styles.container}>
      <TextInput
        style={styles.input}  keyboardType="phone-pad" onChangeText={this._change.bind(this)} {...others} placeholder="验证码"
        underlineColorAndroid={"rgba(0,0,0,0)"}
      />
      {tick == 0 ?
        <TouchableOpacity onPress={this._send.bind(this)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>{this._btnText(tick)}</Text>
          </View>
        </TouchableOpacity>
        :
        <View style={{...styles.btn, ...styles.btnDisabled}}>
          <Text style={styles.btnText}>{this._btnText(tick)}</Text>
        </View>
      }
    </View>
  }
}

const styles = {
  container : {

    marginTop : 20,
    marginRight : 20,
    flexDirection : "row"  ,
    marginLeft : 20,
    alignItems : "center"

  },
  input : {
    borderWidth : 1,
    borderRadius : 5,
    borderColor : "#eee",
    paddingLeft : 20,
    paddingRight : 20,
    height : 42,
    color : COLOR_TEXT_LIGHT,
    flex : 1,

  } ,
  btn : {
    borderRadius : 5,
    borderColor : COLOR_PRIMARY,
    borderWidth : 1,
    height : 42,
    paddingLeft : 20,
    paddingRight : 20,
    marginLeft : 10,
    backgroundColor : COLOR_LIGHT_BLUE,
    ...flexCenter


  },
  btnDisabled : {
    backgroundColor : "#f2f3f4",
    borderColor : "#eee"
  },
  btnText: {
    color : COLOR_PRIMARY
  }

}