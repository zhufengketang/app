/**
 *
 * Created by weimeng on 16/4/25.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

function warn(error) {
  console.warn(error.message || error);
  throw error; // To let the caller handle the rejection
}

module.exports = store => next => action => {

  if(typeof action.then === 'function') {
    
    action.then(data => {
      next(data)
    })
    .catch(ex=> {
      console.error(ex)
    })
    // Promise.resolve(action).then(next, warn)
  } else {
    next(action)
  }
  
}
