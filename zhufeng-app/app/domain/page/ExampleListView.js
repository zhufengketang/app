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
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  RefreshControl
} from 'react-native'

import {format_currency, flexCenter} from "basic"


import {COLOR_TITLE, COLOR_TEXT_LIGHT, COLOR_PRICE} from "domain/def"


import {ListView} from 'basic'



const course_gen = () => {
  return {
    image : "http://a.hiphotos.baidu.com/image/h%3D200/sign=af9259bf03082838770ddb148898a964/6159252dd42a2834bc76c4ab5fb5c9ea14cebfba.jpg",
    title : "顶级大神教你写node.js",
    author : "张仁阳",
    description : "国内顶尖大神教你写node.js.从零开始,循序渐进.......",
    price : Math.random() * 10000 + 5000
  }
}


export class Home extends Component {
  

  constructor(){
    super()

    
    
    const courses = []
    
    for(let i = 0; i < 20; i++) {
      courses.push(course_gen())  
    }


    this.state = {
      courses : courses,
      loading : false 
    }
  }

  _renderItem(course, i) {
    return (
      <CourseCard {...course}  />
    )
  }


  _onScrollToBottom(y){
    
    this.y = y
    console.log(y)
  }
  
  _renderBottomIndicator(){

    const indicator = this.y < 100 ? 
      <ScrollIndicator image={require("./arrow_down.png")}>下拉加载更多</ScrollIndicator> 
      : <ScrollIndicator image={require("./arrow_up.png")}>释放加载更多</ScrollIndicator>
     
    return (
      <View style={{height : 42, ...flexCenter}}>
        {this.state.loading ?
          <ActivityIndicator />
          :
          indicator
        }
      </View>
    )
  }
  
  _release(){
    if(this.y > 100 && !this.state.loading) {
      this.setState({ loading : true }, (() => {
      }).bind(this))

      setTimeout((() => {
        const courses = []
        for(let i = 0; i < 20; i++) {
          courses.push(course_gen())
        }
        this.refs.listView.append(courses)
        this.setState({
          loading : false
        })
      }).bind(this), 2000) 
    }
  }
  
  
  
  _refresh(){
    
    if(!this.state.loading) {

      this.setState({loading : true}, (() => {
        setTimeout((() => {
          const courses = []
          for(let i = 0; i < 20; i++) {
            courses.push(course_gen())
          }
          this.refs.listView.reset(courses)
          this.setState({
            loading : false
          })
        }).bind(this), 2000)
      }).bind(this))
    }
  }
  
  render(){

    const loading = this.state
    return (
      <View>
        <ListView
          ref="listView"
          initialData={this.state.courses}
          renderItem={this._renderItem}
          onScrollToBottom={this._onScrollToBottom.bind(this)}
          renderBottomIndicator={this._renderBottomIndicator.bind(this)}
          onResponderRelease={this._release.bind(this)}
          refreshControl={
          <RefreshControl refreshing={false} onRefresh={this._refresh.bind(this)} />
        }
        />
      </View>
    )
  }

}

class CourseCard extends Component{

  render() {
    const W = Dimensions.get("window").width
    
    const {image, title, author, description, price} = this.props

    return <View style={courseStyle.cardContainer}>
      <Image
        source={{uri : image}}
        style={{width : W - 20, height : (W - 20) * 0.3}}
      />
      <Title>{title}</Title>
      <Author label="讲师">{author}</Author>
      <Description>{description}</Description>
      <Price>{price}</Price>
    </View>
  }

}

const courseStyle = StyleSheet.create({
    cardContainer: {
      marginBottom: 20,
      paddingBottom: 10, 
      marginLeft: 10,
      marginRight: 10, borderRadius: 5, overflow: "hidden", borderWidth: 1, borderColor: "#c7c8c9",
    }
  }
)

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

const ScrollIndicator = ({children, image}) => {
  return <View style={{flexDirection : 'row', ...flexCenter}}>
    <Text>{children}</Text>
    <Image source={image} style={{width : 18, height : 18}} />
  </View>
  
  
}


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
