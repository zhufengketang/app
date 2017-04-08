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
  BackAndroid,
  Text,
  StatusBar,
  Platform
} from 'react-native'

import {Button, flexCenter} from "basic"
import {ZNavbar} from "domain/component"

import {COLOR_NAV_DARK, COLOR_TITLE} from "domain/def"


import {Routes} from "domain/page"

import {get_token} from "domain/api/apis"

import {Provider} from 'react-redux'
import {init} from "domain/redux/init"

// 定义全局函数
import "domain/def/global.function.def"

import {App} from "./app"



export class Entry extends Component {

  constructor(){
    super()

    this.state = {
      store : null
    }
  }

  componentDidMount(){

    /**
     * 初始化Redux Store
     */
    init().then( (__store => {
      /**
       * 设置Store全局可见,会增加副作用,但通常APP都属于中小型项目
       * 这样做会增强coding体验
       * 以后在任何地方,store就变成了一个全局变量
       * global.xxx的语法是react-native packager独有, 不要在react
       * 项目中使用
       */
      global.store = __store

      /**
       * 从服务端获取token,然后缓存在本地
       */
      
      get_token()
        .then( (() => {
          setTimeout( (() => {
            this.setState({store : __store})
          }).bind(this), 0)
        }).bind(this))

    }).bind(this))
  }

 

  render() {
    const {store} = this.state
    if(!store) {
      return null
    }

    return <Provider store={store}>
        <App />
    </Provider>
    
  }
}







