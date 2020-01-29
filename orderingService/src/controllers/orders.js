import OrderModel from '../db/orderModel'
import boom from '@hapi/boom'
import axios from 'axios'

async function makeOrder(req, res, next) {
    // check the user authentication,
    let auth = req.headers.authentication
    if (!auth) {
        next(boom.forbidden('Authentication required!'))
    }

    // sending auth var to user authentication api
    let authResponse

    try {
        authResponse = await axios.create({
            baseURL: 'http://users-service:3002/api/v1',
            headers: {
                authentication: auth
            }
        }).get('/auth/user/cardinalities')
    } catch (err) {
        return res.status(err.response.status)
            .send(err.response.data)
    }
    
    //authResponse.status, authResponse.data
    console.log(authResponse.status)
    if (!authResponse.isAuthenticated) {
        next(boom.forbidden('Authentication required!'))
    }

    return res.send("ok")
    // fetch the product
    // check for offer and fetch it if exist

}

function getUserOrders(req, res, next) {

}

export { makeOrder, getUserOrders }

/*

 {

   response: {
     status: 401,
     statusText: 'Unauthorized',
     config: {
       url: '/auth/user/cardinalities',
       method: 'get',
       headers: [Object],
       baseURL: 'http://users-service:3002/api/v1',
       transformRequest: [Array],
       transformResponse: [Array],
       timeout: 0,
       adapter: [Function: httpAdapter],
       xsrfCookieName: 'XSRF-TOKEN',
       xsrfHeaderName: 'X-XSRF-TOKEN',
       maxContentLength: -1,
       validateStatus: [Function: validateStatus],
       data: undefined
     },
     request: ClientRequest {
       _events: [Object: null prototype],
       _eventsCount: 6,
       _maxListeners: undefined,
       outputData: [],
       outputSize: 0,
       writable: true,
       _last: true,
       chunkedEncoding: false,
       shouldKeepAlive: false,
       useChunkedEncodingByDefault: false,
       sendDate: false,
       _removedConnection: false,
       _removedContLen: false,
       _removedTE: false,
       _contentLength: 0,
       _hasBody: true,
       _trailer: '',
       finished: true,
       _headerSent: true,
       socket: [Socket],
       connection: [Socket],

       _onPendingData: [Function: noopPendingOutput],
       agent: [Agent],
       socketPath: undefined,
       method: 'GET',
       path: '/api/v1/auth/user/cardinalities',
       _ended: true,
       res: [IncomingMessage],
       aborted: false,
       timeoutCb: null,
       upgradeOrConnect: false,
       parser: null,
       maxHeadersCount: null,
       _redirectable: [Writable],
       [Symbol(kNeedDrain)]: false,
       [Symbol(isCorked)]: false,
       [Symbol(kOutHeaders)]: [Object: null prototype]
     },
     data: { isSuccessed: false, data: null, error: 'Not Auth included!' }
   },
   isAxiosError: true,
   toJSON: [Function]
*/