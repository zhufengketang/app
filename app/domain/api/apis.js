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
  const local_token =  await get_local_token()
  if(local_token) {
    console.log("local-token found:" + local_token)
    return    
  }
  const result = await http_get("/token")
  console.log(result)
  
}

/**
 * 获取验证码图片
 */
export const get_image = async () => {
  
  
  const url = url_mapper("/imgcode")
  const token = await get_local_token()
  
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
  // const img = URL.createObjectURL(blob);
  // return img
  
  
}
