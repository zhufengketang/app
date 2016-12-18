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

export class Pay extends Component {

  constructor(props){
    super()  
    
    // mock数据
    props.route.course = {
      title : "顶级大神教你写node.js",
      author : "张仁阳",
      author_profile : "XXX老师来自于XXX公司,离职后一直从事前端领域教育",
      description : "国内顶尖大神教你写node.js.从零开始,循序渐进.......",
      price : Math.random() * 10000 + 5000,
      start : "2016-10-30",
      image : "http://a1.jikexueyuan.com/home/201506/24/a082/558a11c35f925.jpg",
      address : "珠峰",
      contents : [
        "第1课: XXXXXXX",
        "第2课: XXXXXXX",
        "第3课: XXXXXXX",
        "第4课: XXXXXXX",
      ]
    }
  }
  
  render(){

    const {course} = this.props.route
    
    return (
      <View>
      </View>
    )
  }
}
