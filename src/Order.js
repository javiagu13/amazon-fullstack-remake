import React from 'react'
import "./Order.css"
import CheckoutProduct from './CheckoutProduct'

function Order({order}) {
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{order.data.created}</p>
      <p className='order__id'><small>{order.id}</small></p>
      {order.data.basket?.map(item => (<CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton/>))}
    </div>
  )
}

export default Order
