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
  RefreshControl,
  TouchableOpacity,
  Platform
} from 'react-native'


import {ListView, flexCenter} from 'basic'
import Swiper from 'react-native-swiper';
import {Routes} from "domain/page"

import {CourseCardBig} from "domain/component"




const course_gen = () => {
  const images = [
    'http://a1.jikexueyuan.com/home/201506/24/a082/558a11c35f925.jpg',
    'http://a1.jikexueyuan.com/home/201507/15/8a29/55a5c11d411b5.jpg',
    'http://photocdn.sohu.com/20150511/mp14262803_1431334812364_1_th.jpeg'
  ]
  return {
    image : images[Math.floor(Math.random() * 3)],
    title : "顶级大神教你写node.js",
    author : "张仁阳",
    author_profile : "XXX老师来自于XXX公司,离职后一直从事前端领域教育",
    address : "珠峰",
    hours : "21小时",
    description : "国内顶尖大神教你写node.js.从零开始,循序渐进.......",
    price : Math.random() * 10000 + 5000,
    start : "2016-10-30"
  }
}

const {width, height} = Dimensions.get('window')

const sliderItemStyle = {width, height : width * 0.523}


export class Home extends Component {


  constructor(){
    super()




    const courses = [null]

    for(let i = 0; i < 20; i++) {
      courses.push(course_gen())
    }


    this.state = {
      courses : courses,
      loading : false
    }
  }

  _pressCourse(course) {
    console.log(1)
    return () => {
      this.props.navigator.push({...Routes.Course, course})
      /// TODO 跳转
    }
  }
  _renderItem(course, i) {
    if(!course) {

      return(
        <View>

          <Swiper height={Dimensions.get("window").width * 0.523}
                  dot={<View style={{backgroundColor:'rgba(0,0,0,.1)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                  activeDot={<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          >
            <View style={{flex : 1}}>
              <Image source={require("./images/slide1.jpg")} style={sliderItemStyle} resizeMode="stretch" />
            </View>
            <View style={{flex : 1}}>
              <Image source={require("./images/slide2.jpg")} style={sliderItemStyle} resizeMode="contain" />
            </View>
          </Swiper>
          <View style={{height : 10, backgroundColor : "#f2f3f4", width : Dimensions.get("window").width }}></View>
          <View style={{marginLeft : -10, marginTop : 10}}>
            <Image source={require("./images/fire-all-course.png")} style={{height : 30}} resizeMode="contain" />
          </View>

        </View>
      )
    }
    else {

      return (
        <CourseCardBig onPress={this._pressCourse(course).bind(this)} {...course}  />
      )

    }
  }


  _onScrollToBottom(y){
    this.y = y


    if(this.state.loading) {return}

    this.setState({ loading : true }, (() => {
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
    }).bind(this))
  }

  _renderBottomIndicator(){
    return (
      <View style={{height : 42, ...flexCenter}}>
        <ActivityIndicator />
      </View>
    )
  }

  _release(){
    /*
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
     */
  }



  _refresh(){

    if(!this.state.loading) {

      this.setState({loading : true}, (() => {
        setTimeout((() => {
          const courses = [null]
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
          renderItem={this._renderItem.bind(this)}
          onScrollToBottom={this._onScrollToBottom.bind(this)}
          renderBottomIndicator={this._renderBottomIndicator.bind(this)}
          onResponderRelease={this._release.bind(this)}
          refreshControl={
          <RefreshControl refreshing={false} onRefresh={this._refresh.bind(this)} />

        }
          height={Dimensions.get("window").height - (Platform.OS === 'ios' ? 49 : 69) }
        />
      </View>
    )
  }

}

