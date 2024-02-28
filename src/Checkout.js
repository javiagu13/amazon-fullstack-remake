import React from 'react';
import "./Checkout.css";
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
function Checkout() {

  const[{basket}, dispatch] = useStateValue();

  return (
    <div className='checkout'>
        
        <div className='checkout__left'>
            Ad
            <div>
                <h2 className='checkout__title'>
                    Your shopping Basket
                </h2>
                {basket.map(item=>(
                <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}/>
                ))}
            </div>
        </div>

        <div className='checkout__right'>
            <Subtotal/>
        </div>
    </div>
  )
}

export default Checkout
