import React from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider'

function CheckoutProduct({id, image, title, price, rating}) {

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        //remove from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

  return (
    <div className='checkout__product'>
        <div className='left__container'>
            <img className='checkout__image' src={image} alt=''></img>
        </div>
        <div className='right__container'>
            <p>{title}</p>
            <p className='checkout__price'><strong>{price} $</strong></p>
            <div className='checkout__ratings'>
                {Array(rating).fill().map((_,i)=>(<p>🌟</p>))}
            </div>
            <button onClick={removeFromBasket}>Remove from Basket</button>   
        </div>
    </div>
  )
}

export default CheckoutProduct
