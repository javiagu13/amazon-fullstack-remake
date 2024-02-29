import React, { useState } from 'react';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


function Payment({id, image, title, price, rating}) {

  const [{basket}, {user}, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

    const handleSubmit = e => {
        
    }

    const handleChange = event => {
        //Listen cor changes in CardElement
        //display any errors
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className='payment'>
        <div className='payment__title'>
            <p className='payment__first__title'>Your Orders</p>
            <p className='payment__second__title'>({basket.length} Orders)</p>
        </div>

        <div className='container__vertical'>
            
            <div className='container__horizontal'>
                <p className='content__title'>Delivery Adress</p>
                <div className='vertical__content'>
                    <p className='container__content'>{user ? user.email : "Guest"}</p>
                    <p className='container__content'>This is the address</p>
                </div>
            </div>

            <div className='container__horizontal'>
                <p className='content__title'>Review Items </p>
                    <div className='vertical__content'>
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
            
            <div className='container__horizontal'>
                <p className='content__title'>Payment Method</p>
                <div className='vertical__content'>
                <p className='container__content'>Card Details</p>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__priceContainer'>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        
        {/*<div className='payment__list'>
            <p className='payment__subtitle__first'>Delivery Adress</p>
            <p className='payment__subtitle__second'>September 10th 2020</p>
            {basket.map(item=>(
                <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}/>
                ))}
        </div>*/}
      
    </div>
  )
}

export default Payment
