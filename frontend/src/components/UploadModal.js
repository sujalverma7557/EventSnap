import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createPhoto } from '../actions/photoActions';
import { encode } from 'blurhash';
import axios from 'axios';

const UploadModal = ({ isOpen, onClose, user, eventId }) => {
  const [image, setImage] = useState();
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const dispatch = useDispatch();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  const loadImage = useCallback(
    (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = src;
      }),
    []
  );
  
  const getImageData = useCallback(
    (image) => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, image.width, image.height);
    },
    []
  );
  
  const encodeImageToBlurhash = useCallback(
    async (imageUrl) => {
      const image = await loadImage(imageUrl);
      const imageData = getImageData(image);
      return encode(imageData.data, imageData.width, imageData.height, 4, 4);
    },
    [loadImage, getImageData]
  );
  
 
  const handleImageChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      setImageURL(file)
      const formdata = new FormData();
      formdata.append('image', file);
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        const { data } = await (async () => {
          return await axios.post('/api/upload', formdata, config);
        })();
        // Convert Windows path to web path: \uploads\image-xxx.jpg -> /uploads/image-xxx.jpg
        const imagePath = data.replace(/\\/g, '/');
        setImage(imagePath);
      } catch (error) {
        console.log(error);
      }
    },
    [setImage]
  );
  
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!eventId || !image) {
        alert('Please select an image');
        return;
      }

      setLoading(true);

      try {
        const imageUrl = URL.createObjectURL(imageURL);
        const blurhash = await encodeImageToBlurhash(imageUrl);
        await dispatch(createPhoto(eventId, image, blurhash, caption));
        onClose();
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error uploading photo. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [onClose, eventId, image, caption, encodeImageToBlurhash, dispatch, imageURL]
  );
  
  const handleCancel = useCallback((e) => {
    e.preventDefault();
    onClose();
  }, [onClose]);
  
  // Handle backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal" 
      style={{ 
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1050,
        overflow: 'auto'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="modal-content" 
        style={{
          position: 'relative',
          margin: '5% auto',
          maxWidth: '600px',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="btn-close"
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            background: 'transparent',
            border: 'none'
          }}
          onClick={onClose}
          aria-label="Close"
        >
        </button>
        
        <form onSubmit={handleSubmit}>
          <h2 className='text-center'><b>Upload Photo</b></h2>
          
          <div className="form-group">
            <label className="form-label mt-4" htmlFor="formFile">Select Image</label>
            <input 
              className="form-control" 
              type="file" 
              id="formFile" 
              onChange={handleImageChange} 
              name="image" 
              accept="image/*"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label mt-3" htmlFor="caption">Caption (optional)</label>
            <textarea
              className="form-control"
              id="caption"
              rows="3"
              placeholder="Add a caption for your photo..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          
          {loading && (
            <div className="loader d-flex justify-content-center mt-3">
              Uploading, please wait....
            </div>
          )}
          
          <div className='d-flex justify-content-center mt-4'>
            <button type="submit" className="btn btn-success" disabled={loading || !image}>
              Upload
            </button>
            <button 
              type="button" 
              className="btn btn-danger" 
              style={{ marginLeft: '10px' }} 
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default UploadModal;

