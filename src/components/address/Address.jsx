import React from "react";
import { deleteAddress } from "../../services/AddressServices";
import { ACTION_TYPE } from "../../store/Actions";
import { useAuth, useOrder} from "../../store/data";
function Address({ data }) {
  const { token, userDispatch, setEditDetails, setOpenModal  } = useAuth();
  const { orderState, orderDispatch } = useOrder();
  const { city, country, mobile, _id, zipCode, state, name, street } = data;
  return (
    <div className="flex-row">
      <div>
        <label htmlFor={_id} className="address-label-radio">
          <input
            id={_id}
            type="radio"
            name="address"
            className="address-input"
            checked={orderState.orderAddress._id === _id}
            onChange={() =>
              orderDispatch({
                type: ACTION_TYPE.ADDRESS_DETAILS,
                payload: data,
              })
            }
          />
          {name}
        </label>
        <div className="address-details-cont text-left">
          <p>
            {street},&nbsp; {city},&nbsp; {state},&nbsp; {zipCode}
          </p>
          <p>{country}</p>
          <p>Phone Number:{mobile}</p>
        </div>
      </div>
      <button
        className="btn btn-icon"
        onClick={() => deleteAddress(token, _id, userDispatch)}
      >
        <i class="far fa-trash-alt fa-delete-color"></i>
      </button>
      <button
        className="btn btn-icon btn-address-icon"
        onClick={() => {
          setEditDetails((prev) => ({
            ...prev,
            isEdit: true,
            editAddressData: { ...data },
          }));
          setOpenModal(true);
        }}
      >
        <i class="far fa-edit fa-edit-color"></i>
      </button>
    </div>
  );
}

export default Address;
