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
import {View, Dimensions, PanResponder, Text, Animated} from 'react-native'

const CARD_WIDTH = 200
const W = Dimensions.get("window").width
const placeHolderW = (W - CARD_WIDTH) / 2

const total = (n) => CARD_WIDTH * n + (n - 1) * placeHolderW / 2 + 2 * placeHolderW

const next_state = ({x}, diff, N) => {
  const totalW = CARD_WIDTH * N + (N - 1) * placeHolderW / 2 + 2 * placeHolderW
  const nextX = x._value + diff
  x.setValue(nextX < 0 ? 0 : (nextX > (totalW - W) ? (totalW - W) : nextX))
  return {
    x  
  }
}

/**
 * 计算释放后卡片停留在哪里
 * @param N
 * @returns {function()}
 */
const stop_at = (N) => {

  const ranges = [0]

  for(let i = 1; i <= N; i++) {
    ranges.push(CARD_WIDTH * i + placeHolderW  + placeHolderW / 4 + (placeHolderW / 2) * (i - 1))
  }
  

  
  return (x) =>  {

    for (let i = 0 ; i < ranges.length - 1; i++ ) {
      const l = ranges[i]
      const r = ranges[i+1]
      const X = x + W / 2
      if(X >= l && X <= r) {
        return i
      }
    }

    throw "到不了这里"
  }


}


export class Example4 extends Component {


  constructor(){
    super()

    this.state = {
      x : new Animated.Value(0)
    }
  }

  componentWillMount(){

    let lastX = null
    let _self = this

    const stopAtFunction = stop_at(4)
    this._panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove : (evt, gestureState) => {

        if(lastX !== null) {
          const diff = -Math.floor(gestureState.moveX - lastX )
          const nextState = next_state(_self.state, diff, 4)
          _self.setState(nextState, () => {

            //
          })
        }

        lastX = gestureState.moveX
      },
      onPanResponderRelease: (evt, gestureState) => {
        lastX = null
        const n = stopAtFunction(_self.state.x._value)

        _self._moveTo(_self.state.x, n)

      },

    })
  }
  
  _moveTo(x, n) {
    
    const endPosition =  (n) => {
      return placeHolderW + CARD_WIDTH * n + (placeHolderW / 2) * n +  CARD_WIDTH / 2 - W / 2
    }
   
    
    const end = endPosition(n)
    
    
    // this.setState({
    //   x : end
    // })


    Animated.timing(this.state.x, {toValue : end, duration : 200}).start()
    
    
    
  }

  render(){

    const {x} = this.state
    return (
      <Animated.View style={{flexDirection : "row", marginLeft: x.interpolate({inputRange : [W - total(4), 0], outputRange:[total(4) - W, 0]})}} {...this._panResponder.panHandlers}>


        <View style={{width : placeHolderW}}></View>
        <Card width={CARD_WIDTH} x={x} idx={1} >
          <Text>1</Text>
        </Card>

        <View style={{width : placeHolderW / 2}}  ></View>
        <Card width={CARD_WIDTH} x={x} idx={2}>
          <Text>2</Text>
        </Card>

        <View style={{width : placeHolderW / 2}}></View>
        <Card width={CARD_WIDTH } x={x} idx={3} >
          <Text>3</Text>
        </Card> 

        <View style={{width : placeHolderW / 2}}></View>
        <Card width={CARD_WIDTH} x={x} idx={4} >
          <Text>4</Text>
        </Card> 
        <View style={{width : placeHolderW}}></View>
      </Animated.View>
    )
  }

}

const Card = ({width, children, x, idx}) => {

  
  const colors = ["blue", "red", "green", "yellow"]
  

  function scaleR() {
    // 卡片中心
    const c_card = placeHolderW + (idx - 1) * CARD_WIDTH  + (idx - 1) * placeHolderW / 2 + CARD_WIDTH / 2
    // 屏幕中心 
    const c = x._value + W / 2
    
    const r =  1 - ((Math.abs(c_card - c))  / W ) * 0.3
    return r 
  }
  
  
  let r = scaleR()

  console.log(r)
  
  const v = x.interpolate({
    inputRange : [1, 1],
    outputRange : [r, r]
  })
  return (
    <Animated.View style={{width, height : 100, borderColor : "grey", borderWidth : 1 , 
    backgroundColor : "skyblue",
    opacity : v,
    transform : [{ scaleY : v, scaleX : v }]
    }}>
      {children}
      
    </Animated.View>
  )

}