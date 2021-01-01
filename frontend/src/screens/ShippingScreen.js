import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingaddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setaddress] = useState(shippingAddress.address);
  const [city, setcity] = useState(shippingAddress.city);
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
  const [country, setcountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingaddress({ address, city, postalCode, country }));
    history.push("/peyment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submithandler}>
        <Form.Group controlId="address">
          <Form.Label>address </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setaddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label> city</Form.Label>
          <Form.Control
            type="text"
            placeholder="city"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="postalode">
          <Form.Label> postalcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="postalcode"
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label> country</Form.Label>
          <Form.Control
            type="text"
            placeholder="country"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
