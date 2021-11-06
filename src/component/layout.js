import React, { Fragment } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Layout({ children, school, title }) {
  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <Navbar
        variant="light"
        as="header"
        style={{ backgroundColor: '#8bc34a' }}
      >
        <Container className="d-flex flex-column align-items-start">
          <Navbar.Brand>
            <h1>Internal Student Grading</h1>
          </Navbar.Brand>
          <Navbar.Text>
            Internal Student Grading (ISG) is a tool for calculate, grading
            student of {school ? `${school}.` : null}
          </Navbar.Text>
        </Container>
      </Navbar>
      <Container className="flex-fill">
        <h2 className="text-center mt-3">{title}</h2>
        {children}
      </Container>
    </div>
  );
}

Layout.defaultProps = {
  school: 'Wat Na Nong School',
};
