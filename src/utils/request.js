import axios from 'axios'
import utils from "@/utils/utils"
const NET_STATUS_OK = 200
const NET_STATUS_NO_PERMIT = 401
const NET_STATUS_RESOURCE_DENY = 403
const NET_STATUS_NOT_FOUND = 404
const request = axios.create({
    baseURL: 'http://localhost:8080',  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    timeout: 5000
})
request.defaults.headers["Content-Type"] = "application/json"
/// 配置请求拦截器
request.interceptors.request.use(
    req => {
        // 看Cookie中有没有token请求头, 如果有就加上
        let token = utils.getCookieByName("token")
        if (token != null) {
            req.headers["token"] = token
        }
        return req
    },
    error => {
        console.log(error)
    }
)
request.interceptors.response.use(
    response => {
        if (response.status === NET_STATUS_OK) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        console.log(error)
        if (error.status) {
            console.log(error.status.code)
            switch (error.status.code) {
                case NET_STATUS_NO_PERMIT:
                    break;
                case NET_STATUS_RESOURCE_DENY:
                    break;
                case NET_STATUS_NOT_FOUND:
                    break;
            }
        }
        return Promise.reject(error.response)
    }
)

export function get(url, params) {
    return new Promise((resolve, reject) => {
        request.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// post方法必须要使用对提交从参数对象进行序列化的操作，所以通过node的qs模块来序列化参数
export function post(url, params) {
    return new Promise((resolve, reject) => {
        request.post(url, JSON.stringify(params)).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default request

