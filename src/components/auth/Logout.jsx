import React, { useEffect } from "react";
import { useAuth } from "../../store/data/AuthContext";
import { useNavigate } from "react-router-dom";
import Address from "../address/Address";
import { useState } from "react";
function Logout() {
  const { setToken, userData, setUser, setOpenModal,user } = useAuth();
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    localStorage.removeItem("signup");
    setToken("");
    setUser({});
    navigate("/");
  };
  

  return (
    <div className="profile">
      <div className="form-container profile-container">
        <div className="user-container">
          <div className="profile-logo-div">
            <i class="far fa-user fa-icon"></i>
          </div>
          <div className="user-details">
            <h2 className="text-underline">User Details</h2>
            <p>
              <span className="font-bold">Name:</span>
              {user?.firstName}&nbsp;{user?.lastName}
            </p>
            <p>
              <span className="font-bold">Email:</span>
              {user?.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          href=""
          onClick={() => logOutHandler()}
          class="btn cart-btn btn-s order-btn font-bold"
        >
          Log-out
        </button>
      </div>
      <div className="form-container profile-container">
        <div className="user-container">
          <div className="user-details">
            <h1 className="text-underline">Address:</h1>
            {userData.address.length ? (
              userData.address.map((addressData) => {
                return (
                  <>
                    <Address data={addressData} />
                    <div className="divider-line"></div>
                  </>
                );
              })
            ) : (
              <h3>Please add the address</h3>
            )}
            <button
              class="btn cart-btn btn-s order-btn font-bold"
              onClick={() => setOpenModal(true)}
            >
              ADD NEW ADDRESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
