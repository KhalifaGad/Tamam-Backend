import OrderModel from '../db/models/order'
import boom from '@hapi/boom'
import axios from 'axios'

async function makeOrder(req, res, next) {
    // check the user authentication,
    let auth = req.headers.authentication
    if (!auth) {
        next(boom.forbidden('Authentication required!'))
    }

    // sending auth var to user authentication api

    let authResponse = await axios.create({
        baseURL: 'http://users-service:3002/api/v1',
        headers: {
            authentication: auth
        }
    }).get('/auth/user/cardinalities').catch(err => {
        next(boom.internal(err))
    })

    console.log(authResponse)

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
