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
import {View, Dimensions,TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet, Text} from 'react-native'
import {format_currency, flexCenter} from "basic"
import {COLOR_TITLE, COLOR_TEXT_LIGHT, COLOR_PRICE} from "domain/def"
export class CourseCardBig extends Component{

  render() {
    const W = Dimensions.get("window").width
    const {image, title, author, description, price} = this.props
    return <TouchableWithoutFeedback elevation={true}  onPress={this.props.onPress}>

      <View  style={courseStyle.cardContainer}>
        <Image
          source={{uri : image}}
          style={{width : W - 22, height : (W - 20) * 0.3}}
        />
        <Title>{title}</Title>
        <Author label="讲师">{author}</Author>
        <Description>{description}</Description>
        <Price>{price}</Price>
      </View>
    </TouchableWithoutFeedback>
  }

}

const Title = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_TITLE, fontSize : 18, fontWeight : 'bold'}}>{children}</Text>

}

const ScrollIndicator = ({children, image}) => {
  return <View style={{flexDirection : 'row', ...flexCenter}}>
    <Text>{children}</Text>
    <Image source={image} style={{width : 18, height : 18}} />
  </View>
}


const Author = ({label, children}) => {
  return <Text style={{...Paragraph, color : COLOR_TEXT_LIGHT}}>{label}:{children}</Text>
}


const Description = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_TEXT_LIGHT}}>{children}</Text>
}

// 1000 => 1,000.00
// 1000.000 => 1,000.00



const Price = ({children}) => {
  return <Text style={{...Paragraph, color : COLOR_PRICE,fontSize : 18, fontWeight : 'bold'}}>￥{format_currency(children)}</Text>
}

const Paragraph = {
  paddingLeft : 20,
  paddingRight : 20,
  marginTop : 10

}


const courseStyle = StyleSheet.create({
    cardContainer: {
      shadowColor : "grey",
      shadowOpacity : 0.5,
      shadowRadius : 3,
      shadowOffset : {width : 0, height : 5},
      backgroundColor: "white",
      marginBottom: 0,
      paddingBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      marginTop : 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#c7c8c9",
    }
  }
)
