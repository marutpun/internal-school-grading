import React, { useState, useRef, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/authContext';
import Layout from './layout';

export default function ResetPassword() {
  const emailRef = useRef();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const _handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');
      setError('');
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Success! Please check your inbox.');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError(
          'This E-mail may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.'
        );
      } else {
        setError('Failed to login ' + JSON.stringify(err.code));
      }
    }
    setIsLoading(false);
  };

  return (
    <Layout title="Reset Password">
      {error && (
        <Alert variant="danger">
          <p className="mb-0">{error}</p>
        </Alert>
      )}
      {message && (
        <Alert variant="success">
          <p className="mb-0">{message}</p>
        </Alert>
      )}
      <Form onSubmit={_handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>

        <div className="d-grid">
          <Button
            disabled={isLoading && error}
            variant="primary"
            type="submit"
            size="lg"
          >
            Reset
          </Button>
        </div>
      </Form>

      <p className="mt-3 text-center">
        <Link to="/login">Login</Link>
      </p>
    </Layout>
  );
}
