import React, { useEffect, useState } from 'react';
import "./Orders.css";
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';
function Orders() {
  const [{basket, user}, dispatch]=useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user) {
          const paymentRef = collection(db, "users", user?.uid, "orders");
          const paymentSnap = await getDocs(paymentRef);
          setOrders(paymentSnap.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })));
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, [user]);

  return (
    <div className='orders'>
        <h1>Your Orders</h1>
        <div className='orders__order'>
          {orders?.map(order =>(
            <Order order={order}/>
          ))}
        </div>
    </div>
  )
}

export default Orders
