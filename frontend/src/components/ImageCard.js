import React, { useState } from 'react';
import ImageModal from './ImageModal';
import { Blurhash } from 'react-blurhash';

const ImageCard = ({ product }) => {
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
      >
        {isHovered && (
          <div className="hovered-content">
            <h5 className="card-title hovered-title">
              <b>{product.title}</b>
            </h5>
            <h6 className="card-subtitle text-muted hovered-subtitle">{product.gear}</h6>
          </div>
        )}
        {!isImageLoaded && (
          <Blurhash
            hash={product.blurhash}
            width="100%"
            height={400}
            resolutionX={32}
            resolutionY={32}
          />
        )}
        <img
          src={product.image}
          className={`card-img-top image-card-img-sharp ${isImageLoaded ? 'image-loaded' : ''}`}
          variant="bottom"
          alt="top"
          thumbnail
          onLoad={handleImageLoad}
        />
        {modalOpen && <ImageModal product={product} closeModal={closeModal} />}
        {isHovered && isImageLoaded && (
          <>
            <div className="card-body">
              <p className="card-text">{product.caption}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{product.category}</li>
            </ul>
            <div className="card-footer text-muted">{calculateDaysAgo(product.createdAt)}</div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageCard;
