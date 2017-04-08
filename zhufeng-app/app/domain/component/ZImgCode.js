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


import {TextInput, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'

import {flexCenter} from 'basic'
import {COLOR_TEXT_LIGHT, COLOR_LIGHT_BLUE, COLOR_PRIMARY} from "domain/def"

import {url_mapper} from "domain/api/http"
import {get_local_token} from "domain/store/storage"
import {get_image} from "domain/api/apis"

export class ZImgCode extends Component{

  constructor(){
    super()
    
    this.state = {
      img : null
    }
    
  }
  
  
  async _load(){
  
    const img = await get_image()
    this.setState({
      img : {uri : img}
    })
  
  }
  
  componentDidMount(){
    
    this._load()
  }

  _change(value){
    this.props.onChange(value)
  }
  
  _changeImage(){
    this._load()
  }

  render(){
    const {error, ...others} = this.props
    const {img} = this.state


    return  <View style={styles.container}>

      <TextInput style={styles.input}   onChangeText={this._change.bind(this)} {...others} placeholder="图片验证码"
                 underlineColorAndroid={"rgba(0,0,0,0)"}

      />

      <TouchableOpacity onPress={this._changeImage.bind(this)}>
        {img &&
        <View style={{...styles.btn, ...styles.btnDisabled}}>
          <Image style={{width : 100, height :42}} source={img} resizeMode="contain"/>
        </View>

        }
      </TouchableOpacity>
    </View>
  }
}

const styles = {
  container : {

    marginTop : 20,
    marginRight : 20,
    flexDirection : "row"  ,
    marginLeft : 20,
    alignItems : "center"

  },
  input : {
    borderWidth : 1,
    borderRadius : 5,
    borderColor : "#eee",
    paddingLeft : 20,
    paddingRight : 20,
    height : 42,
    color : COLOR_TEXT_LIGHT,
    flex : 1,

  } ,
  btn : {
    height : 42,
    paddingLeft : 20,
    paddingRight : 20,
    marginLeft : 10,
    ...flexCenter


  },
  btnDisabled : {
    borderColor : "#eee"
  },
  btnText: {
    color : COLOR_PRIMARY
  }

}