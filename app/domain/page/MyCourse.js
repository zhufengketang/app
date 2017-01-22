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

import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'

import {ZButton} from 'domain/component'
import {get_orders} from "domain/api/apis"
import {flexCenter} from "basic"

import {CourseCardSmall} from "domain/component"

export class MyCourse extends Component{
  
  constructor(){
    super()
    this.state = {
      orders : null 
    }
  }
  componentDidMount(){
    
    this.loading_data()
    
  }
  
  async loading_data() {
    const data = await get_orders(0, 20)
    if(data && data.data && data.data.orderInfos) {
      this.setState({
        orders : data.data.orderInfos
      })  
    }
    
  }
  
  _switch_home(){
    this.props.switch_to("home")
  }
  
  _view(){
    
    alert("播放功能正在研发中,请按时上课")
  }
  
  render(){

    if(!this.state.orders) {
      return (
        <View style={{height : Dimensions.get("window").height - 44, ...flexCenter}}>
          <View style={{ ...flexCenter}}>
            <Image source={require("./images/laugh_face.png")} style={{width : 84, height : 84}}/>
            <Text style={{marginTop : 10, marginBottom : 10}}>您还没有选课,快去选课吧!</Text>
            <ZButton onPress={this._switch_home.bind(this)}>去发现</ZButton>
          </View>
        </View>
      )
    }

    
    return (
      <ScrollView style={{backgroundColor : "#f2f3f4", flex : 1}}>
        {this.state.orders.map( (order, i) => {
          return <TouchableOpacity key={i}
                   onPress={this._view}>
            <CourseCardSmall
            containerStyle={{margin : 10, paddingBottom : 10, backgroundColor : "white"}}
            key={i} {...order} pay={false} isLast={i === this.state.orders.length - 1} />
          </TouchableOpacity>
        })} 
      </ScrollView>
    )
    

  }
}