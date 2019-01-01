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

let getSessionUser = function () {
  let sessionUser = localStorage.getItem('sessionUser')
  if (sessionUser) {
    sessionUser = JSON.parse(sessionUser)
  } else {
    sessionUser = {
      'userId': 0,
      'logonStatus': false,
      'account': '',
      'username': '游客'
    }
  }
  return sessionUser
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
      if (!codeHandler) {
        codeHandler = this.commonSuccessDict[code]
      }
      if (!codeHandler) {
        codeHandler = this.commonSuccessDict['default']
      }
      if (codeHandler) {
        codeHandler(data, message, code)
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
      if (!errorHandler) {
        errorHandler = this.commonErrorDict[respStatusCode]
      }
      if (!errorHandler) {
        errorHandler = this.commonErrorDict['default']
      }
      if (errorHandler) {
        errorHandler(err.response, respStatusCode)
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
Vue.prototype.commonSuccessDict = {
  '0': function (data, message) {
    alert(message)
    this.$message.error(message)
  },
  '-1': function () {
    this.$store.commit("clearSessionUser");
    this.$router.push({
      path: "/user_login"
    });
  },
  '-2': function () {
    this.$store.commit("clearSessionUser");
    this.$router.push({
      path: "/user_login"
    });
  },
  'default': function (data, message) {
    this.$message.error(message)
  }
}
Vue.prototype.commonErrorDict = {
  '404': function () {
    this.$message.error("该功能尚未实现")
  },
  'default': function (res, status) {
    this.$message.error("错误码" + status)
  }
}

const common = {
  localGet: localGet,
  localSet: localSet,
  getDeviceId: getDeviceId,
  getSessionUser: getSessionUser
}
export default common