import React, { Fragment, useState } from 'react'
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const Cart = ({ cartItem, setCartItem }) => {

    const[complete,setComplete] = useState()

    function increase(item) {
        if (item.products.stock == item.qty) {
            return;
        }
        const updateQty = cartItem.map((i) => {
            if (i.products._id == item.products._id) {
                i.qty++
            }
            return i;
        })
        setCartItem(updateQty)

    }

    function decrease(item) {
        if (item.qty > 1) {
            const updateQty = cartItem.map((i) => {
                if (i.products._id == item.products._id) {
                    i.qty--
                }
                return i;
            })
            setCartItem(updateQty)
        }
    }

    function removeItem(item) {
        const updateQty = cartItem.filter((i) => i.products._id !== item.products._id)
        setCartItem(updateQty);
    }

  async  function checkOut() {

        await fetch("http://localhost:8000/api/v1/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItem),
        })
        
        .then(() => {
            setCartItem([])
            setComplete(true)
            toast.success("Order has been Successful")
        }
        )
        .catch((error) => {
            console.error("Error during checkout:", error.message); 
            toast.error(`Error: ${error.message}`); 
          });
          
    }


    return (
        <>

            {cartItem.length > 0 ? <Fragment>
                <div className="container container-fluid">
                    <h2 className="mt-5">Your Cart: <b>{cartItem.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItem.map((item) =>
                            (<Fragment>

                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.products.images[0].image} alt={item.products.name} height="90" width="115" />
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <Link to={"/product/" + item.products._id}>{item.products.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">${item.products.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={() => decrease(item)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

                                                <span className="btn btn-primary plus" onClick={() => increase(item)}>+</span>
                                            </div>
                                        </div>

                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeItem(item)} ></i>
                                        </div>

                                    </div>
                                </div>

                            </Fragment>
                            )
                            )}


                        </div>
                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItem.reduce((acc, item) => (acc + item.qty), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartItem.reduce((acc, item) => (acc + item.products.price * item.qty), 0)}</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkOut}>Place Order</button>
                            </div>
                        </div>
                    </div>


                </div>
            </Fragment> : (!complete ?<h2 className="empty">Your Order is Empty</h2>:
            <h2 className="empty">your Order Successfull !</h2>
    )
            }


        </>
    )
}

export default Cart
