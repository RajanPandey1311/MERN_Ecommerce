import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
    const {getTotalCartAmount,all_product,cartItems, removeFromCart}=useContext(ShopContext);
    const navigate = useNavigate();
    const handleRemove = (productId) => {
      removeFromCart(productId);
      toast.success('Item removed successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };
    
    const handlePayment = async () => {
      const amount = getTotalCartAmount();
  
      try {
        const { data: order } = await axios.post(`${serverUrl}/create-order`, { amount });
  
        // Razorpay options
        const options = {
          key: process.env.RAZOR_PAY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Rajan Ecommerce',
          description: 'Test Transaction',
          image: '/your_logo.png',
          order_id: order.id,
          handler: function (response) {
            toast.success('Payment successful!');
            console.log(response);
            setTimeout(() => {
              navigate("/");
          }, 5000);
          },
          prefill: {
            name: 'Rajan Pandey',
            email: 'rajan@example.com',
            contact: '6392182390'
          },
          theme: {
            color: '#3399cc'
          }
        };
  
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error('Error during payment:', error);
        toast.error('Payment failed!');
      }
    };
  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>

      {all_product.map((e)=>{
           if(cartItems[e.id]>0)
           {

            return <div key={e.id}>
    <div className='cartitems-format cartitems-format-main'>
        <img src={e.image} alt='' className='carticon-product-icon'/>
        <p>{e.name}</p>
        <p>${e.new_price}</p>
        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
        <p>${e.new_price*cartItems[e.id]}</p>
        <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{handleRemove(e.id)}} alt=''/>
    </div>
    <hr/>
  </div>
           }

           return null;
      })}
      <div className='cartitems-down'>
        <div className='cartitems-total'>
            <h1>cart Totals</h1>
            <div>
                <div className='cartitems-total-item'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className='cartitems-total-item'>
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr/>
                <div className='cartitems-total-item'>
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cartitems-promocode'>
            <p>If you have a promocode, Enter it here </p>
            <div className='cartitems-promobox'>
                <input type='text' placeholder='Promo Code'/>
                <button>Submit</button>
            </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default CartItems
