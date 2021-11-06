import React, { useState, useRef, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/authContext';
import Layout from './layout';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const _handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      await navigate('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError(
          'This E-mail may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.'
        );
      } else if (err.code === 'auth/wrong-password') {
        setError(
          'Wrong password. Try again or click Forgot password to reset it.'
        );
      } else {
        setError('Failed to login ' + JSON.stringify(err.code));
      }
    }
    setIsLoading(false);
  };

  return (
    <Layout title="Login">
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
        </Form.Group>

        <div className="d-grid">
          <Button
            disabled={isLoading && error}
            variant="primary"
            type="submit"
            size="lg"
          >
            Login
          </Button>
        </div>
      </Form>

      <p className="mt-3 text-center">
        <Link to="/signup">Create an account</Link> or{' '}
        <Link to="/forgot-password">Forgot password</Link>
      </p>
      <p className="text-center text-secondary">
        Unauthorized access or activity of this system is a violation of
        Computer-related Crime Act. Unauthorized use may result in reprimand,
        dismissal, financial penalties, and legal action.
      </p>
    </Layout>
  );
}
