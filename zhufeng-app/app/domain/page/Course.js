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
import {ZBottomButton} from "domain/component"

import {Routes} from "domain/page"
import {post_order} from "domain/api/apis"


export class Course extends Component {

  constructor(props){

    super()


    this.state = {
      tabIndex : 0
    }

  }

  componentDidMount(){

  }

  _change(event){
    this.setState({
      tabIndex: event.nativeEvent.selectedSegmentIndex
    })
  }
  
  async _buy(){
    const result = await post_order(this.props.route.course.id)
    if(assert_request(result)){
      const logined = await login_check(result, this.props.navigator, this.props.route)
      if(logined) {

        /// TODO
        const orderId = result.data
        const course = this.props.route.course
        const route = {...Routes.Pay, orderId, course}

        this.props.navigator.push(route)

      }
    }
    
  }

  render(){

    const {tabIndex} = this.state

    const {course} = this.props.route
    return <View style={{flex : 1}}>
      <ScrollView style={{flex : 1}}>
        <Image source={{uri : course.image}} style={sliderItemStyle} />

        <View style={{...flexCenter, marginTop : 20}}>
          <SegmentedControl
            selectedIndex={tabIndex}
            values={['课程介绍', '课程目录']}
            onChange={this._change.bind(this)}
            style={{width : 200}}
          />
        </View>

        {tabIndex == 0 &&
        <View>
          <Block>
            <Title>{course.title}</Title>
            <LabelValue label="开课时间">
              <Description>{course.start.substring(0, 10)}</Description>
            </LabelValue>
            <LabelValue label="上课地点">
              <Description>{course.address}</Description>
            </LabelValue>
            <LabelValue label="课程价格">
              <Price>{course.price}</Price>
            </LabelValue>

          </Block>

          <Block>
            <View>
              <IconLabel icon={require("./images/introduce.png")}>课程简介</IconLabel>
              <View>
                <Description>{course.description}</Description>
              </View>
            </View>
          </Block>
          <Block>
            <View>
              <IconLabel icon={require("./images/about-teacher.png")}>教师简介</IconLabel>
              <View>
                <Description>{course.author_profile}</Description>
              </View>
            </View>
          </Block>
        </View>
        }

        {
          tabIndex == 1 &&
          <View>
            <Block >
              {course.contents.map( (entry, i) => {
                return <View key={i} style={{...Paragraph, height : 30}}>
                  <Text>{entry}</Text>
                </View>
              })}
            </Block>
          </View>
        }
      </ScrollView>

      <View style={{height : 42}}>
        <ZBottomButton onPress={this._buy.bind(this)}>购买</ZBottomButton>
      </View>
    </View>
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
  return <View style={{backgroundColor : COLOR_INFO, borderRadius : 5, padding : 3, ...flexCenter, ...style}}>
    <Text style={{color : "white"}}>{children}</Text>
  </View>
}

const LabelValue = ({children, label}) => {

  return <View style={{...Paragraph, marginTop : 5, flexDirection : 'row', alignItems: 'center', justifyContent : "flex-start"}}>
    <Label style={{width : 70}}>{label}</Label>
    {children}
  </View>
}


const IconLabel = ({icon, children}) => {
  return (
    <View style={{...Paragraph, flexDirection: "row", paddingTop : 5, paddingBottom : 5}}>
      <Image style={{width : 20, height : 20}} source={icon} />
      <Text style={{fontSize : 16, fontWeight : 'bold'}}>{children}</Text>
    </View>
  )
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
