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


export class Example2 extends Component{
  
  _onPress(){
    this.props.navigator.pop()  
  }
  
  _onNext(){

    this.props.navigator.push(Routes.Example3)
  }
  render(){
    
    
    return <View style={{flex : 1, ...flexCenter, backgroundColor : "yellow"}}>

      <Text>页面Example2</Text>

      <ZButton onPress={this._onPress.bind(this)}>返回Example1</ZButton>

      <View style={{marginTop : 10}}>
        <ZButton onPress={this._onNext.bind(this)}>Next</ZButton>
      </View>
    </View>
  }
}
