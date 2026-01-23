import React from 'react';
//import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';

const ImageScreen = ({ product }) => {
  return (
    <>
      <a className='btn my-3' href='/'>
        <i className='fas fa-arrow-left'></i> Go Back
      </a>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.caption}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Rating: {product.rating} ({product.numReviews} reviews)
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ImageScreen;
