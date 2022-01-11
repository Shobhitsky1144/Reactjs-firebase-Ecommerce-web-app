import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const OurCart = ({ item }) => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    var carts = {
      name: product.name,
      id: product.id,
      imageURL: product.imageURL,
      category: product.category,
      quantity: quantity,
      price: product.price,
      description: product.description,
    };
    dispatch({ type: "ADD_TO_CART", payload: carts });
  };
  return (
    <tr>
      <td>
        <img src={item.imageURL} height="80" width="80" />
      </td>

      <td>{item.name}</td>
      <td>{item.price}</td>

      <td>
        <FaTrash
          onClick={() => deleteFromCart(item)}
          style={{ cursor: "pointer" }}
        />
      </td>
      <td>
        {" "}
        <FaPlus
          onClick={() => addToCart(item, item.quantity + 1)}
          style={{ cursor: "pointer" }}
        />
        <span className="mx-3">{item.quantity}</span>
        <FaMinus
          style={{ cursor: "pointer" }}
          onClick={() =>
            item.quantity === 1 ? "" : addToCart(item, item.quantity - 1)
          }
        />
      </td>
    </tr>
  );
};

export default OurCart;
