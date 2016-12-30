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

import {TextInput, StyleSheet, View, Text, Switch, TouchableOpacity, Keyboard} from 'react-native' 

import {COLOR_TEXT_LIGHT, COLOR_PRIMARY} from "domain/def"

export class ZSwitch extends Component{
  
  
  _change(value){
    this.props.onChange(value)

    console.log(Keyboard)
    Keyboard.dismiss()
  }
  
  _press(){
    
    this.props.onPress && this.props.onPress()
  }
  render(){
    const {error, value, label, ...others} = this.props
    return  <View style={styles.container}>

      <TouchableOpacity onPress={this._press.bind(this)}>
        <Text style={{color : COLOR_PRIMARY}}>{label}</Text>
      </TouchableOpacity>
      <Switch 
        onValueChange={this._change.bind(this)}
        value={value}
        style={styles.switch}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  container : {
    flexDirection : "row",  
    alignItems : "center",
    marginLeft : 20,
    marginTop : 20
  },
  switch : {
    marginLeft : 10 ,  
  }
})