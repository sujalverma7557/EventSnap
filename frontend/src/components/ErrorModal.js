import React from 'react';

const ErrorModal = ({ message, showModal, close }) => {
  const handleClose = () => {
    if (typeof close === 'function') {
      close();
    }
  };
  return (
    <>
    <div className='modal-wrapper' style={{ display: showModal ? 'flex' : 'none' }}>
      <div className='modal-overlay'></div>
      <div className='modal-content1'>
        <div className='modal-header'>
          <h5 className='modal-title'>Error</h5>
        </div>
        <div className='modal-body'>
          <p>{message}</p>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-primary' onClick={handleClose}>
            Try Again
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ErrorModal;
