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
  Dimensions
} from 'react-native'

import {ZButton} from 'domain/component'
import {get_orders} from "domain/api/apis"
import {flexCenter} from "basic"

export class MyCourse extends Component{
  
  constructor(){
    super()
    this.state = {
      orders : []
    }
  }
  componentDidMount(){
    
    this.loading_data()
    
  }
  
  async loading_data() {
    const data = await get_orders(0, 20)
    if(data) {
      // this.setState({
      //   orders : data.orders
      // })  
    }
    
  }
  
  _switch_home(){
    this.props.switch_to("home")
  }
  
  render(){
    
    return (
      <View style={{height : Dimensions.get("window").height - 64, ...flexCenter}}>
        <View style={{ ...flexCenter}}>
          <Image source={require("./images/laugh_face.png")} style={{width : 84, height : 84}} />
          <Text style={{marginTop : 10, marginBottom : 10}}>您还没有选课,快去选课吧!</Text>
          <ZButton onPress={this._switch_home.bind(this)}>去发现</ZButton>
        </View>
      </View>
    )
  }
}