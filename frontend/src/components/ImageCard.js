import React, { useState } from 'react';
import ImageModal from './ImageModal';
import { Blurhash } from 'react-blurhash';

const ImageCard = ({ product, photo }) => {
  // Support both product (legacy) and photo (new) props
  const item = photo || product;
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (event) => {
    if (isHovered && event.target.classList.contains('image-card-img-sharp')) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsHovered(false);
    setModalOpen(false);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const calculateDaysAgo = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const timeDifference = Math.abs(currentDate.getTime() - createdDate.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) {
      return 'uploaded today';
    }
    if (daysDifference === 1) {
      return '1 day ago';
    } else {
      return `${daysDifference} days ago`;
    }
  };

  return (
    <>
      <div
        className={`card mb-3 ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        {!isImageLoaded && item.blurhash && (
          <Blurhash
            hash={item.blurhash}
            width="100%"
            height={400}
            resolutionX={32}
            resolutionY={32}
          />
        )}
        <img
          src={item.image}
          className={`card-img-top image-card-img-sharp ${isImageLoaded ? 'image-loaded' : ''}`}
          variant="bottom"
          alt="photo"
          thumbnail
          onLoad={handleImageLoad}
        />
        {modalOpen && <ImageModal product={item} closeModal={closeModal} />}
        {isHovered && isImageLoaded && (
          <div className="card-footer" style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.uploadedBy && (
                  <>
                    {item.uploadedBy.image && (
                      <img 
                        src={item.uploadedBy.image} 
                        alt={item.uploadedBy.name}
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>
                      {item.uploadedBy.name}
                    </span>
                  </>
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#ddd' }}>
                {calculateDaysAgo(item.createdAt)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageCard;
