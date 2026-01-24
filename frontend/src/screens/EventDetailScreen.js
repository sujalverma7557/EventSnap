import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotosByEvent } from '../actions/photoActions';
import { getEventById } from '../actions/eventActions';
import { Button, Row, Col } from 'react-bootstrap';
import ImageCard from '../components/ImageCard';
import UploadModal from '../components/UploadModal';
import Masonry from 'react-masonry-css';

const EventDetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const photoList = useSelector((state) => state.photoList);
  const { loading: photosLoading, photos } = photoList;
  const eventDetails = useSelector((state) => state.eventDetails);
  const { loading: eventLoading, event } = eventDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getEventById(id));
      dispatch(getPhotosByEvent(id));
    }
  }, [dispatch, id, userInfo, navigate]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  if (eventLoading || photosLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Button variant="outline-secondary" onClick={() => navigate('/')} className="me-2">
            ← Back
          </Button>
          <h1 className="d-inline ms-2">{event?.name}</h1>
          <p className="text-muted">{event?.type}</p>
        </div>
        <Button variant="primary" onClick={() => setUploadModalOpen(true)}>
          Upload Photo
        </Button>
      </div>

      {event && (
        <div className="mb-4">
          <p>
            <strong>Invite Code:</strong> {event.inviteCode}
          </p>
          <p>
            <strong>Members:</strong> {event.members ? event.members.length : 0}
          </p>
        </div>
      )}

      {photos && photos.length === 0 ? (
        <div className="text-center py-5">
          <p>No photos yet. Upload the first photo!</p>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo) => (
            <div key={photo._id} className="my-masonry-grid_item">
              <ImageCard photo={photo} />
            </div>
          ))}
        </Masonry>
      )}

      {uploadModalOpen && (
        <UploadModal
          isOpen={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(false);
            dispatch(getPhotosByEvent(id));
          }}
          user={userInfo}
          eventId={id}
        />
      )}
    </div>
  );
};

export default EventDetailScreen;
