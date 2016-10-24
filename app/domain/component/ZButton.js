/**
 * 
 * ramroll on 2016/10/25.
 */

import React, {Component} from 'react'


import {
  Dimensions
} from 'react-native'

import {
  Button 
} from 'basic'

import {
  COLOR_PRIMARY 
} from "domain/def"


export class ZButton extends Component {
  
  render(){
    
    return (

      <Button height={42}
              width={Dimensions.get('window').width - 40}
              fontSize={14}
              backgroundColor={COLOR_PRIMARY}
        {...this.props}
      />

    )
  }
}
