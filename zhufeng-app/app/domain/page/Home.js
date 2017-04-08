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
  TouchableWithoutFeedback,
  Platform
} from 'react-native'


import {ListView, flexCenter} from 'basic'
import Swiper from 'react-native-swiper';
import {Routes} from "domain/page"

import {CourseCardBig} from "domain/component"

import {get_courses} from "domain/api/apis"



const {width, height} = Dimensions.get('window')

const sliderItemStyle = {width, height : width * 0.523}


export class Home extends Component {


  constructor(){
    super()

    this.state = {
      initialized : false
    }

  }

  componentDidMount(){

    this.start = 0
    this.take = 5 
    this.hasMore = false

    // 第一个填另一个占位符
    // 因为轮播图也在listview中
    this.courses = [null]

    this.load_course()
  }
  
  
  async load_course () {
    // 因为轮播图等也放在了listView中

    if(this.loading) return

    try {
      this.loading = true
      const data = await get_courses(this.start, this.take)
      this.courses = [...this.courses, ...data.data.courses]
      this.start = this.start + data.data.courses.length
      this.hasMore = this.courses.length < data.data.total
      this.setState({
        initialized : true
      }, (() => {
        this.refs.listView.append(data.data.courses)
      }).bind(this))
    }
    catch(e) {
    }
    finally{
      this.loading = false
    }
  }
  

  _pressCourse(course) {
    return () => {
      this.props.navigator.push({...Routes.Course, course})
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
    this.load_course()

  }

  _renderBottomIndicator(){
    if(!this.state.initialized) {
      return false
    }
    if(!this.hasMore) {
      return <View style={{height : 42, ...flexCenter}}>
        <Text>没有更多了</Text>
      </View>  
    }
    return (
      <View style={{height : 42, ...flexCenter}}>
        {this.loading ?

          <Text>正在加载...</Text>
            :
          <ActivityIndicator />
        }
      </View>
    )
  }


  _refresh(){

    this.start = 0
    this.hasMore = false
    this.courses = [null]
    this.refs.listView.reset(this.courses)
    this.load_course();
  }

  render(){

    const {initialized} = this.state

    if(!initialized) {
      return <View style={{ ...flexCenter, height : Dimensions.get("window").height}}>
        <ActivityIndicator />
      </View>
    }

    return (
      

      <View>
        
        <ListView
          ref="listView"
          initialData={[null]}
          renderItem={this._renderItem.bind(this)}
          onScrollToBottom={this._onScrollToBottom.bind(this)}
          renderBottomIndicator={this._renderBottomIndicator.bind(this)}
          refreshControl={
          <RefreshControl refreshing={false} onRefresh={this._refresh.bind(this)} />
        }
          height={Dimensions.get("window").height - (Platform.OS === 'ios' ? 49 : 69) }
        />
      </View>
    )
  }

}

