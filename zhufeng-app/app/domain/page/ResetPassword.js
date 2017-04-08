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

import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Alert

} from 'react-native'

import {FormScrollView, FormConnector, ValidateMethods, flexCenter} from 'basic'
import {ZButton, ZInput, ZSwitch, ZVCode, ZImgCode} from "domain/component"

import {put_user, get_user_vcode} from "domain/api/apis"


const fields = ["password", "mobile", 'imgcode', 'vcode']

const validate = (assert, fields) => {
  assert("mobile", ValidateMethods.required(), '请输入手机号')
  assert("mobile", ValidateMethods.length(11), '手机号格式不正确')
  assert("password", ValidateMethods.required(), '请输入密码')
}



export class ResetPassword extends Component {
  constructor(){
    super()
    this.state = {
      busy : false // 处理中
    }
    
    store.dispatch({type : "NETWORK_RETRY"})
    
  }
 
  async _submit(data, errors){
    
    if(errors.length > 0) {
      alert(errors[0])
      return
    }
    
    this.setState({busy : true})
    const {mobile,password, imgcode, vcode} = data
    const result = await put_user({mobile, password})
    this.setState({busy : false})
    alert("修改成功")
  }

  render(){
    const {busy} = this.state
    return (
      <FormScrollView>

        <View style={{...flexCenter, height : 120}} >
          <Image source={require("./images/lock.png")} style={{width : 60, height : 60}} />
        </View>
        
        <FormConnector
          fields={fields}
          validate={validate}
          submit={this._submit.bind(this)}>
          <ResetPasswordForm busy={busy} />
        </FormConnector>

      </FormScrollView>
    )
  }
}


/**
 * 注册表单子组件
 * @param form 表单类
 * @param fields 表单上的所有字段
 * @param submit 提交方法
 * @returns {XML}
 * @constructor
 */
const ResetPasswordForm = ({form, fields, submit, busy}) => {


  const {imgcode, vcode, mobile, password} = fields

  const send = async () => {
    console.log("@send @ResetPasswordForm")
    const mobileNumber = mobile.value
    if(!(mobileNumber && mobileNumber.length === 11 )){
      Alert.alert("错误", "请输入手机号")
      return false
    }

    if(!imgcode.value) {
      Alert.alert("错误", "请输入图片验证码")
      return false
    }
    
    const result = await get_user_vcode("forget", mobileNumber, imgcode.value)

    return true
  }
  
  return (
    <View>
      <ZInput placeholder="手机号" keyboardType="phone-pad" {...mobile} />
      <ZInput placeholder="密码"  {...password} secureTextEntry={true} />
      <ZImgCode {...imgcode} />
      <ZVCode {...vcode} send={send} />
      <View style={{...flexCenter, marginTop : 20}}>
        <ZButton onPress={submit} loading={busy}>登录</ZButton>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  textInput : {
    borderWidth : 1,
    borderColor : "#eee",
    width : 200,
    height : 40

  }
})