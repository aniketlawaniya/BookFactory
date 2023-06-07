import axios from "axios";
import { ACTION_TYPE } from "../store/Actions";

const addAddress = async (token, address, userDispatch) => {
  try {
    const res = await axios.post(
      "api/user/address",
      {
        address,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    userDispatch({ type: ACTION_TYPE.ADD_ADDRESS, payload: res.data.address });
  } catch (error) {
    console.error("error in address post", error.message);
  }
};

const getAddress = async (token, userDispatch) => {
  try {
    const res = await axios.get("api/user/address", {
      headers: {
        authorization: token,
      },
    });
    console.log(res.data.address);
  } catch (error) {
    console.error("error in address get", error);
  }
};
const deleteAddress = async (token, _id, userDispatch) => {
  try {
    const res = await axios.delete(`api/user/address/${_id}`, {
      headers: {
        authorization: token,
      },
    });
    console.log(res.data.address);
    userDispatch({
      type: ACTION_TYPE.DELETE_ADDRESS,
      payload: res.data.address,
    });
  } catch (error) {
    console.error("error in address delete", error);
  }
};
const editAddress = async (token, address, userDispatch) => {
  try {
    const res = await axios.post(
      `api/user/address/${address._id}`,
      {
        address,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    userDispatch({ type: ACTION_TYPE.EDIT_ADDRESS, payload: res.data.address });
  } catch (error) {
    console.error("error in address post", error);
  }
};

export { addAddress, getAddress, deleteAddress, editAddress };
