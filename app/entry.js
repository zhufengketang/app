/**
 * ramroll on 2016/10/16.
 */


import React, {Component} from 'react'
// import React from 'react'
// const Component = React.Component

import {
  View,
  Text
} from 'react-native'

// import ReactNative from 'react-native'    =          var ReactNative = require("react-native")
// const View = ReactNative.View
// const Text = ReactNative.Text


const flexCenter = {alignItems : 'center', justifyContent : 'center'}
export class Entry extends Component {
  
  render() {
    return (
      <View style={ {flexDirection : 'column', ...flexCenter, flex : 1} }>
        <Text>
          Hi !
        </Text>
        <Text>
          Welcome to React Native
        </Text>

      </View>
    )
  }
}

