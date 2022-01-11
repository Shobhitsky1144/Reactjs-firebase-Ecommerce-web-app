import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import StripeCheckout from "react-stripe-checkout";
import OurCart from "./OurCart";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, settotalAmount] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const subTotal = cartItems.reduce(
    (x, item) => x + item.price * item.quantity,
    0
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const tokenHandler = (token) => {};
  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      enail: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      toast.success("order placed successfully");
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("order failed");
    }
  };
  return (
    <Layout loading={loading}>
      <div>
        <table className="table ">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return (
                <>
                  <OurCart item={item} />
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Total Amount = {subTotal} RS/-</h1>
      </div>
      {subTotal === 0 ? (
        ""
      ) : (
        <div className="d-flex justify-content-end mt-3">
          <button onClick={handleShow}>PLACE ORDER</button>

          <StripeCheckout
            amount={totalAmount * 100}
            shippingAddress
            currency="INR"
            token={tokenHandler}
            stripeKey="pk_test_51KG4bgSDTqptoN5ILDb9uhOhNlLjWKwLhkrVs1e1ilre41rTBzg6lpdYl8pQysv2FWnE2zpOsPmhkDAOAHpBEcsZ00og9bEVuy"
          >
            {" "}
            <button>Pay with card</button>
          </StripeCheckout>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              type="text"
              className="form-control"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button onClick={placeOrder}>Order</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default CartPage;
