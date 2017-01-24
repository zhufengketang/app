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

import {View, Text, ScrollView,Dimensions, ActivityIndicator, RefreshControl} from 'react-native'
import {flexCenter} from 'basic'

/**
 * 滚动替换,同时承担了计算下一个状态和初始状态的函数
 * @param cards 卡片列表
 * @param itemHeights
 * @param H
 * @param S
 * @param y
 */
const nextReplaceScrollState = (cards, itemHeights, H,  S,  y ) => {

  const sTop = Math.floor(S / 2)
  const sBottom = Math.floor(S / 2)

  // p : 开始的卡片  第一个top大于(y - H)的卡片
  let sum = 0
  let p = 0

  for(let i = 0; i < cards.length; i++) {
    if(sum > y - H ) {
      p = cards[i].id
      break
    }
    sum += itemHeights[cards[i].id]
  }
  p = p - sTop
  if(p < 0) {
    p = 0
  }

  // 结束的卡片  (q = p + S)
  const q = p + S - 1


  // H1: 顶部替换盒子的高度 top(p)  sum (1 + ... + p-1)
  const lst1 = cards
    .filter(card => card.id < p)
    .map(card => itemHeights[card.id])
  const H1 =   lst1.length > 0 ? lst1.reduce((h1, h2) => h1 + h2) : 0

  const lst3 = cards
    .filter(card => card.id > q)
    .map(card => itemHeights[card.id])

  const H3 = lst3.length > 0 ?
    lst3.reduce((h1, h2) => h1 + h2) : 0


  return {p, q, H1, H3}

}


// 通用场景: 
// 1. 用户先渲染20项
// 2. 用户下拉列表--- 发送请求到服务器 -- 再渲染20项

// 每次加载新卡片时候记录卡片的高度


export class ListView extends Component {

  static propTypes = {
  }
  static defaultProps = {
    displaySize : 20,  //默认同时渲染10张卡片,
    initialData : [],
    renderBottomIndicator : () => {
      return (
        <View style={{height : 42, ...flexCenter}}>
          <ActivityIndicator />
        </View>
      )
    }
  }

  constructor(props) {
    super()


    // 滚动距离
    this.y = 0

    // 所有的卡片高度
    this.itemHeights = []


    // ID 计数器  
    this.id_counter = 0



    const {height : H} = props

    this.state = {
      data : [] // 数据
    }

  }

  componentDidMount() {
    this.append(this.props.initialData)
  }


  /**
   * 重置ListView
   * @param list
   */
  reset(list){

    this.itemHeights = []
    this.id_counter = 0
    this.setState({
      data : [],
      newlyAdded : [],
      scrollLock : false,
      p : 0,
      q : 0
    }, (() => {

      this.append(list)
    }).bind(this))

  }



  /**
   * 向ListView中添加项
   * @param list
   */
  append(list) {

    //[{name : "ramroll", title : "teacher"}]
    // => [ {id : 1, item : {name : "ramroll", title : "teacher" }} ]
    // 分配ID
    const nList = list.map(((item, i) => {
      return {
        id : ++this.id_counter ,
        item
      }
    }).bind(this))

    const I = setInterval( (() => {
      // 渲染完成
      if(this.itemHeights[this.id_counter]) {
        clearInterval(I)
        this.setState({
          ...nextReplaceScrollState(this.state.data, this.itemHeights, this.height, this.props.displaySize, this.y),
          // 新卡片都渲染完成后解锁滚动替换方法
          scrollLock : false,
          newlyAdded : []
        })
      }
    }).bind(this), 100)

    this.setState({
      // 将新卡片append在底部
      data : [...this.state.data, ...nList],
      newlyAdded : nList,
      // 将滚动替换过程锁定
      scrollLock : true
    })

  }



  _scroll(e) {
    this.y = e.nativeEvent.contentOffset.y

    const atBottom = (this.y + this.height >= e.nativeEvent.contentSize.height)

    if(atBottom) {
      this.props.onScrollToBottom(this.y + this.height - e.nativeEvent.contentSize.height)
    }

    if(!this.state.scrollLock) {
      this.setState({
        ...nextReplaceScrollState(this.state.data, this.itemHeights, this.height, this.props.displaySize, this.y)
      })
    }

  }


  _itemLayout(i) {
    return ({nativeEvent : {layout}}) => {
      this.itemHeights[i] = layout.height
    }
  }

  _layout({nativeEvent : {layout}}){
    this.height = layout.height
  }

  _renderItem({item, id}){

    return <View key={id} onLayout={this._itemLayout(id).bind(this)}>
      {this.props.renderItem(item, id)}
    </View>
  }


  _scrollRelease(e) {
    this.props.onResponderRelease && this.props.onResponderRelease(e)
  }

  _refresh(){

    console.log("refresh")
  }

  render(){

    const {p, q, H1, H3, newlyAdded, scrollLock, data} = this.state

    let visibleData = data.filter( ({item, id}) => {
      if(id >= p && id <= q) {
        return true
      }
      return false
    })


    if(newlyAdded && newlyAdded.length > 0) {
      visibleData = [
        ...visibleData,
        ...newlyAdded.filter(x => !visibleData.find(t => t.id === x.id))
      ]
    }



    console.log("@listView" + this.props.height)
    return (
      <ScrollView
        onResponderRelease={this._scrollRelease.bind(this)}
        onLayout={this._layout.bind(this)}
        onScroll={this._scroll.bind(this)}
        scrollEventThrottle={15}
        refreshControl={this.props.refreshControl}


      >
        <View style={{height : H1}}></View>
        {
          visibleData.map(this._renderItem.bind(this))
        }
        <View style={{height : H3}}></View>
        {this.props.renderBottomIndicator()}
      </ScrollView>
    )
  }

}
