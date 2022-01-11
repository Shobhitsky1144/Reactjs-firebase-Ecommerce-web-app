import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getApp();
  }, [orders]);

  function getApp() {
    orders.map((elem) => {
      setToggle(elem.userid === userid);
    });
  }

  const getData = async () => {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersArray);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <Layout loading={loading}>
      <h1 className="text-center text-success">View Orders</h1>
      {toggle === true ? (
        orders
          .filter((obj) => obj.userid == userid)
          .map((order) => {
            return (
              <>
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item) => {
                      return (
                        <tr>
                          <td>
                            <img src={item.imageURL} height="80" width="80" />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            );
          })
      ) : (
        <h1 className="text-danger text-center">No Orders Found</h1>
      )}
    </Layout>
  );
};

export default OrdersPage;
