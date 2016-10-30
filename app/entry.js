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
  Navigator
} from 'react-native'


import {Example1} from 'domain/page/Example1'
import {Example2} from 'domain/page/Example2'

export class Entry extends Component {
  
  constructor(){
    super()
  }

  _renderScene(route, navigator){
    
    console.log(route)

    switch(route.name) {
      case "Example1" :
        return <Example1 navigator={navigator} />
      case "Example2" :
        return <Example2 navigator={navigator} />
    }

  }
  
  render() {
    
    
    // initialRoute 设置第一张页面
    // renderScene 绘制场景 
    return <Navigator

      initialRoute={{name : "Example1"}}
      renderScene={this._renderScene}   
      
    />
  }
}


