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

import {Tabbar} from 'domain/component'
import {TabbarItem} from 'domain/component'

import {Home} from "./Home"
import {MyCourse} from "./MyCourse"
import {UserCenter} from "./UserCenter"


export class Tabs extends Component{
  
  render(){
    return (
      <Tabbar>
        <TabbarItem
          name="home"
          title="首页" activeIcon={require("./images/menu-index.png")} icon={require("./images/menu-index-gray.png")}>
          <Home navigator={this.props.navigator} route={this.props.route} />
        </TabbarItem>
        <TabbarItem
          name="mycourse"
          title="我的课程" activeIcon={require("./images/my-course.png")} icon={require("./images/my-course-gray.png")}>
          <MyCourse  navigator={this.props.navigator} route={this.props.route} />
        </TabbarItem>
        <TabbarItem
          name="usercenter"
          title="个人中心" activeIcon={require("./images/user-center.png")} icon={require("./images/user-center-gray.png")}>
          <UserCenter  navigator={this.props.navigator} route={this.props.route} />
        </TabbarItem>
      </Tabbar>
    )
  }
}