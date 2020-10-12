import Axios from 'axios'
import { Tooltip } from 'bootstrap'

export default {
    install (Vue, options) {
        const axios = Axios.create({
            baseURL: 'http://localhost:5050'
        })

        const request = async (method, url, data, headers) => {
            try{
                const response = await axios.request({ method, url, data, headers})
                if (response.status === 200) return response.data
                if (response.status === 300) return response.data

            } catch(err) {
                const response = err.response
                if (response.status === 401) {
                    Tooltip({
                        message: response.data.message || 'Authentication Error',
                        type: 'error',
                        duration: 3500,
                        showClose: true
                    });
                    return options.store.dispatch('logout')
                }
                if (response.status === 403) {
                    Tooltip({
                        message: response.data.message || 'Authentication Error',
                        type: 'error',
                        duration: 3500,
                        showClose: true
                    })
                    return options.store.dispatch('logout')
                }
                if (response.status === 400) {
                    Tooltip({
                        message: response.data.message || 'An unknown error occured',
                        type: 'error',
                        duration: 3500,
                        showClose: true
                    })
                }
                if (response.status === 500) {
                    Tooltip({
                        message: response.data.message || 'An unknown error occured',
                        type: 'error',
                        duration: 3500,
                        showClose: true
                    })
                }
            }
        }
        Vue.prototype.apiPost = async (url, data, headers) => {
            const response = await request('post', url, data, headers)
            return response
        };
        Vue.prototype.apiGet = async (url, data, headers) => {
            const response = await request('get', url, null, data, headers)
            return response
        };
        Vue.prototype.apiPut = async (url, data, headers) => {
            const response = await request('put', url, data, headers)
            return response
        };
        Vue.prototype.apiDelete = async (url, data, headers) => {
            const response = await request('delete', url, data, headers)
            return response
        }
    }

}