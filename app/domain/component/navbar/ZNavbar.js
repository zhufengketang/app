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

import {TouchableOpacity, Image} from "react-native"

import {flexCenter} from 'basic'
export class ZNavbar extends Component {
  
  render(){
    return null
  }
}


class ZNavbarBackButton extends Component {
  
  constructor(){
    super()
    this._press = this._press.bind(this)
  }

  _press(){
    
    this.props.navigator.pop()
  }
  
  render() {
    
    const {route} = this.props
    return <TouchableOpacity onPress={this._press} style={{flex : 1, ...flexCenter, paddingLeft : 10, paddingRight : 10}}>
      <Image source={ route.Inverse ? require("./title-back-inv.png") : require("./title-back.png")} style={{height : 24, width : 24}} />
    </TouchableOpacity>
  }

}


ZNavbar.Back = ZNavbarBackButton
