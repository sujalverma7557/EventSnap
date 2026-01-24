import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent } from '../actions/eventActions';
import { Button, Form } from 'react-bootstrap';

const CreateEventScreen = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [customType, setCustomType] = useState('');
  const [useCustomType, setUseCustomType] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventCreate = useSelector((state) => state.eventCreate);
  const { loading, success, error } = eventCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const eventType = useCustomType ? customType : type;
    if (eventType.trim()) {
      dispatch(createEvent(name, eventType));
    }
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    if (value === 'other') {
      setUseCustomType(true);
      setType('');
    } else {
      setUseCustomType(false);
      setType(value);
      setCustomType('');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h1 className="text-center mb-4"><b>Create Event</b></h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="eventName">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="eventType">
            <Form.Label>Event Type</Form.Label>
            <Form.Select
              value={useCustomType ? 'other' : type}
              onChange={handleTypeChange}
              required={!useCustomType}
            >
              <option value="">Select event type...</option>
              <option value="wedding">Wedding</option>
              <option value="trip">Trip</option>
              <option value="reunion">Reunion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="conference">Conference</option>
              <option value="other">Other (Custom)</option>
            </Form.Select>
          </Form.Group>

          {useCustomType && (
            <Form.Group className="mb-3" controlId="customType">
              <Form.Label>Custom Event Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter custom event type"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <div className="d-flex justify-content-center gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={loading || (!type && !customType)}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateEventScreen;
