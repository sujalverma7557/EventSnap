import React, { useState } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh', paddingBottom:'100px'}}>
      <div className="card py-3 px-3">
        <Row>
          <Row className="align-items-center">
          <Col>
            <Image
              src={user.image}
              variant="top"
              className={`compressed-image px-4 py-4 ${!imageLoaded && 'd-none'}`}
              roundedCircle
              onLoad={handleImageLoad}
            />
          </Col>
          <Col>
            <h4 className="card-title "><b>{user.name}</b></h4>
            <h6 className="card-subtitle mb-2 text-muted">{user.occupation}</h6>
          </Col>
          </Row>
          <Row >
          <Col>
            <div className="card-body justify-content-left">
              <p className="card-text ">{user.about}</p>
              <div className="d-flex">
                <Link to={`/photostream?author=${user.name}`} className="card-link ">
                  <button type="button" className="btn btn-primary"><h6>PhotoStream</h6></button>
                </Link>
              </div>
            </div>
          </Col>
          </Row>
        </Row>
      </div>
    </div>
  );
};

export default UserCard;
