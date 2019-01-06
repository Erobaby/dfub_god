import Vue from 'vue'

import Axios from 'axios'
import uuid from 'uuid/v1'

/** JS公共方法 */
String.prototype.startWith = function (str) {
  var reg = new RegExp("^" + str);
  return reg.test(this);
}

String.prototype.endWith = function (str) {
  var reg = new RegExp(str + "$");
  return reg.test(this);
}
/** 公共方法 */
let localGet = function (name) {
  return localStorage.getItem(name)
}

let localSet = function (name, value) {
  localStorage.setItem(name, value)
}

let getDeviceId = function () {
  let deviceId = localGet('deviceId')
  if (deviceId) {
    return deviceId
  }
  deviceId = uuid()
  localSet('deviceId', deviceId)
}

let commonSuccessDict = {
  '0': (vue, data, message) => {
    vue.$message.error(message)
  },
  '-1': (vue) => {
    vue.$store.commit("clearSessionUser");
    vue.$router.push({
      path: "/user_login"
    });
  },
  '-2': (vue) => {
    vue.$store.commit("clearSessionUser");
    vue.$router.push({
      path: "/user_login"
    });
  },
  'default': (vue, data, message) => {
    vue.$message.error(message)
  }
}
let commonErrorDict = {
  '404': (vue) => {
    vue.$message.error("该功能尚未实现")
  },
  'default': (vue, res, status) => {
    vue.$message.error("错误码" + status)
  }
}
let ajaxRequest = function (method, url, data, successDict, errorDict) {
  let baseUrl = 'http://127.0.0.1:8001'
  let reqUrl = url
  if (!reqUrl.startWith('http:') && !reqUrl.startWith('https:')) {
    reqUrl = baseUrl
    if (baseUrl.endWith('/')) {
      reqUrl = baseUrl.slice(0, baseUrl.length - 1)
    }
    if (url.startWith('/')) {
      reqUrl += url
    } else {
      reqUrl += '/' + url
    }
  }
  let headers = {
    'X-Device-Id': getDeviceId()
  }
  Axios({
      method: method,
      url: reqUrl,
      data: data,
      headers: headers,
    })
    .then((res) => {
      let code = res.data.code.toString()
      let data = res.data.data
      let message = res.data.message
      let codeHandler;
      if (successDict) {
        codeHandler = successDict[code]
      }
      if (codeHandler) {
        codeHandler(data, message, code)
      } else {
        codeHandler = commonSuccessDict[code]
        if (!codeHandler) {
          codeHandler = commonSuccessDict['default']
        }
        if (codeHandler) {
          codeHandler(this, data, message, code)
        }
      }
    })
    .catch((err) => {
      if (!err.response) {
        return;
      }
      let respStatusCode = err.response.status
      let errorHandler;
      if (errorDict) {
        errorHandler = errorDict[respStatusCode]
      }
      if (errorHandler) {
        errorHandler(err.response, respStatusCode)
      } else {
        errorHandler = commonErrorDict[respStatusCode]
        if (!errorHandler) {
          errorHandler = commonErrorDict['default']
        }
        if (errorHandler) {
          errorHandler(this, err.response, respStatusCode)
        }
      }

    })
}

let ajaxPost = function (url, data, successDict, errorDict) {
  Vue.prototype.ajaxRequest('post', url, data, successDict, errorDict)
}

Vue.prototype.ajax = Axios
Vue.prototype.trim = str => str.replace(/^\s*|\s*$/g, '')
Vue.prototype.localGet = localGet
Vue.prototype.localSet = localSet
Vue.prototype.getDeviceId = getDeviceId
Vue.prototype.ajaxRequest = ajaxRequest
Vue.prototype.ajaxPost = ajaxPost


// const common = {
//   localGet: localGet,
//   localSet: localSet,
//   getDeviceId: getDeviceId,
//   // getSessionUser: getSessionUser
// }
// export default common