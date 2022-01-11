import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getData();
  }, []);

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
  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (err) {
      setLoading(false);
    }
  };

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);

      handleClose();
      toast.success("Product updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product update failed");
      setLoading(false);
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);

      handleClose();
      toast.success("Product added successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product add failed");
      setLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted successfully");
      getData();
    } catch (error) {
      toast.error("Product delete failed");
      setLoading(false);
    }
  };
  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3>Products List</h3>

            <button onClick={addHandler}>ADD PRODUCT</button>
          </div>
          <table className="table ">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} height="80" width="80" />
                    </td>

                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <FaTrash
                        onClick={() => deleteProduct(item)}
                        color="red"
                        size="20"
                        style={{ cursor: "pointer" }}
                      />

                      <FaEdit
                        onClick={() => editHandler(item)}
                        color="blue"
                        size="20"
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add == true ? "Add a Product" : "Edit Product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="image url"
                  value={product.imageURL}
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="price"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="category"
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />

                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Close</button>
              {add == true ? (
                <button onClick={addProduct}>Save</button>
              ) : (
                <button onClick={updateProduct}>Save</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <div className="">
            {orders.map((order) => {
              return (
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
              );
            })}
          </div>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          <h1>Contact</h1>
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default AdminPage;
