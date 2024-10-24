import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import CreatePreparation from './pages/createPreparation';
import CreateEucaristia from './pages/createEucaristia';
import GroupForm from './pages/GroupForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router basename="/Community">
        {/* Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
          <Container className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="/">Gestione Preparazioni</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
              <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/create-preparation">Crea Preparazione</Nav.Link>
                <Nav.Link as={Link} to="/create-eucaristia">Crea Eucaristia</Nav.Link>
                <Nav.Link as={Link} to="/group-form">Gestione Gruppi</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Content */}
        <div className="App-content">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-preparation" element={<CreatePreparation />} />
              <Route path="/create-eucaristia" element={<CreateEucaristia />} />
              <Route path="/group-form" element={<GroupForm />} />
            </Routes>
          </Container>
        </div>

        {/* Footer */}
        <footer className="App-footer">
          <p>© 2024 La tua App - Tutti i diritti riservati</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
