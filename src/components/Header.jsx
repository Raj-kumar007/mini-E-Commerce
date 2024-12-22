import React, { useState } from 'react'
import logo from '../components/Assets/logo.png';
import { Link, useNavigate } from 'react-router';

const Header = ({ cartItem }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const Navigate = useNavigate();

    const SearchHandler = () => {
        Navigate('/search?keyword=' + searchTerm);
    }



    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to={'/'}>
                            <img width="150px" src={logo} alt='' />
                        </Link>

                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <div className="input-group">
                        <input
                            type="text"
                            id="search_field"
                            className="form-control"
                            onBlur={SearchHandler}
                            placeholder="Enter Product Name ..."
                            onChange={(e) => setSearchTerm(e.target.value)}


                        />
                        <div className="input-group-append">
                            <button onClick={SearchHandler} id="search_btn" className="btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to={"/cart"}>
                        <span id="cart" className="ml-3">Cart</span>

                        <span className="ml-1" id="cart_count">{cartItem.length}</span>
                    </Link>


                </div>
            </nav>
        </>
    )
}

export default Header
