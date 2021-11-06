import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import Layout from './layout';
import { useAuth } from '../context/authContext';

export default function dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const _handleLogout = async () => {
    setError('');
    try {
      await logout().then(() => {
        navigate('/login');
      });
    } catch (err) {
      setError('Failed to logout');
      console.log(err);
    }
  };

  return currentUser ? (
    <Layout title="Dashboard">
      {error && (
        <Alert variant="danger">
          <p className="mb-0">{error}</p>
        </Alert>
      )}

      <p>
        <span style={{ fontWeight: '700' }}>E-mail:</span> {currentUser.email}
      </p>
      <Link to="/update-profile" className="btn btn-primary me-3">
        Update Profile
      </Link>
      <Button variant="secondary" onClick={_handleLogout}>
        Logout
      </Button>
    </Layout>
  ) : null;
}
