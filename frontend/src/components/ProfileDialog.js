import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import { useSearchParams } from 'react-router-dom';
import { encode } from 'blurhash';

const ProfileDialog = ({ img1, dialogbox, onClose,setImage,setImageHash }) => {
  const [croppedImage, setCroppedImage] = useState(false);
  const [storeImage,setStoreImage] =useState([]);

  const handleSaveClick = () => {
    saveImage();
    onClose();
    // Handle saving the cropped image as the profile photo
    // You can implement your logic here
  };
  const saveImage = () => {
    setImage(croppedImage);
    
  };
 

  const onCrop = (view) => {
    setCroppedImage(view);
  };

  const onCloseCrop = () => {
    setCroppedImage(null);
  };

  return (
    <div>
      <div className="modal" style={{ display: dialogbox ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document" style={{ height: '600px', width: '600px' }}>
          <div className="modal-content" style={{ height: '100%' }}>
            <div className="modal-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
                <Avatar
                  width={390}
                  height={295}
                  onCrop={onCrop}
                  onClose={onCloseCrop}
                />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSaveClick}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;

