import React from 'react'
import { Row,Col} from 'react-bootstrap'
import UserCard from '../components/UserCard'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listUsers } from '../actions/userActions'
import { useEffect } from 'react'

const FrontScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.listUsers);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch,listUsers]);

  return (
    <>
      <h1 className="px-4 py-4">
        <b>USERS</b>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Row>
            {users.map((user) => (
              <Col key={user._id} sm={12} md={6} lg={4}>
                <UserCard user={user} />
              </Col>
            ))}
          </Row>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/signup">
              <button type="button" className="btn btn-primary btn-lg">
                Join Now
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};


export default FrontScreen;




