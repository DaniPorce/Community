import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import CreatePreparation from './pages/createPreparation';
import CreateEucaristia from './pages/createEucaristia';
import GroupForm from './pages/GroupForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
        <Container>
          <Navbar.Brand href="/">Gestione Preparazioni</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/create-preparation">Crea Preparazione</Nav.Link>
              <Nav.Link as={Link} to="/create-eucaristia">Crea Eucaristia</Nav.Link>
              <Nav.Link as={Link} to="/group-form">Gestione Gruppi</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-preparation" element={<CreatePreparation />} />
          <Route path="/create-eucaristia" element={<CreateEucaristia />} />
          <Route path="/group-form" element={<GroupForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
