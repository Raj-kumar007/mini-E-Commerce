import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {toast} from 'react-toastify'

const ProductDetails = ({cartItem , setCartItem}) => {
   const [products,setProduct] =useState(null)
   const{id} =useParams();
   const [qty,setQty]=useState(1)
  
   
   
   useEffect(() => {
    
        fetch('http://localhost:8000/api/v1/product/'+id)
        .then(res=> res.json())
        .then(res=>  setProduct(res.products));    
      
    
    
   }, []); 

   function addtocart() {
const itemProduct = cartItem.find((item)=> item.products._id === products._id)

    if (!itemProduct) {
        const newItem = {products, qty}    
        setCartItem((state)=>[...state,newItem]) 
toast.success("card add to success")
    }
       }


       function increase() {
        if (products.stock  == qty) {
            return;
        }
        setQty(qty+1)
       }

       function decrease() {
        if (qty > 1) {
        setQty(qty-1)    
        }

       }

  return (
    <>
   {  products && <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={products.images[0].image} alt="sdf" height="500" width="500"/>
            </div>
            <div className="col-12 col-lg-5 mt-5">
                <h3>{products.name}</h3>
                <p id="product_id">Product # 387874kkfjkf</p>


                <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${products.ratings/5*100}%`}}></div>
                </div>
           

<hr/>
                <p id="product_price">${products.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decrease}>-</span>

                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                    <span className="btn btn-primary plus" onClick={increase}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4"disabled={products.stock==0} onClick={addtocart}>Add to Cart</button>


                <p>Status: <span id="stock_status" className={products.stock > 0 ? 'greenColor':'redcolor'}>{products.stock > 0 ? 'In Stock':'Out Stock'}</span></p>


                <h4 className="mt-2">Description:</h4>
                <p>{products.description}</p>
                <p id="product_seller mb-3">Sold by: <strong>{products.seller}</strong></p>
				
                <div className="rating w-50"></div>
						
            </div>

        </div>

    </div>}
    </>
  )
}

export default ProductDetails
