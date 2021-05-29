import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = (props) => {
    // console.log(props)
    const {seller, name , img , price , stock, key} = props.product;
    return (
        <div className= 'product'>

            <div className="product-img">
                <img src={img} alt=""/>
            </div>

            <div className="product-details">
                <h3 className='product-name'><Link to={"/product/" + key}>{name}</Link></h3>
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <p>only{stock} left in stock - order soon</p>
                {props.showAddToCart && <button 
                className='main-button' onClick={() =>props.handleAddProduct(props.product)}
                >Add To Cart
                </button>}

            </div>
            
        </div>
    );
};

export default Product;