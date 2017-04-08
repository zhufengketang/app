/**
 *
 * ramroll on 16/8/15.
 */


// const r1 = assert('user_name', maxLength(100), '用户名不能超过100个字符')
// const e1 = {



export const required = () => {
  return value => !!value
}

export const tel = () => {
  let re = /^0\d{2,3}-?\d{7,8}$/
  return value => {
    if (!value) {
      return true
    }
    if (re.test(value)) {
      return true
    } else {
      return false
    }
  }
}

export const max_length = (length) => {
  return value => {
    return !value || value.length <= length
  }
}

export const min_length = (length) => {
  return value => {
    return !value || value.length >= length
  }
}

export const length = (length) => {
  return value => {
    return !value || value.length === length
  }
}


export const idcard = () => {
  return value => {
    if(!value) {
      return true
    }
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]

    function idCardValidate(idCard) {
      if (idCard.length == 15) {
        return validity15(idCard)
      }

      if (idCard.length == 18) {
        return validity18(idCard)
      }

      return false
    }

    function validity15(idCard) {
      var year = parseInt(idCard.substring(6, 8), 10)
      var month = parseInt(idCard.substring(8, 10), 10)
      var day = parseInt(idCard.substring(10, 12), 10)

      var temp_date = new Date(year, month - 1, day)
      if (
        temp_date.getYear() != year ||
        temp_date.getMonth() != month - 1 ||
        temp_date.getDate() != day
      ) {
        return false
      }
      return true
    }

    function validity18(idCard) {
      function validity(idCard) {
        var year = parseInt(idCard.substring(6, 10), 10)
        var month = parseInt(idCard.substring(10, 12), 10)
        var day = parseInt(idCard.substring(12, 14), 10)
        var temp_date = new Date(year, month - 1, day)
        if (
          temp_date.getFullYear() != year ||
          temp_date.getMonth() != month - 1 ||
          temp_date.getDate() != day
        ) {
          return false
        }
        return true
      }
      var result = validity(idCard)
      if (result) {
        var nums = idCard.split("")
        var sum = 0
        if (nums[17].toLowerCase() == 'x') {
          nums[17] = 10
        }

        for (var i = 0; i < nums.length - 1; i++) {
          sum += Wi[i] * parseInt(nums[i], 10)
        }

        var position = sum % 11
        if (nums[17] == ValideCode[position]) {
          return true
        }
        return false
      }
      return false
    }
    return idCardValidate(value)
  }
}
