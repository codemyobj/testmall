import { ADD_CART, ADD_TO_CART, ADD_COUNTER } from './mutaion-types'


export default {
  //mutation中每个方法都必须单一 
  [ADD_CART](context, payload) {
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)

    if (oldproduct) {
      context.commit(ADD_COUNTER, oldproduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }
}