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
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert


} from 'react-native'

import {FormScrollView, FormConnector, ValidateMethods, flexCenter} from 'basic'
import {ZButton, ZInput, ZSwitch, ZVCode, ZImgCode} from "domain/component"

import {get_user_vcode, login} from "domain/api/apis"

import {COLOR_PRIMARY} from 'domain/def'


import {Routes} from "domain/page"
const fields = ["mobile", "password"]

const validate = (assert, fields) => {
  assert("mobile", ValidateMethods.required(), '请输入手机号')
  assert("mobile", ValidateMethods.length(11), '手机号格式不正确')
  assert("password", ValidateMethods.required(), '请输入密码')
}



export class Login extends Component {
  constructor(){
    super()
    this.state = {
      busy : false // 处理中
    }
    
    
    setTimeout( () => {
      store.dispatch({type : "NETWORK_RETRY"})
    })
    
  }
 
  async _submit(data, errors){
    
    if(errors.length > 0) {
      alert(errors[0])
      return
    }
    
    this.setState({busy : true})
    const {mobile,password} = data
    const result = await login({mobile, password})

    this.setState({busy : false})
    
    store.dispatch({
      type : "LOGIN_SUCCESS",
      name : result.name 
    })
    if(this.props.route.from) {
      this.props.navigator.pop()
    }
  }

  render(){
    const {busy} = this.state
    return (
      <FormScrollView>

        <View style={{...flexCenter, height : 120}} >
          <Image source={require("./images/login.png")} style={{width : 60, height : 60}} />
        </View>
        
        <FormConnector
          fields={fields}
          validate={validate}
          submit={this._submit.bind(this)}>
          <LoginForm busy={busy} navigator={this.props.navigator} />
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
const LoginForm = ({form, fields, submit, busy, navigator}) => {


  const {mobile, password} = fields
  return (
    <View>
      <ZInput placeholder="手机号" keyboardType="phone-pad" {...mobile} />
      <ZInput placeholder="密码"  {...password} secureTextEntry={true} />
      <View style={{justifyContent : "space-between", flexDirection : 'row'}}>
        <TouchableOpacity
          onPress={() => navigator.push({...Routes.Register})}
          style={{paddingLeft : 20}}>
          <Text style={{color : COLOR_PRIMARY, marginTop : 10}}>没有账号?马上注册</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator.push({...Routes.ResetPassword})}
          style={{paddingRight : 20}}>
          <Text style={{color : COLOR_PRIMARY, marginTop : 10}}>忘记密码</Text>
        </TouchableOpacity>
      </View>
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