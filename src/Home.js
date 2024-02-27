import React from 'react';
import "./Home.css";
import Product from './Product';
function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home__image' src='https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg' alt=''/>
            
            <div className='home__row'>
                <Product 
                id="111222333"
                title='The Lean Startup' 
                price={29.99} 
                image="https://tse1.mm.bing.net/th?id=OIP.negu8toIAIp0qjr77J88-QHaLM&pid=Api&P=0&h=220"
                rating={5}/>
                <Product 
                id="2233445"
                title="Desktop Computer"
                price={699.95}
                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2023/EBF23/Fuji_Desktop_Single_image_EBF_1x_v1._SY304_CB573698005_.jpg"
                rating={4}/>
                {/* Product */}
            </div>

            <div className='home__row'>
            <Product 
                id="76545678"
                title="Smart Watch"
                price={99.99}
                image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Dash_SmartWatch_1X._SY304_CB639922137_.jpg"
                rating={5}/>
            <Product 
                id="12345678"
                title="Post-it Pack"
                price={11.37}
                image="https://m.media-amazon.com/images/I/31MioabViaL._AC_SY200_.jpg"
                rating={3}/>
            <Product 
                id="444555666"
                title="Think Again - Adam Grant"
                price={18.95}
                image="https://m.media-amazon.com/images/I/418Iw+L5UJL._AC_SY200_.jpg"
                rating={5}/>
                
                {/* Product */}
                {/* Product */}
                {/* Product */}
            </div>

            <div className='home__row'>
            <Product 
                id="13133131"
                title="Plugger"
                price={18.85}
                image="https://m.media-amazon.com/images/I/41uP4HWnPzL._AC_SY200_.jpg"
                rating={1}/>
                {/* Product */}
            </div>
        </div>
      
    </div>
  )
}

export default Home
