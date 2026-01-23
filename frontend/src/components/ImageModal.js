import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ImageModal = ({ product, closeModal }) => {
  const handleClose = () => {
    closeModal();
  };

  const handleDownload = async () => {
    try {
      const imagePath = product.image;
      const imageName = imagePath.split("\\").pop();
      const response = await axios.get(`/api/download/${imageName}`, {
        responseType: 'blob',
      });
  
      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a link element and click it to initiate the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', imageName); // Use the modified file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during file download
      console.log(error.message);
    }
  };
  
  
  

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" style={{ marginRight: 'auto' }}>
              <b>{product.title}</b>
            </h3>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <img src={product.image} alt={product.title} className="img-fluid" />
          </div>
          <div className="disc" style={{ paddingRight: '18px', paddingLeft: '18px' }}>
            <Col className="ml-auto justify-content-center">
              <Row>
                <p>{product.caption}</p>
              </Row>
              <Row>
                <h6>
                  <b>Gear used: </b>
                  {product.gear}
                </h6>
              </Row>
            </Col>
          </div>
          <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-primary" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
