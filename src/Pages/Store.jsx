import React from "react";
import { Col, Row } from "react-bootstrap";
import { cats } from "../data";
import ProductCard from "../Components/ProductCard";

const Store = () => {
  // cats.map((cat) => console.log("Cat: ", cat));
  return (
    <div>
      <h1>Welcome! To the Store !!! Shop all you want !</h1>
      <Row xs={1} md={2} className="g-4">
        {cats.map((product, idx) => (
          <Col align="center" key={idx}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Store;
