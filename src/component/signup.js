import React, { useState, useRef, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/authContext';
import Layout from './layout';
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const pinRef = useRef();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const _handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password does not match.');
    }

    if (
      passwordRef.current.value.length < 6 ||
      passwordConfirmRef.current.value.length < 6
    ) {
      return setError('Password must be at least 6 characters.');
    }

    if (pinRef.current.value !== process.env.REGISTER_CODE) {
      return setError('PIN code is incorrect.');
    }

    try {
      setError('');
      setIsLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('E-mail is already exists. Please use another');
      } else {
        setError('Failed to create an account.');
      }
    }
    setIsLoading(false);
  };

  return (
    <Layout title="Create an account">
      {error && (
        <Alert variant="danger">
          <p className="mb-0">{error}</p>
        </Alert>
      )}
      <Form onSubmit={_handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
          <Form.Text className="text-muted">
            Password must be at least 6 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="passwordconfirm">
          <Form.Label>Re-Password</Form.Label>
          <Form.Control type="password" ref={passwordConfirmRef} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="pin">
          <Form.Label>PIN</Form.Label>
          <Form.Control type="text" ref={pinRef} required />
          <Form.Text className="text-muted">
            Please contact admin for PIN code.
          </Form.Text>
        </Form.Group>

        <div className="d-grid">
          <Button
            disabled={isLoading && error}
            variant="primary"
            type="submit"
            size="lg"
          >
            Create an account
          </Button>
        </div>
      </Form>

      <p className="mt-3 text-center">
        Already have an account ? <Link to="/login">Log In</Link>
      </p>
    </Layout>
  );
}
