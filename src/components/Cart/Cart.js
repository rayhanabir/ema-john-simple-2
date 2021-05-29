import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    let total = 0;
    for(let i= 0; i<cart.length; i++){
        let product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if(total>35){
        shipping = 4.99;
    }
    else if(total>0){
        shipping = 12.99
    }
    const tax = total / 10;
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const formatNumber = (num) =>{
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h3>Order Summery</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>product Price: {total}</p>
            <p>shipping cost:{shipping}</p>
            <p>Tax + Vat : {formatNumber(tax)}</p>
            <p>Total Price : {grandTotal}</p>
            <Link to='/review'>
            <button className='main-button'>Order Review</button>
            </Link>
        </div>
    );
};

export default Cart;