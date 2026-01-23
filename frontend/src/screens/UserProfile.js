import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productAction';
import Masonry from 'react-masonry-css';
import { useSelector, useDispatch } from 'react-redux';
import ImageCard from '../components/ImageCard';
import UploadCard from '../components/UploadCard';
import { logout } from '../actions/userActions';
import { useLocation, useNavigate } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';
import UploadModal from '../components/UploadModal';
import { Helmet } from 'react-helmet';

const UserProfile = () => {
  const location = useLocation();
  const { user } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.listProducts);
  const { loading, error, products } = productList;
  const [uploadCardClosed, setUploadCardClosed] = useState(true);
  const [EditProfileModalClosed, setEditProfileModalClosed] = useState(true);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user,EditProfileModal,currentUser]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, UploadModal,EditProfileModal,UploadCard]);

  const filteredProducts = products.filter((product) => product.author === user.name);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const handleCloseUploadCard = () => {
    setUploadCardClosed(true);
    window.location.reload();
  };
  const handleCloseEditProfile = () => {
    setEditProfileModalClosed(true);
    window.location.reload();
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="user-profile-container">
      <Helmet>
        <meta http-equiv="Cache-Control" content="no-store" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </Helmet>
      <Row className="profile-row">
        <Col xs={12} md={3} className="profile-col">
          <div className="user-profile-image">
            <Image src={currentUser.image} roundedCircle className="profile-image" />
          </div>
        </Col>
        <Col xs={12} md={9}>
          <Row>
            <Col>
              <div className="user-profile-header">
                <div className="user-profile-info">
                  <h2 className="user-profile-name">{currentUser.name}</h2>
                  <p className="user-profile-email">{currentUser.occupation}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="user-profile">
                <div className="user-profile-body">
                  <div className="user-profile-details">
                    <h3 className="profile-heading">{currentUser.email}</h3>
                    <p className="profile-text">{currentUser.about}</p>
                    <p>
                      <button type="button" className="btn btn-outline-info" onClick={() => setEditProfileModalClosed(false)}>
                        Edit Profile
                      </button>
                      <button type="button" className="btn btn-outline-danger" style={{ marginLeft: '20px' }} onClick={logoutHandler}>
                        Logout
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="profile-col">
          <Col className="d-flex justify-content-center">
            <UploadCard user={currentUser} onClose={handleCloseUploadCard} />
          </Col>
        </Col>
        
      </Row>

      <div className="products-grid">
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBlockStart: '50px' }}></div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {products.length === 0 ? (
              <div className="no-products">
                <p>No products yet.</p>
              </div>
            ) : (
              <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="my-masonry-grid_item">
                    <ImageCard product={product} />
                  </div>
                ))}
              </Masonry>
            )}
          </div>
        )}
         {!EditProfileModalClosed && <EditProfileModal user ={currentUser} onClose={handleCloseEditProfile} />}
      </div>
    </div>
  );
};

export default UserProfile;
