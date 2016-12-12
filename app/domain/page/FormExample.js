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
  TextInput,
  StyleSheet,
  Alert,
  Switch,
  Picker


} from 'react-native'

import {FormConnector, ValidateMethods} from 'basic'
import {ZButton} from "domain/component"



export class FormExample extends Component {

  
  render(){
    return (
      <View>

        <FormConnector ref="fc" fields={fields} validate={validate}>
          <LoginForm />
        </FormConnector>
      </View>
    )
  }
}




// FormConnector --> LoginForm

class LoginForm extends Component{
  submit(){
    this.props.form.validate()
    
    if(this.props.form.hasError()) {
      Alert.alert(this.props.form.getErrors().shift())
      return
    }
    
    const data = this.props.form.getData() 
    /// 登录
  }
  render(){

    const {
      form, fields
    } = this.props

    const {user_name, password, age, agree} = fields
    console.log(user_name)
    return (
      <View>
        <View>
          <Text>手机号:</Text>
          <TextInput {...user_name} style={styles.textInput} keyboardType="phone-pad"/>
          <Text>{user_name.error}</Text>
        </View>

        <View>
          <Text>密码:</Text>
          <TextInput
            {...password}
            secureTextEntry={true}  style={styles.textInput}/>
        </View>
        <View>
          <Text>同意注册协议:</Text>
          <Switch  />
          
        </View>

        <Picker
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <TextInput {...age} style={styles.textInput}/>
        <ZButton onPress={this.submit.bind(this)}>提交</ZButton>
      </View>
    )

  }
}



const validate = (assert, fields) => {
  assert("user_name", ValidateMethods.required(), '请输入用户名')
  assert("password", ValidateMethods.required(), '请输入密码')
}



const fields = ["user_name" , "password", "age", "agree"]


const styles = StyleSheet.create({
  textInput : {
    borderWidth : 1,
    borderColor : "#eee",
    width : 200,
    height : 40
    
  }
})