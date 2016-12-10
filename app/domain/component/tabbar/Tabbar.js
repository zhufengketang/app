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

  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import {flexCenter} from 'basic'

export class Tabbar extends Component {
  
  constructor(props){
    super()
    this.state = {
      active : props.initialActive
    }
  }

  _press(name){
    
    return () => {
      this.setState({
        active : name
      })  
    }
    
    
  }

  render() {
    const {children } = this.props
    const {active} = this.state
    
    return (
      <View style={{flex : 1}}>
        <View style={{flex : 1}}>
          {children.map((child, i) => {
            return React.cloneElement(child, {active, key : i})
          })}
        </View>
        <View style={{backgroundColor : "white", height : 48, flexDirection : "row", borderTopWidth : 1, borderColor : "#ccc" }}>
          {children.map((child, i) => {
            
            const {title, name, icon, activeIcon} = child.props

            console.log(name, active)
            return <TouchableOpacity onPress={this._press(name).bind(this)} key={i} style={{flex : 1, height : 48, ...flexCenter}}>
              <View style={{...flexCenter}}>
                <Image source={name == active ? activeIcon : icon} resizeMode="contain"  style={{width : 20, height : 20, marginBottom : 5}} />
                <Text>{title}</Text>
              </View>
            </TouchableOpacity>
            
            
            
          })}
          
        </View>
      </View>
    )
  }
}


class TabbarItem extends Component{

  render(){

    const {children, name, active} = this.props
    const style = {overflow : 'hidden'}
    if(active != name) {
      style.height = 0
    }
    return <View style={style}>
      {children}
    </View>
    
  }
}

Tabbar.Item = TabbarItem



