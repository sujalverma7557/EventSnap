import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { getPhotosByUser } from '../actions/photoActions';
// import { listProducts } from '../actions/productAction';
// import { listPhotos } from '../actions/photoActions';

import Masonry from 'react-masonry-css';
import { useSelector, useDispatch } from 'react-redux';
import ImageCard from '../components/ImageCard';
import { logout } from '../actions/userActions';
import { useLocation, useNavigate } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';
// import UploadModal from '../components/UploadModal';
import { Helmet } from 'react-helmet';

const UserProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user from Redux state or location state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: reduxUserInfo } = userLogin;

  const userPhotoList = useSelector((state) => state.userPhotoList || {});
  const { loading = false, error = null, photos = [] } = userPhotoList;
      
  // Try to get user from location state first, fallback to Redux
  const userFromLocation = location.state?.user;
  const initialUser = userFromLocation || reduxUserInfo;
  
  // const productList = useSelector((state) => state.listProducts);
  // const { loading, error, products } = productList;

  const [EditProfileModalClosed, setEditProfileModalClosed] = useState(true);
  const [currentUser, setCurrentUser] = useState(initialUser);

  // Redirect to login if no user found
  useEffect(() => {
    if (!initialUser) {
      navigate('/login');
    }
  }, [initialUser, navigate]);

  useEffect(() => {
    if (initialUser) {
      setCurrentUser(initialUser);
    }
  }, [initialUser]);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getPhotosByUser(currentUser._id));
    }
  }, [dispatch, currentUser?._id]);
    

  // useEffect(() => {
  //   dispatch(listProducts());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(listPhotos());
  // }, [dispatch]);
  

  // If no user, show loading
  if (!currentUser) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  // const filteredProducts = products?.filter((product) => product.author === currentUser.name) || [];
  // const filteredPhotos = photos.filter(
  //   (photo) => photo.uploadedBy?._id === currentUser._id
  // );
  

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  
  const handleCloseEditProfile = () => {
    setEditProfileModalClosed(true);
  };
  

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="user-profile-container">
      <Helmet>
        <meta httpEquiv="Cache-Control" content="no-store" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Helmet>
      <Row className="profile-row">
        <Col xs={12} md={3} className="profile-col">
          <div className="user-profile-image">
            <Image 
              src={currentUser.image || 'icons8-user-64.png'} 
              roundedCircle 
              className="profile-image" 
              onError={(e) => { e.target.src = 'icons8-user-64.png'; }}
            />
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
        
      </Row>

      <div className="products-grid">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div>Loading...</div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : photos.length === 0 ? (
          <div className="no-products">
            <p>No photos yet.</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {photos.map((photo) => (
              <div key={photo._id} className="my-masonry-grid_item">
                <ImageCard photo={photo} />
              </div>
            ))}
          </Masonry>
        )}

        {!EditProfileModalClosed && (
          <EditProfileModal user={currentUser} onClose={handleCloseEditProfile} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
