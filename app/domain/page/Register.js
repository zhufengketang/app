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
  Alert,
  ScrollView,
  TouchableWithoutFeedback


} from 'react-native'

import {FormScrollView, FormConnector, ValidateMethods, flexCenter} from 'basic'
import {ZButton, ZInput, ZSwitch, ZVCode, ZImgCode} from "domain/component"


const fields = ["user_name" , "password", "mobile",  "agree", "vcode", "imgcode"]

const validate = (assert, fields) => {
  assert("user_name", ValidateMethods.required(), '请输入用户名')
  assert("mobile", ValidateMethods.required(), '请输入手机号')
  assert("mobile", ValidateMethods.length(11), '手机号格式不正确')
  assert("password", ValidateMethods.required(), '请输入密码')
}



export class Register extends Component {
  _submit(data, errors){
    
    /// TODO 处理表单提交
    console.log(data)
    console.log(errors)
  }

  render(){
    return (
      <FormScrollView>

        <View style={{...flexCenter, height : 160}} >
          <Image source={require("./images/register.png")} style={{width : 60, height : 60}} />
        </View>
        
        <FormConnector
          data={{agree : true}}
          fields={fields}
          validate={validate}
          submit={this._submit}>
          <RegisterForm />
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
const RegisterForm = ({form, fields, submit}) => {

  const {user_name, mobile, password, vcode, agree, imgcode} = fields
  console.log(user_name)
  return (
    <View>

      <ZInput placeholder="姓名" {...user_name} />
      <ZInput placeholder="手机号" keyboardType="phone-pad" {...mobile} />
      <ZInput placeholder="密码"  {...password} secureTextEntry={true} />

      <ZImgCode {...imgcode} />
      <ZVCode {...vcode} />
      <ZSwitch label="同意注册协议" {...agree} />

      <View style={{...flexCenter, marginTop : 20}}>
        <ZButton onPress={submit}>提交</ZButton>
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