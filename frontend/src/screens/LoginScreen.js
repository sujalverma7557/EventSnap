import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import ErrorModal from '../components/ErrorModal';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password)).then(() => {
      if (error) {
        openModal();
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const closeModal = () => {
    setShowErrorModal(false);
  };
  const openModal = () =>{
    setShowErrorModal(true);
  }
  if (userInfo) {
    Navigate('/');
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '50vh' }}>
      <div style={{ width: '50vh' }}>
        <h1 className="text-center mb-4"><b>Sign In</b></h1>

        <div className="form-group">
          <fieldset>
            <label className="form-label mt-4" htmlFor="readOnlyInput">
              E-mail
            </label>
            <input
              className="form-control"
              id="emailInput"
              type="email"
              placeholder="Enter E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
        </div>

        <div className="form-group">
          <fieldset>
            <label className="form-label mt-4" htmlFor="passwordInput">
              Password
            </label>
            <div className="input-group">
              <input
                className="form-control"
                id="passwordInput"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </button>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-primary" onClick={submitHandler}>
            Sign In
          </button>
        </div>

        <div className="mt-3 text-center">
          Don't have an account? No issues, register{' '}
          <Link to="/signUp" style={{ color: 'blue' }}>
            Here
          </Link>{' '}
          <i className="fas fa-face-smile-beam"></i>
        </div>

        {error && (
          <ErrorModal message="Oops! Wrong email and password." showModal={showErrorModal} close={closeModal} />
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
