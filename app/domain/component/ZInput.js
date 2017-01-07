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

import {TextInput, StyleSheet, View, Text} from 'react-native' 

import {COLOR_TEXT_LIGHT} from "domain/def"

export class ZInput extends Component{
  
  _change(value){
    this.props.onChange(value)  
  }
  render(){
    
    const {error, ...others} = this.props
    return  <View>
      <TextInput
        onChangeText={this._change.bind(this)} style={styles.input} {...others}
        underlineColorAndroid={"rgba(0,0,0,0)"}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  input : {
    borderWidth : 1,
    borderRadius : 5,
    borderColor : "#eee",
    paddingLeft : 20,
    paddingRight : 20,
    height : 42,
    marginLeft : 20,
    marginRight : 20,
    color : COLOR_TEXT_LIGHT,
    marginTop : 20
    
  }  
})