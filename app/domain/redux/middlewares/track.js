/**
 *
 * Created by weimeng on 16/4/25.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


const log = ({type, ...other}) => {
  //console.log('%c ' + type, 'color:blue', other)
}
module.exports = store => next => action => {
  log(action)
  return next(action)
  
}