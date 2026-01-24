import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { joinEvent } from '../actions/eventActions';
import { Button, Form } from 'react-bootstrap';

const JoinEventScreen = () => {
  const [inviteCode, setInviteCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventJoin = useSelector((state) => state.eventJoin);
  const { loading, success, error } = eventJoin;
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
    dispatch(joinEvent(inviteCode.toUpperCase()));
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h1 className="text-center mb-4"><b>Join Event</b></h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="inviteCode">
            <Form.Label>Invite Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter invite code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              required
              maxLength={8}
            />
            <Form.Text className="text-muted">
              Enter the 8-character invite code provided by the event creator.
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-center gap-2">
            <Button
              variant="success"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Joining...' : 'Join Event'}
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

export default JoinEventScreen;
