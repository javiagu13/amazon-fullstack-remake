import React, { useEffect, useState } from 'react';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';
import axios from './axios';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

function Payment({id, image, title, price, rating}) {

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [{basket, user}, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const navigate = useNavigate();



  useEffect(() =>{
    const getClientSecret = async () =>{
        const response = await axios({
            method: 'post',
            // stripe expects in subunits: 10$=10000. that is the reason of * 100 operation
            url:  `payments/create?total=${(parseInt(getBasketTotal(basket)*100))}`,
        });
        setClientSecret(response.data.clientSecret);
    }
    
    getClientSecret();
  }, [basket])

  console.log("THE SECRET IS >>>", clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            console.log(basket)
            //console.log(paymentIntent.amount)
            //console.log(paymentIntent.created)
            /*console.log(user)
            await setDoc(doc(db, "users", user?.uid), {
                basket: basket,
                //amount: paymentIntent.amount,
                //created: paymentIntent.created
            });*/

            const paymentRef = doc(db, "users", user?.uid, "orders", paymentIntent.id);
            setDoc(paymentRef, {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            //look if u can change by replace to avoid comming back
            dispatch({
                type: "EMPTY_BASKET"
            })
            navigate("/")
        })
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
                                <strong>Order amount: ${getBasketTotal(basket).toFixed(2)}</strong>
                                <button disabled={processing || disabled || succeeded}>
                                    <span>
                                    {processing ? <p>Processing</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
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
