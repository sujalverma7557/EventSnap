import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { register } from '../actions/userActions';
import ProfileDialog from '../components/ProfileDialog';
import ErrorModal from '../components/ErrorModal'

const SignUp = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [dialogbox, setDialogBox] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [occupation, setOccupation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorModal,setModalOpen]=useState(false);
  const [error,setError] = useState(false);

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
  const modalOpen = () =>{
    setModalOpen(true);
  }
  const modalCLose = () =>{
    setError(false);
    setModalOpen(false);
  }

  const handleSignUp = () => {
    if (password === confirmPassword && name && email && password && occupation && about && contactNumber  && uploadedImage ) {
      dispatch(register(name, email, password, occupation, about, contactNumber , uploadedImage));
      Navigate('/', { replace: true });
      window.location.reload();
      
    } else {
      console.log('Passwords do not match');
      setError(true);
      modalOpen();
    }
  };

  
  return (
    <div className="container-fluid">
    <div className="card text-black m-5" style={{ borderRadius: '25px' }}>
      <div className="card-body" encType="multipart/form-data" method='post' action='/api/user/signUp'>
        <div className="row">
          <div className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
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
                    <img src={uploadedImage || 'icons8-user-64.png'} name="image"style={{ padding: '3px' }} alt="User" />
              </div>

            <div className="d-flex flex-row align-items-center mb-4" style={{width:'60%'}}>
              <i className="fas fa-user me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="text"
                className="form-control"
                id="form1"
                placeholder="Your Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{width:'60%'}}>
              <i className="fas fa-envelope me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="email2"
                className="form-control"
                id="form2"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{width:'60%'}}>
              <i className="fa-solid fa-graduation-cap me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="text"
                className="form-control"
                id="form3"
                placeholder="Occupation"
                value={occupation}
                onChange={handleOccupationChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{width:'60%'}}>
              <i className="fas fa-message me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="text"
                className="form-control"
                id="form4"
                placeholder="your profile bio"
                value={about}
                onChange={handleAboutChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{width:'60%'}}>
              <i className="fas fa-phone me-3" style={{ fontSize: 'lg' }}></i>
              <input
                type="number"
                className="form-control"
                id="form5"
                placeholder="contact number"
                value={contactNumber}
                onChange={handleContactNumberChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4" style={{ width: '60%' }}>
                <i className="fas fa-lock me-3" style={{ fontSize: 'lg' }}></i>
                <input
                  type="password"
                  className="form-control"
                  id="form6"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="d-flex flex-row align-items-center mb-4" style={{ width: '60%' }}>
                <i className="fas fa-key me-3" style={{ fontSize: 'lg' }}></i>
                <input
                  type="password"
                  className="form-control"
                  id="form7"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {!passwordMatch && (
                <div className="text-danger mb-2">Passwords do not match</div>
              )}
              <div className='mb-4'>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name='flexCheck'
                    value=''
                    id='flexCheckDefault'
                  />
                <label className="form-check-label" htmlFor='flexCheckDefault'>
                  Accept <Link to="/terms">terms and conditions.</Link>
                </label>
              </div>
            </div>
            <button className="btn btn-primary mb-4" type="button" onClick={handleSignUp}>Register</button>
          </div>
          <ProfileDialog  dialogbox={dialogbox} onClose={CloseBox} setImage={setUploadedImage}/>
          <div className="col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center">
            <img src="v872-nunny-020-v.jpg" alt="Card" className="card-img-fluid img-fluid" />
          </div>
          {error && (
          <ErrorModal message="Oops! Something went wrong, please recheck your entries and try again.Make sure all fields are filled" showModal={errorModal} close={modalCLose} />
        )}
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default SignUp;
