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
import {View, Text, Image, ScrollView, Dimensions} from 'react-native'
import {CourseCardSmall} from "domain/component"
import { NativeModules } from 'react-native';
import {get_sign_alipay} from "domain/api/apis"

export class Pay extends Component {

  constructor(props){
    super()  
  }

  componentDidMount(){
  }

  
  async _press(){
    // RCTPay

    const result = await get_sign_alipay(this.props.route.orderId)

    const {orderSpec, sign} = result.data
    let orderString = `${orderSpec}&sign="${sign}"&sign_type="RSA"`
    console.log(orderString)
    const obj = await NativeModules.Pay.alipay(
      orderString
    )


    switch(obj.resultStatus) {
      case "9000":
      case "8000":
      case "6004":
        /// TODO
        break;

      case "4000":
      case "6001":
      case "6002":
        alert("支付没有成功")
        break;

    }
    console.log("@Pay After alipay result", obj)
  }
  render(){
    const {course} = this.props.route
    
    return (
      <View>
        <CourseCardSmall {...course} onPress={this._press.bind(this)} />
      </View>
    )
  }
}
