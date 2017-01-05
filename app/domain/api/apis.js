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


import {http_get, http_post, http_put, url_mapper} from "domain/api/http"

import {get_local_token} from "domain/store/storage"

/**
 * 请求获取token,并缓存在本地
 */
export const get_token = async () => {
  // if(store.getState().user.token) {
  //   store.dispatch({type : "LOCAL_TOKEN_FOUND", token : store.getState().user.token})
  //   return
  // }
  return await http_get("/token")
}

function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}


/**
 * 获取验证码图片
 */
export const get_image = async () => {


  const url = url_mapper("/imgcode")
  const token = await get_local_token()

  console.log("@get_image[图片验证码] with token " + token)
  const options = {
    headers : {
      token
    }
  }
  const result = await fetch(url, options)
  if(result.status > 400) {
    console.error('404')
    return
  }
  
  const arrayBuffer = await result.arrayBuffer()
  const base64Str = await _arrayBufferToBase64(arrayBuffer)
  return "data:image/png;base64," + base64Str

}

/**
 * 获取用户注册码
 */
export const get_user_vcode = (type, mobile, imgcode) => {
  console.log("@get user vcode")
  return http_get("/user/vcode", {type, mobile, "img_code" : imgcode})
}
