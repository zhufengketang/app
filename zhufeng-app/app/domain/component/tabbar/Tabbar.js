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
  TouchableOpacity,
  Dimensions
} from 'react-native'

import {flexCenter} from 'basic'

import {connect} from 'react-redux'

class _Tabbar extends Component {
  
  constructor(props){
    super()
  }

  switch_to(name){
    store.dispatch({
      type : "SWITCH_TAB",
      active : name 
    })
  }

  _press(name){
    return (() => {
      this.switch_to(name)
    }).bind(this)
  }

  render() {
    const {children,active} = this.props
    console.log("render @Tabbar active:" + active)
    return (
      <View style={{flex : 1, flexDirection : 'column', justifyContent : 'flex-start', overflow : 'hidden'}}>
        <View style={{flex : 1}}>
          {children.map((child, i) => {
            return React.cloneElement(child, {key : i, active, switch_to : this.switch_to.bind(this)})
          })}
        </View>
        <View style={{backgroundColor : "white", height : 48, flexDirection : "row", borderTopWidth : 1, borderColor : "#ccc" }}>
          {children.map((child, i) => {

            const {title, name, icon, activeIcon} = child.props

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


const map = (state) => {
  return {
    active: state.tab.active
  }
}
export let Tabbar = connect(map)(_Tabbar)




