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

import {AsyncStorage} from "react-native"
import {SERVICE_BASE} from "domain/def"
import qs from 'qs'
import {get_local_token, set_local_token} from "domain/store/storage"



/***
 * 生成HTTP请求函数
 * @param method
 */
const http_factory = (method) => {
  return async (url, params) => {
    console.log("@http_factory")
    url = url_mapper(url)

    // 获取TOKEN
    let token = await get_local_token()

    console.log("@http_factory after get_local_token" )


    // 生成Fetch的请求选项
    const requestOptions = {
      method,
      headers : {
        Accept: 'application/json',
        token
      },
    }


    if(method == "GET") {
      const queryString = qs.stringify(params)
      url = `${url}${queryString && "?"+queryString}`
    } else {
      requestOptions.headers = {...requestOptions.headers, 'Content-Type': 'application/json'}
      requestOptions.body = JSON.stringify(params)
    }


    /**
     * 发送http请求
     * @returns {*}
     */
    const send_request = () => {
      const _fecthCache = {
        url,
        requestOptions
      }

      return new Promise( (resolve,reject ) => {

        fetch(url, requestOptions)
          .then(response => {
            resolve(response)
          })
          .catch(e => {
            store.dispatch({
              type : "NETWORK_ERROR",
              cache : {
                url,
                requestOptions,
                resolve  
              }
              
            })

          })

      })


    }


    try{
      console.log("@http_factory before sending")
      const http_result = await send_request()
      console.log("@http_factory send request to " + url + " with params ")
      console.log(params)
      console.log("and options")
      console.log(requestOptions)
      const text = await http_result.text()
      const json = JSON.parse(text) 

      console.log("get json result with token:" + json.token)
      console.log(json)
      if(json.token) {
        set_local_token(json.token)
      }
      // return {type : "HTTP_RESULT", url : "url",  json}
      return json
    }
    catch (e) {
      console.error(e + ":" + url)
    }

  }
}


/**
 * URL 计算请求函数
 * @param url
 */
export const url_mapper = (url) => {
  const fullUrl = SERVICE_BASE.replace(/\/$/, '') + "/" + url.replace(/^\//, '')
  console.log("@at url_maper :" + fullUrl)
  return fullUrl

}


export const http_get = http_factory("GET")
export const http_post = http_factory("POST")
export const http_put = http_factory("PUT")
export const http_delete = http_factory("DELETE")

