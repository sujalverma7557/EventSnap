import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from '../actions/eventActions';
import { Row, Col, Card, Button } from 'react-bootstrap';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getEvents());
    }
  }, [dispatch, userInfo, navigate]);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return <div className="text-center py-5">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Events</h1>
        <div>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => navigate('/events/new')}
          >
            Create Event
          </Button>
          <Button
            variant="success"
            onClick={() => navigate('/events/join')}
          >
            Join Event
          </Button>
        </div>
      </div>

      {events && events.length === 0 ? (
        <div className="text-center py-5">
          <p>No events yet. Create your first event!</p>
          <Button variant="primary" onClick={() => navigate('/events/new')}>
            Create Event
          </Button>
        </div>
      ) : (
        <Row>
          {events.map((event) => (
            <Col key={event._id} sm={12} md={6} lg={4} className="mb-4">
              <Card
                style={{ cursor: 'pointer' }}
                onClick={() => handleEventClick(event._id)}
              >
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {event.type}
                  </Card.Subtitle>
                  <Card.Text>
                    <small>Invite Code: {event.inviteCode}</small>
                    <br />
                    <small>
                      Members: {event.members ? event.members.length : 0}
                    </small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default DashboardScreen;
