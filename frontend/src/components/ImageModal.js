import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ImageModal = ({ product, closeModal }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [closeModal]);

  const handleClose = () => {
    closeModal();
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  const handleDownload = async () => {
    try {
      const imagePath = product.image;
      // Extract filename from path (handle both / and \ separators)
      const imageName = imagePath.split(/[/\\]/).pop();
      
      // Create a meaningful filename with event name if available
      const filename = product.eventName 
        ? `${product.eventName.replace(/\s+/g, '_')}_${imageName}`
        : imageName;

      const response = await axios.get(imagePath, {
        responseType: 'blob',
      });
  
      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a link element and click it to initiate the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };
  
  
  

  return (
    <div 
      className="modal" 
      style={{ 
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1050,
        overflow: 'auto',
        padding: '20px'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="modal-dialog modal-dialog-centered" 
        role="document"
        style={{
          maxWidth: '90vw',
          margin: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="modal-content"
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <div className="modal-header border-bottom">
            <h3 className="modal-title" style={{ marginRight: 'auto' }}>
              {product.uploadedBy && product.uploadedBy.name && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {product.uploadedBy.image && (
                    <img 
                      src={product.uploadedBy.image} 
                      alt={product.uploadedBy.name}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <span>{product.uploadedBy.name}</span>
                </div>
              )}
            </h3>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={handleClose}
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                position: 'absolute',
                right: '15px',
                top: '15px'
              }}
              
            >
            </button>
          </div>
          <div 
            className="modal-body" 
            style={{ 
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: '70vh',
              overflow: 'auto'
            }}
          >
          <img 
            src={product.image} 
            alt="Photo" 
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />
          </div>
          {product.caption && (
            <div className="disc" style={{ padding: '15px 18px' }}>
              <Col>
                <Row>
                  <p style={{ marginBottom: '10px', fontSize: '16px' }}>{product.caption}</p>
                </Row>
              </Col>
            </div>
          )}
          <div className="modal-footer" style={{ justifyContent: 'space-between', borderTop: '1px solid #dee2e6' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>
              {product.createdAt && new Date(product.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
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
