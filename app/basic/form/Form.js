/**
 * ramroll on 16/8/15.
 */

import R from 'ramda'

export class Form {

  static _all = []




  static unFocusAll() {
    for(let i = 0; i < Form._all.length; i++) {
      Form._all[i].unFocusAll()
    }
  }

  constructor(validate, submitHandler){
    this._change = this._change.bind(this)
    this.fields = {}
    this.changeHandlers = []
    this.errorHandlers = []
    this.resetHandlers = []
    this.validateHandler = validate
    this.refs = {}
    this.lastEdit = null
    this.c = 0
    this.firstRef = null
    this.submitHandler = submitHandler
    Form._all.push(this)

    setTimeout( () => {

      if(this.firstRef) {
        this.firstRef.focus()
      }
    }, 50)
  }


  clearError(){
    for(let key in this.fields) {
      this.fields[key].error = ''
    }
  }
  
  empty(){
    for(let key in this.fields) {
      delete this.fields[key].error
      delete this.fields[key].value 
      this.fields[key].dirty = false
    }

    this.resetHandlers.map (handler => {
      handler(this.fields)
    })

  }


  validate(){
    this.asserts = []

    this.clearError()
    this.validateHandler(this.assert(this.getData()).bind(this), this.getData())

    let pass =true
    for(let i = 0; i < this.asserts.length; i++ ) {
      const error = this.asserts[i]()
      if(error) {
        pass = false
        const {name, errorMessage} = error
        this.fields[name].error = errorMessage
      }
    }
    if(!pass) {
      this.errorHandlers.map (handler => {
        handler(this.fields)
      })
    }

    return pass
  }


  allFilled(){

    for(let key in this.fields) {
      if(!this.fields[key].value) {
        return false
      }
    }
    return true
  }


  getErrors(){
    const errors = []
    for(let key in this.fields) {
      if(this.fields[key].error) {
        errors.push(this.fields[key].error)
      }
    }
    return errors
  }

  fillAny(){
    for(let key in this.fields) {
      if(this.fields[key].value) {
        return true
      }
    }
    return false
  }

  hasError(){
    const errors = this.getErrors()
    return errors.length > 0
  }

  assert(data){
    return (prop, predicate, errorMessage) => {
      this.asserts.push(
        () => {
          if(!predicate(data[prop])){
            return {name : prop, errorMessage}
          } else {
            return null
          }
        })
    }
  }


  createFields(fieldsMeta) {
    fieldsMeta.map( (name => {
      this.addField(name)
    }).bind(this))

    return this.fields
  }

  setData(obj){
    for(let key in obj) {
      this.fields[key].value = obj[key]
      this.fields[key].dirty = true

    }

    this.validate()

  }

  getData(){
    const obj = {}
    for(let key in this.fields) {
      obj[key] = this.fields[key].value
    }
    return obj
  }

  registerResetEventHandler(handler){
    this.resetHandlers.push(handler)
  }

  removeResetEventHandler(handler) {
    this.resetHandlers = R.filter( h => h !== handler , this.changeHandlers)
  }


  registerChangeEventHandler(handler){
    this.changeHandlers.push(handler)
  }

  removeChangeEventHandler(handler) {
    this.changeHandlers = R.filter( h => h !== handler , this.changeHandlers)
  }

  registerErrorHandler(handler){
    this.errorHandlers.push(handler)
  }


  removeErrorHandler(handler) {
    this.errorHandlers = R.filter( h => h !== handler , this.errorHandlers)
  }
  regRefer(name, ref) {
    this.refs[name] = ref
    this.fields[name].idx = ++this.c
    if(this.c === 1) {
      this.firstRef = ref
    }
  }


  unFocusAll(){
    const focused = findFocusedItem(this.fields)
    if(focused)
      this.refs[focused.name].blur()
  }



  addField(name) {

    const obj = {
      name,
      value : undefined,
      form : this,
      focus : false,
      editing : false,
      error : ''
    }


    obj.onChange = this._change(name).bind(this)
    obj.onFocus = this._focus(name).bind(this)
    obj.onBlur = this._blur(name).bind(this)
    obj.onEnter = this._enter(name).bind(this)

    this.fields[name] = obj
  }


  _focus(name){
    return () => {
      const focused = findFocusedItem(this.fields)
      this.lastEdit = name

      if(focused) {
        if(focused.name === name) {
          return
        } else {
          if(this.refs[focused.name].blur) {
            this.refs[focused.name].blur()
          }
        }
      }

      this.fields[name].focus = true



    }
  }

  _enter(name){
    return () => {
      const next = findNext(this.fields, this.fields[name].idx)
      if(next) {
        if(this.refs[next.name].focus){
          this.refs[next.name].focus()
        } else {
          if(this.refs[name].blur) {
            this.refs[name].blur()
          }
        }
      } else {
        if(this.submitHandler) {
          this.submitHandler(this)
        }
      }
    }


  }


  _blur(name) {
    return () => {
      this.fields[name].focus = false

      this.fields[name].editing = false
      this.lastEdit = null

      this.validate()

      setTimeout( (() => {

        const focused = findFocusedItem(this.fields)
        if(focused) {
          return
        } else {
          if(this.scroller)
            this.scroller.checkScrollLocation(true)
        }
      }).bind(this), 10)
    }
  }

  _change(name) {
    return (value => {
      if(name === this.lastEdit) {
        this.fields[name].editing = true
      }
      this.fields[name].dirty = true
      this.fields[name].value = value
      this.validate()
      this.changeHandlers.map( item => {
        item(name, value, this.fields)
      })

      this.lastEdit = name
    }).bind(this)
  }

}

const findFocusedItem = (fields) => {
  for(let key in fields) {
    if(fields[key].focus){
      return fields[key]
    }
  }
  return null
}

const findNext = (fields, idx) => {
  for(let key in fields) {
    if(fields[key].idx === (idx + 1)) {
      return fields[key]
    }
  }
  return null
}

const findFieldByName = (name, fields) => {
  for(let i = 0; i < fields.length ; i++) {
    if(fields[i].name === name) {
      return fields[i]
    }
  }
  return null
}
