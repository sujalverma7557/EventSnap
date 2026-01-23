import React, { useState,useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../actions/productAction';
import { encode } from 'blurhash';
import axios from 'axios';

const UploadModal = ({ isOpen, onClose, user }) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState();
  const [gear, setGear] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageURL,setImageURL] = useState('');
  const dispatch = useDispatch();

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
        setImage(data);
      } catch (error) {
        console.log(error);
      }
    },
    [setImage]
  );
  
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };
  useEffect(() => {
  }, []);
  
  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
  }, []);
  
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  
  const handleGearChange = useCallback((e) => {
    setGear(e.target.value);
  }, []);
  
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault(); // Prevent form submission
      setLoading(true); // Start the loading state

      try {
        const imageUrl = URL.createObjectURL(imageURL);
        const blurhash = await encodeImageToBlurhash(imageUrl);
        await dispatch(createProduct(title,user.name,caption,category,image,gear,blurhash));
        
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        onClose();
        setLoading(false); // End the loading state
      }
    },
    [onClose, title, caption, category, gear, image,user, encodeImageToBlurhash, dispatch,imageURL]
  );
  
  const handleCancel = useCallback((e) => {
    e.preventDefault();
    onClose();
    // Call the onClose function passed from the parent component to close the modal
  }, [onClose]);
  
  

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2 className='text-center'><b>Upload Image</b></h2>
          <div className="form-group">
            <label className="col-form-label mt-4" htmlFor="inputAuthor">
              <h6><b>Photographer:</b></h6>
            </label>
            <span className="ml-2" style={{ color: "#228E3B" }}>{user.name}</span>
          </div>

          <div className="form-group">
            <label className="col-form-label mt-1" htmlFor="inputTitle">Title:</label>
            <input type="text" className="form-control"  name='title' id="inputTitle" placeholder="title for the image" value={title} onChange={handleTitleChange} />
          </div>

          <div className="form-group">
            <label className="col-form-label mt-4"  htmlFor="inputCaption">Caption:</label>
            <input type="text" className="form-control" name='caption' id="inputCaption" placeholder="what does your image say ;)" value={caption} onChange={handleCaptionChange} />
          </div>

          <div className="form-group">
            <label className="col-form-label mt-4"  htmlFor="inputCategory">Category:</label>
            <input type="text" className="form-control" name='category' id="inputCategory" placeholder="Photography category" value={category} onChange={handleCategoryChange} />
          </div>

          <div className="form-group">
            <label className="col-form-label mt-4" htmlFor="inputGear">Gear Used:</label>
            <input type="text" className="form-control" name='gear' id="inputGear" placeholder="camera and lenses" value={gear} onChange={handleGearChange} />
          </div>

          <div className="form-group">
            <label className="form-label mt-4" htmlFor="formFile">Upload Image</label>
            <input className="form-control" type="file" id="formFile" onChange={handleImageChange} name="image" />
          </div>
          {loading && <div className="loader d-flex justify-content-center">
          Uploading,Please wait....</div>}
          <div className='d-flex justify-content-center mt-4'>
            <button type="submit" className="btn btn-success">Upload</button>
            <button type="button" className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={handleCancel}>Cancel</button>
          </div>
          
        </form>
      </div>
      
    </div>
  );
};

export default UploadModal;

