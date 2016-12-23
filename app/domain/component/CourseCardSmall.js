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
import {View, Dimensions, TouchableOpacity, Image, StyleSheet, Text} from 'react-native'
import {format_currency, flexCenter} from "basic"
import {COLOR_TITLE, COLOR_TEXT_LIGHT, COLOR_PRICE, COLOR_INFO} from "domain/def"
import {ZButton} from 'domain/component'

export class CourseCardSmall extends Component{

  render() {
    const W = Dimensions.get("window").width

    const {image, title, start, hours, author, description, price, address} = this.props

    return <View elevation={true}>
      <Title>{title}</Title>

      <View style={{flexDirection: 'row'}}>
        <View style={{marginLeft : 20, borderRadius : 5, overflow : "hidden"}}>
          <Image
            source={{uri : image}}
            style={{width : W * 0.4, height : W * 0.4 * 0.6}}
          />
        </View>
        <View style={{paddingLeft : 10}}>
          <LabelValue label="开课时间">{start}</LabelValue>
          <LabelValue label="上课地点">{address}</LabelValue>
          <LabelValue label="时长">{hours}</LabelValue>
        </View>
      </View>

      <View style={{borderBottomWidth : 1, borderColor : '#ccc', margin: 20}}></View>
      <View style={{alignItems : 'flex-end', paddingRight : 20}}>
        <Price label="现金金额">{price}</Price>
      </View>

      <View style={{...flexCenter, marginTop : 20 }}>
        <ZButton>支付</ZButton>
      </View>
        
    </View>
  }

}

const Price = ({label, children}) => {
  return <Text style={{color : COLOR_PRICE,fontSize : 20, fontWeight : 'bold'}}>{label}￥{format_currency(children)}</Text>
}

const Label = ({children, style}) => {
  return <View style={{padding : 3, ...style}}>
    <Text>{children}</Text>
  </View>
}

const LabelValue = ({children, label}) => {

  return <View style={{marginTop : 5, flexDirection : 'row'}}>
    <Label style={{marginRight : 20}}>{label}</Label>
    <Text style={{color : COLOR_TEXT_LIGHT}}>{children}</Text>
  </View>
}

const Title = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_TITLE, fontSize : 20, marginTop : 20, marginBottom : 15, fontWeight : 'bold'}}>{children}</Text>
}

const Paragraph = {
  paddingLeft : 20,
  paddingRight : 20,

}
