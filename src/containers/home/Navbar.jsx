import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/data/AuthContext";
import { useCart } from "../../store/data/CartContext";
import { useWishlist } from "../../store/data/WishlistContext";
import { useFilter } from "../../store/data/FilterContext";
import { FiSearch } from 'react-icons/fi';

import "../../css/search.css";
import { ACTION_TYPE } from "../../store/Actions";
function Navbar() {
  const { filterDispatch } = useFilter();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { cartState } = useCart();
  const { wishlistState } = useWishlist();
  const [search, setSearch] = useState("");

  const clickSearchHandler = (e) => {
    e.preventDefault();
  };

  const searchHandler = (e) => {
    navigate("/products");
    setSearch(e.target.value);
    if (search) {
      filterDispatch({ type: ACTION_TYPE.SEARCH, payload: search });
    }
  };

  return (
    <nav class="navbar-landing">
      <div class="logo-div">
        <Link to="/">
          <h1>BOOKFACTORY</h1>
        </Link>
      </div>
      <div className="search-cont">
        <div class="input-icons">
          <div class="icon-cont">
            <FiSearch />
          </div>
          <form action="" onSubmit={(e) => clickSearchHandler(e)}>
            <input
              type="text"
              class="input input-search"
              value={search}
              onChange={searchHandler}
            />
          </form>
        </div>
      </div>
      <div class="navbar-cont">
        <div>
          <Link to="/products" class="link">
          <i class="fas fa-home fa-icon"></i>
          </Link>
        </div>
        <div>
          <Link to="/wishlist" class="link">
            <div class="badge-container">
              <i class="fas fa-heart fa-icon"></i>
              <div class="badge badge-large badge-right">
                <span>{wishlistState.wishlist.length}</span>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/carts" class="link">
            <div class="badge-container">
              <i class="fas fa-shopping-cart fa-icon"></i>
              <div class="badge badge-large badge-right">
                <span>{cartState.cart.length}</span>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link to={token?"/logout":"/login"} class="link">
            <i class="fas fa-user fa-icon"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
