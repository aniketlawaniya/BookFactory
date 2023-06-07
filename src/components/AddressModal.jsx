import React, { useEffect } from "react";
import { useState } from "react";
import { addAddress, editAddress } from "../services/AddressServices";
import { useAuth } from "../store/data";

function AddressModal({ onClose, editDetails }) {
  const { userData, userDispatch, token,setEditDetails } = useAuth();
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    mobile: "",
  });
  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editDetails.isEdit
      ? editAddress(token, address, userDispatch)
      : addAddress(token, address, userDispatch);
    setAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      mobile: "",
    });
    setEditDetails(prev=>({...prev,isEdit:false,editAddressData:{}}))
    onClose();
  };

  useEffect(() => {
    if (editDetails.isEdit) {
      setAddress(editDetails.editAddressData);
    }
  }, []);
  return (
    <aside className="modal-container">
      <div className="modal">
        <h2>Enter Address Details</h2>
        <form class="form">
          <label htmlFor="" class="input-label">
            <input
              type="text"
              placeholder="Full Name"
              class="input"
              value={address.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="" class="input-label">
            <input
              type="text"
              placeholder="Enter House, Street, Colony"
              class="input"
              value={address.street}
              name="street"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="" class="input-label">
            <input
              type="text"
              placeholder="City"
              class="input"
              value={address.city}
              name="city"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="" class="input-label">
            <input
              type="text"
              placeholder="State"
              class="input"
              value={address.state}
              name="state"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="" class="input-label">
            <input
              type="text"
              placeholder="Country"
              class="input"
              value={address.country}
              name="country"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="" class="input-label">
            <input
              type="text"
              placeholder="Zipcode"
              class="input"
              value={address.zipCode}
              name="zipCode"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="" class="input-label">
            <input
              type="text"
              placeholder="Mobile Number"
              class="input"
              value={address.mobile}
              name="mobile"
              onChange={(e) => handleChange(e)}
            />
          </label>
        </form>
        <div className="btn-container">
          <button
            type="button"
            className="btn cart-btn btn-s order-btn font-bold"
            onClick={() => {
              onClose();
              setEditDetails(prev=>({...prev,isEdit:false,editAddressData:{}}))
            }}
          >
            Discard
          </button>
          <button
            type="submit"
            className="btn cart-btn btn-s order-btn font-bold"
            onClick={(e) => handleSubmit(e)}
          >
            {editDetails.isEdit ? "EDIT" : "ADD"}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AddressModal;
