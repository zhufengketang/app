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
import {View, Text, Image, ScrollView, Dimensions, Alert} from 'react-native'
import {CourseCardSmall} from "domain/component"
import { NativeModules, NativeAppEventEmitter } from 'react-native';
import {get_sign_alipay} from "domain/api/apis"
import {Routes} from "domain/page"

export class Pay extends Component {

  constructor(props){
    super()
  }

  componentDidMount(){

    const _s = this
    this.alipayListener = NativeAppEventEmitter.addListener("ALIPAY_RESULT", (obj) => {
      console.log("@alipayListner", obj)
      _s._dealingResult(obj.resultStatus)
    })

    // console.log("@Pay After alipay result", obj)

  }
  
  _dealingResult(resultStatus) {
    switch(resultStatus) {
      case "9000":
      case "8000":
      case "6004":

        Alert.alert("提示", "您已经支付成功，我们的工作人员会与您取得联系，请按时来上课吧！",  [
          {text: 'OK', onPress: () => {
            _s.props.navigator.resetTo({...Routes.Tabs})
            store.dispatch({
              type : "SWITCH_TAB",
              active : "mycourse"
            })
          }},

        ])
        break;

      case "4000":
      case "6001":
      case "6002":
        alert("支付没有成功")
        break;

    } 
  }

  componentWillUnmount(){

    this.alipayListener.remove()
  }


  async _press(){
    // RCTPay

    const result = await get_sign_alipay(this.props.route.orderId)

    const {orderSpec, sign} = result.data
    let orderString = `${orderSpec}&sign=${sign}`

    const obj = await NativeModules.Pay.alipay(
      orderString
    )

    if(obj && obj.resultStatus) {

      this._dealingResult(obj.resultStatus)
      
    }




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
