import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProductInfo = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getData = async () => {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );

      setProduct(productTemp.data());
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const addToCart = (product) => {
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
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img
                  src={product.imageURL}
                  alt=""
                  className="product-info-img"
                />
                <hr />
                <p>{product.description}</p>
                <div className="d-flex justify-content-end mt-3">
                  <button onClick={() => addToCart(product)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
