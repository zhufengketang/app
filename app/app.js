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
  Navigator,
  BackAndroid,
  Text,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native'

import {Button, flexCenter} from "basic"
import {ZNavbar} from "domain/component"

import {COLOR_NAV_DARK, COLOR_TITLE} from "domain/def"


import {Routes} from "domain/page"

import {NetworkError} from "domain/component"

import {connect} from "react-redux"


import SplashScreen from 'react-native-splash-screen'

class _App extends Component {

  constructor(){
    super()
    setTimeout( () => {
      SplashScreen.hide()
    }, 300)
    
    this.nextTimeExit = false
  }
  componentDidMount(){
    
    BackAndroid.addEventListener('hardwareBackPress', (() => {
      const navigator = this.refs.navigator
      if(!navigator) {
        return false
      }
      const routes = navigator.getCurrentRoutes()
      if(routes.length === 1) {
        
        if(this.nextTimeExit) {
          return false
        } else {
          this.nextTimeExit = true
          alert("再按一次回退键退出珠峰课堂")
          setTimeout( (() => {
            this.nextTimeExit = false   
          }).bind(this), 5000)
          return false 
        }
        
        return 
      } else if(routes.length > 1) {
        navigator.pop()
        return true
      }
      
    }).bind(this));
  }

  
  _renderScene(route, navigator){

    const {Component, noTitleBar} = route
    return (
      <View style={{flex : 1, backgroundColor : 'white'}}>
        <StatusBar
          barStyle={route.Inverse ? "light-content" : "default"}
        />

        {!noTitleBar &&
        <View style={{ backgroundColor : route.Inverse ? COLOR_NAV_DARK : "white", height : Platform.OS === 'ios' ? 64 : 56}}>
        </View>
        }
        <Component navigator={navigator} route={route} />
      </View>

    )
  }

  _renderNavBar(){

    const titleStyle = {
      flex : 1, ...flexCenter
    }

    const routeMapper = {
      LeftButton: (route, navigator, index, navState) =>  {
        if(index === 0) {
          return null
        }
        return <ZNavbar.Back route={route} navigator={navigator} />
      },
      RightButton: (route, navigator, index, navState) => {
        return null
      },
      Title: (route, navigator, index, navState) => {
        const t_style = {...titleStyle}
        if(Platform.OS === 'android') {

          t_style.width = Dimensions.get("window").width  - 148
        }
        return (
          <View style={{...t_style}}>
            <Text style={{color : route.Inverse ? "white" : COLOR_TITLE, fontSize : 18}}>{route.Title}</Text>
          </View>
        );
      },
    }



    return (
      <Navigator.NavigationBar
        routeMapper={routeMapper}
      />
    )
  }

  render() {

    // initialRoute 设置第一张页面
    // renderScene 绘制场景 
    const {network} = this.props
    return <View style={{flex : 1}}>

      {network.error &&
      <NetworkError cache={network.cache}  />
      }
      <Navigator
        ref="navigator"
        initialRoute={Routes.Tabs}
        renderScene={this._renderScene}
        navigationBar={this._renderNavBar()}
      />
    </View>
  }
}

const mapStateToProps = (state) => {
  return {
    network : state.network   
  }
  
}
export let App = connect(mapStateToProps)(_App)







