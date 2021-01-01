import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productAactions";
import { PRODUCT_UPDATE_RESET } from "../constants/productconstatns";

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const productId = match.params.id;

  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [image, setimage] = useState("");
  const [brand, setbrand] = useState("");
  const [category, setcategory] = useState("");
  const [countInStock, setcountInStock] = useState(0);
  const [description, setdescription] = useState("");
  const [uploading, setuploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setname(product.name);
        setprice(product.price);
        setimage(product.image);
        setbrand(product.brand);
        setcategory(product.category);
        setcountInStock(product.countInStock);
        setdescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadfilehandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setuploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);

      setimage(data);
      setuploading(false);
    } catch (error) {
      console.error(error);
      setuploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go back
      </Link>

      <FormContainer>
        <h1>edit product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="name"
                placeholder="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>price </Form.Label>
              <Form.Control
                type="number"
                placeholder="price"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>image </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter image url"
                value={image}
                onChange={(e) => setimage(e.target.value)}
              />

              <Form.File
                id="image-file"
                label="ChooseFile"
                onChange={uploadfilehandler}
                custom
              />

              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>brand </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter brand "
                value={brand}
                onChange={(e) => setbrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>countInStock </Form.Label>
              <Form.Control
                type="number"
                placeholder="countInStock"
                value={countInStock}
                onChange={(e) => setcountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>category </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter category "
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>description </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter description "
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
