/***********************************************
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
  View,
  Text,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'

import {format_currency} from "basic"


import {COLOR_TITLE, COLOR_TEXT_LIGHT, COLOR_PRICE} from "domain/def"

export class Home extends Component {

  constructor(){
    super()

    this.state = {
      course : {
        image : "http://pic31.nipic.com/20130710/7092831_114938320000_2.jpg",
        title : "顶级大神教你写node.js",
        author : "张仁阳",
        description : "国内顶尖大神教你写node.js.从零开始,循序渐进.......",
        price : 10000
      }
    }
  }


  render(){

    const {course} = this.state
    return (
      <ScrollView>
        <CourseCard course={course} />

        <CourseCard course={course} />
        <CourseCard course={course} />
        <CourseCard course={course} />
        <CourseCard course={course} />
      </ScrollView>
    )
  }

}

class CourseCard extends Component{

  render() {
    const W = Dimensions.get("window").width

    return <View style={{marginBottom : 15, paddingBottom : 10, marginLeft : 10, marginRight : 10, borderRadius : 5, overflow : "hidden", borderWidth : 1, borderColor : "#c7c8c9"}}>
      <Image
        source={{uri : "http://a.hiphotos.baidu.com/image/h%3D200/sign=af9259bf03082838770ddb148898a964/6159252dd42a2834bc76c4ab5fb5c9ea14cebfba.jpg"}}
        style={{width : W - 20, height : (W - 20) * 0.3}}
      />
      <Title>顶级大神教你写node.js</Title>
      <Author label="讲师">张仁阳</Author>
      <Description>国内顶尖大神教你写node.js.从零开始,循序渐进.......</Description>
      <Price>10000</Price>
    </View>
  }

}

const Paragraph = {
  paddingLeft : 20,  
  paddingRight : 20,
  marginTop : 10
  
}



const Title = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_TITLE, fontSize : 18, fontWeight : 'bold'}}>{children}</Text>

}
/**
 * 等同于
 * class Title extends Component {
 *    render() {
 *      const {children} = this.props
 *      ....
 *    }
 * }
 *
 */


const Author = ({label, children}) => {
  return <Text style={{...Paragraph, color : COLOR_TEXT_LIGHT}}>{label}:{children}</Text>
}


const Description = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_TEXT_LIGHT}}>{children}</Text>
}

// 1000 => 1,000.00
// 1000.000 => 1,000.00



const Price = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_PRICE,fontSize : 18, fontWeight : 'bold'}}>￥{format_currency(children)}</Text>
}
