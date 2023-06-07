import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../store/data/OrderContext";

function OrderSummary() {
  const { orderState } = useOrder();
  const navigate = useNavigate();
  const { orderedProducts, amount, paymentId, delivery } =
    orderState.orderDetails;

  return (
    <>
      <div className="summary-container">
        <div className="summary-details">
          <h1 className="left-align">Order Placed</h1>
          <h3 className="left-align">Payment Id:&nbsp;{paymentId}</h3>
          <h2 className="left-align">Total:&nbsp;{amount}</h2>
          <div className="left-align">
            <h2>Address:</h2>
            <div className="checkout-address-details">
              <p className="font-bold">{delivery.name}</p>
              <div className="address-details-cont text-left">
                <p>
                  {delivery.street},&nbsp; {delivery.city},&nbsp;{" "}
                  {delivery.state},&nbsp; {delivery.zipCode}
                </p>
                <p>{delivery.country}</p>
                <p>Phone Number:{delivery.mobile}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-products">
          {orderedProducts.map((orderedProduct) => {
            const { id, img, price, qty, title } = orderedProduct;
            return (
              <div class="cart-item card order-item" key={id}>
                <div class="card-cont"></div>
                <div class="card-img-body cart-img-body">
                  <div
                    class="card-img-cont cart-img-cont"
                    onClick={() => navigate(`/product/${id}`)}
                  >
                    <img src={img} alt="" class="card-img-bd img-responsive" />
                  </div>
                  <div class="card-body cart-body">
                    <header class="card-header">
                      <h3>
                        {title.length >= 15
                          ? `${title.substring(0, 13)}...`
                          : title}
                      </h3>
                      <h4>Price:&nbsp; &#8377; {price}</h4>
                      <h4>Quantity:&nbsp; {qty}</h4>
                    </header>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            class="btn cart-btn btn-s"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
