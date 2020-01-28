import OrderModel from '../db/orderModel'
import boom from '@hapi/boom'
import axios from 'axios'

async function makeOrder(req, res, next){
    // check the user authentication,
    let auth = req.headers.authentication
    if(!auth){
        next(boom.forbidden('Authentication required!'))
    }

    // sending auth var to user authentication api

    let userId = await axios.get()

    // fetch the product
    // check for offer and fetch it if exist

}

function getUserOrders(req, res, next){

}

export { makeOrder, getUserOrders }
