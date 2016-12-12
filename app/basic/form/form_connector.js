/**
 * ramroll on 16/8/15.
 */


import React, {Component} from 'react'

import {Form} from "./Form"

import {FormConnector} from "./FormConnector"

//// fn form_connector.js
export const form_connector = (_Component, fieldsMeta, validate) => {

  class FormProxy extends Component {

    render(){
      return <FormContainer fields={fieldsMeta} validate={validate} {...this.props}>
        <_Component />
      </FormContainer>
    }
  }
  
  return FormProxy

}



