import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { editProfile } from '../actions/userActions';
import ProfileDialog from '../components/ProfileDialog';
import { Col } from 'react-bootstrap';

const EditProfileModal = ({user , onClose}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dialogbox, setDialogBox] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(user.image);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState(user.about);
  const [occupation, setOccupation] = useState(user.occupation);
  const [contactNumber, setContactNumber] = useState(user.contact_no);
  const [password, setPassword] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    setDialogBox(true);
  };

  const CloseBox = () => {
    setDialogBox(false);
  };

  const handleImageBoxHover = () => {
    setIsHovered(true);
  };

  const handleImageBoxLeave = () => {
    setIsHovered(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleSignUp = () => {
    if (password === confirmPassword && name && email && occupation && about && contactNumber) {
      dispatch(editProfile(name,email,password,occupation,about,contactNumber,uploadedImage))
      onClose();
    } else {
      console.log('Invalid Data');
    }
  };

  const setOnClose=()=>{
    onClose();
  }
  return (
    <div className="modal-overlay2">
    <div className="modal-content2 " style={{ borderRadius: '25px' }}>
      <div className="centered-modal-content2"  >
        <div className="row" style={{justifyContent: 'center'}}>
          <div className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Edit Profile</p>
            <div
                className="image-box d-flex flex-row align-items-center mb-4"
                style={{
                  border: '2px solid',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                  
                }}
                onMouseEnter={handleImageBoxHover}
                onMouseLeave={handleImageBoxLeave}
                onClick={handleOnClick}
              >
                    <img src={uploadedImage || 'icons8-user-64.png'} name="image"style={{
     padding: '3px',
     objectFit: 'fill', // Fit the image within the div without preserving its aspect ratio
     width: '100%',
     height: '100%',
    }} alt="User" />
              </div>

            <div className="d-flex flex-row align-items-center mb-4" style={{width:'200px'}}>
              <i className="fas fa-user me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="text"
                className="form-control"
                id="form1"
                placeholder={name}
                value={name}
                disabled
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{width:'200px'}}>
              <i className="fas fa-envelope me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="text"
                className="form-control"
                id="form1"
                placeholder={email}
                value={email}
                disabled
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{width:'200px'}} >
              <i className="fa-solid fa-graduation-cap me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="text"
                className="form-control"
                id="form2"
                placeholder="Occupation"
                value={occupation}
                onChange={handleOccupationChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{width:'200px'}} >
              <i className="fas fa-message me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="text"
                className="form-control"
                id="form3"
                placeholder="your profile bio"
                value={about}
                onChange={handleAboutChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{width:'200px'}} >
              <i className="fas fa-phone me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="number"
                className="form-control"
                id="form4"
                placeholder="contact number"
                value={contactNumber}
                onChange={handleContactNumberChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4"  style={{width:'200px'}}>
                <i className="fas fa-lock me-3" style={{ fontSize: 'lg' }}></i>
                <input
                  type="password"
                  className="form-control"
                  id="form5"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4" style={{width:'200px'}} >
                <i className="fas fa-key me-3" style={{ fontSize: 'lg' }}></i>
                <input
                  type="password"
                  className="form-control"
                  id="form6"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {!passwordMatch && (
                <div className="text-danger mb-2">Passwords do not match</div>
              )}
              <div className='d flex' style={{ display: 'flex' }}>
              <div>
            <button className="btn btn-success mb-4 mr-4" type="button" onClick={handleSignUp} style={{marginRight: '30px' }}  color=''>Save</button>
            </div>
            <div>
            <button className="btn btn-danger mb-4" type="button" onClick={setOnClose}>Cancel</button>
            </div>
          </div>
          </div>
          <ProfileDialog  dialogbox={dialogbox} onClose={CloseBox} setImage={setUploadedImage}/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default EditProfileModal;
