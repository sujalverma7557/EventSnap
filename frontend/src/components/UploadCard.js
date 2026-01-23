import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import UploadModal from './UploadModal';

const UploadCard = ({user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
   setIsModalOpen(false);
  };

  return (
    <div>
      <div className="upload-masonry-container">
        <div className="upload-card" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faUpload} className="upload-icon" />
          <h4>Upload Image</h4> 
        </div>
      </div>

      {/* Render the UploadModal component */}
      {isModalOpen && <UploadModal user = {user} onClose={handleCloseModal} />}
    </div>
  );
};

export default UploadCard;