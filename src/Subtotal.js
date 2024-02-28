import React from 'react'
import "./Subtotal.css";
import { useStateValue } from './StateProvider';
import {getBasketTotal} from './reducer';

function Subtotal() {
  
  const [{basket}, dispatch] = useStateValue();

  return (
    <div className='subtotal'>

        renderText={(value)=> (
            <>
                <p>
                    Subtotal ({basket?.length} items): <strong>{getBasketTotal(basket)} $</strong>
                </p>
                <small className='subtotal__gift'>
                    <input type='checkbox'/>
                        This order contains a gift
                </small>
            </>
        )}

        <button>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
