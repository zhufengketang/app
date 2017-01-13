/**
 * ramroll on 16/8/15.
 */


import React, {Component} from 'react'

import {Keyboard} from "react-native"
import {Form} from "./Form"

import {form_connector} from "./form_connector"


export class FormConnector extends Component{

  constructor(props){
    super()
    this.form = new Form(props.validate, props.submit)
    
    this.state = {
      fields : this.form.createFields(props.fields)
    }
    if(props.data) {
      this.form.setData(props.data)
    }
  }


  componentDidMount(){
    this.form.registerChangeEventHandler(this._changeHandler.bind(this))
    this.form.registerErrorHandler(this._errorHandler.bind(this))
    this.form.registerResetEventHandler(this._resetHandler.bind(this))
    if(this.props.onChange) {
      this.props.onChange(this.form.getData())
    }
    
  }


  componentWillUnmount(){
    this.form.removeChangeEventHandler(this._changeHandler.bind(this))
    this.form.removeResetEventHandler(this._resetHandler.bind(this))
    this.form.removeErrorHandler(this._errorHandler.bind(this))
  }
  
   _resetHandler(fields) {
    this.setState({
      children : this.nextChildren(this.props.children, fields)
    })
  }

  _errorHandler(fields){
    this.setState({
      fields
    })
  }


  _changeHandler(name, value, fields){
    this.setState({
      fields
    }, (() => {

      if(this.props.onChange) {
        this.props.onChange(this.form.getData())
      }

    }).bind(this))
  }
  
  getForm(){
    return this.form
  }
  

  _submit(){
    
    this.form.validate()
    const errors  = this.form.getErrors()
    const data = this.form.getData()
    Keyboard.dismiss()
    
    this.props.submit && this.props.submit(data, errors)
  }

  render() {
    const {children, ...others} = this.props
    const {fields} = this.state
    return React.cloneElement(children, {...others, fields, form : this.form, submit : this._submit.bind(this)})
  }


}

const assert = (prop, predicate, errorMessage) => {
  return data => {
    if(!predicate(data[prop])){
      return errorMessage
    } else {
      return null
    }
  }
}