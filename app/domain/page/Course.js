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

import {SegmentedControl, flexCenter, format_currency} from 'basic'

import {COLOR_TITLE, COLOR_TEXT_LIGHT, COLOR_PRICE, COLOR_INFO} from "domain/def"
const {width, height} = Dimensions.get('window')

const sliderItemStyle = {width, height : width * 0.523}
export class Course extends Component {
  
  constructor(props){

    super()
 
    console.log(props.route)
    
    props.route.course = {
      title : "顶级大神教你写node.js",
      author : "张仁阳",
      description : "国内顶尖大神教你写node.js.从零开始,循序渐进.......",
      price : Math.random() * 10000 + 5000,
      start : "2016-10-30",
      address : "珠峰"
    }
    
  }
  
  componentDidMount(){
    
  }
  
  _change(event){
    
    console.log("change", event.nativeEvent.selectedSegmentIndex)
  }
  render(){

    
    const {course} = this.props.route
    return <ScrollView>
      <Image source={require("./images/slide2.jpg")} style={sliderItemStyle} />
      <View style={{...flexCenter}}>
        <SegmentedControl
          selectedIndex={1}
          values={['课程介绍', '课程目录']}
          onChange={this._change}
          style={{width : 200}}
        />
        
      </View>
      <Block>
        <Title>{course.title}</Title>
        
        <LabelValue label="开课时间">
          <Description>{course.start}</Description> 
        </LabelValue>
        <LabelValue label="上课地点">
          <Description>{course.address}</Description> 
        </LabelValue>
        <LabelValue label="课程价格">
          <Price>{course.price}</Price>
        </LabelValue>
      </Block>

      <Block>
        
      </Block>
      
    </ScrollView>
  }
}

const Paragraph = {
  paddingLeft : 20,
  paddingRight : 20,

}

const Block = ({children}) => {
  
  
  return <View>
    <View style={{marginLeft : 20, marginRight : 20, borderTopWidth : 1, borderColor : "#ccc", marginTop : 20, marginBottom : 20}}></View>
    
    {children}
    
  </View>
  
}


const Title = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_TITLE, fontSize : 18, fontWeight : 'bold'}}>{children}</Text>
}

const Label = ({children, style}) => {
  return <View style={{backgroundColor : COLOR_INFO, borderRadius : 5, padding : 3, ...style}}>
    <Text style={{color : "white"}}>{children}</Text>
  </View>
}

const LabelValue = ({children, label}) => {
  
  return <View style={{...Paragraph, marginTop : 5, flexDirection : 'row', alignItems: 'center', justifyContent : "flex-start"}}>
    <Label style={{width : 70}}>{label}</Label>
    {children}
  </View>
}


const Author = ({label, children}) => {
  return <Text style={{...Paragraph, color : COLOR_TEXT_LIGHT}}>{label}:{children}</Text>
}


const Description = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_TEXT_LIGHT}}>{children}</Text>
}


const Price = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_PRICE,fontSize : 18, fontWeight : 'bold'}}>￥{format_currency(children)}</Text>
}
