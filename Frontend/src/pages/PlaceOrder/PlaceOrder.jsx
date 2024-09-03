import React, { useContext, useEffect, useState,} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItem,url} =useContext(StoreContext)

  const [data,setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",

  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value= event.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const placeOrder= async (event)=>{
    event.preventDefault();
    let orderItem =[];
    food_list.map((item)=>{
      if(cartItem[item._id]>0)
      {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItem.push(itemInfo);
      }
    })
    let orderData = { 
      address:data,
      items:orderItem,
      amount:getTotalCartAmount()+2,

    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

const navigate = useNavigate();

  useEffect(()=>{
if (!token) {
  navigate('/cart')
}
else if (getTotalCartAmount()===0) {
  navigate('/cart')
}
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required/>
          <input name='lastName'onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required/>
        </div>
        <div className="multi-fields">
        <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email adress' required/>
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required/>
        </div>
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required/>
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required/>
        </div>
        <div className="multi-fields">
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required/>
        </div>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className='cart-total-details'>
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p> Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
            
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder