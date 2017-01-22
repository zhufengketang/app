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
import {Alert} from 'react-native'
import {Routes} from "domain/page"
var Toast = require('@remobile/react-native-toast');

import {get_token} from "domain/api/apis"

/**
 * 注册一些全局函数
 */

function assert_request(json) {
  if (json.code == 1000) {
    Toast.show(json.data)
    return false
  }
 
  return true
}

async function login_check(json, navigator, route) {
  if(json.code === 201) {
    Toast.show("请登录")
    await get_token(true)
    setTimeout( () => {
      navigator.push({...Routes.Login, from : route})
    })
    return false
  } 
  return true
}


function alert (text) {
  setTimeout( () => {

    Toast.show(text)
  }, 1)
}

global.assert_request = assert_request
global.login_check = login_check
global.alert = alert