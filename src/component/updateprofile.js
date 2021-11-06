import React, { useState, useRef, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/authContext';
import Layout from './layout';
export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, changeNewEmail, changeNewPassword, removeUser } =
    useAuth();
  const navigate = useNavigate();

  const _handleSubmit = (event) => {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password does not match.');
    }

    const promises = [];
    setIsLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(changeNewEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(changeNewPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to update account');
        setIsLoading(false);
      })
      .finally(() => {
        navigate('/');
      });
  };

  const _handleDeactivate = () => {
    removeUser();
  };

  return (
    <Layout title="Update Profile">
      {error && (
        <Alert variant="danger">
          <p className="mb-0">{error}</p>
        </Alert>
      )}
      <Form onSubmit={_handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} />
          <Form.Text className="text-muted">
            Leave blank to keep the same password. Password must be at least 6
            characters.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="passwordconfirm">
          <Form.Label>Re-Password</Form.Label>
          <Form.Control type="password" ref={passwordConfirmRef} />
          <Form.Text className="text-muted">
            Leave blank to keep the same password. Password must be at least 6
            characters.
          </Form.Text>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button disabled={isLoading && error} variant="success" type="submit">
            Update Profile
          </Button>
          <Link to="/" className="btn btn-secondary mb-3">
            Cancel
          </Link>
          <hr />
          <Button variant="danger" className="mt-3" onClick={_handleDeactivate}>
            Deactivate account
          </Button>
        </div>
      </Form>
    </Layout>
  );
}
