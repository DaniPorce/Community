import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import jsPDF from 'jspdf';

const CreateEucaristia: React.FC = () => {
  const [formData, setFormData] = useState({
    primaLetturaRiferimenti: '',
    primaLetturaNome: '',
    secondaLetturaRiferimenti: '',
    secondaLetturaNome: '',
    vangeloRiferimenti: '',
    vangeloNome: '',
    ambientaleNome: '',
    preghiere: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Eucaristia', 10, 10);
    doc.setFontSize(14);
    doc.text('Ambientale:', 10, 20);
    doc.text(formData.ambientaleNome, 50, 20);
    doc.text('Prima Lettura:', 10, 30);
    doc.text(`Riferimenti: ${formData.primaLetturaRiferimenti}`, 50, 30);
    doc.text(`Nome: ${formData.primaLetturaNome}`, 50, 40);
    doc.text('Seconda Lettura:', 10, 50);
    doc.text(`Riferimenti: ${formData.secondaLetturaRiferimenti}`, 50, 50);
    doc.text(`Nome: ${formData.secondaLetturaNome}`, 50, 60);
    doc.text('Vangelo:', 10, 70);
    doc.text(`Riferimenti: ${formData.vangeloRiferimenti}`, 50, 70);
    doc.text(`Nome: ${formData.vangeloNome}`, 50, 80);
    doc.text('Preghiere:', 10, 90);
    doc.text(formData.preghiere, 50, 90);
    doc.save('eucaristia.pdf');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h1 className="text-center my-4">Crea Eucaristia</h1>
          <Form>
            <Form.Group controlId="ambientale">
              <Form.Label>Ambientale</Form.Label>
              <Form.Control
                type="text"
                name="ambientaleNome"
                value={formData.ambientaleNome}
                onChange={handleChange}
                placeholder="Inserisci nome dell'ambientale"
              />
            </Form.Group>

            <Form.Group controlId="primaLettura" className="mt-3">
              <Form.Label>Prima Lettura</Form.Label>
              <Form.Control
                type="text"
                name="primaLetturaRiferimenti"
                value={formData.primaLetturaRiferimenti}
                onChange={handleChange}
                placeholder="Riferimenti prima lettura"
              />
              <Form.Control
                type="text"
                name="primaLetturaNome"
                value={formData.primaLetturaNome}
                onChange={handleChange}
                placeholder="Chi legge"
                className="mt-2"
              />
            </Form.Group>

            <Form.Group controlId="secondaLettura" className="mt-3">
              <Form.Label>Seconda Lettura</Form.Label>
              <Form.Control
                type="text"
                name="secondaLetturaRiferimenti"
                value={formData.secondaLetturaRiferimenti}
                onChange={handleChange}
                placeholder="Riferimenti seconda lettura"
              />
              <Form.Control
                type="text"
                name="secondaLetturaNome"
                value={formData.secondaLetturaNome}
                onChange={handleChange}
                placeholder="Chi legge"
                className="mt-2"
              />
            </Form.Group>

            <Form.Group controlId="vangelo" className="mt-3">
              <Form.Label>Vangelo</Form.Label>
              <Form.Control
                type="text"
                name="vangeloRiferimenti"
                value={formData.vangeloRiferimenti}
                onChange={handleChange}
                placeholder="Riferimenti vangelo"
              />
              <Form.Control
                type="text"
                name="vangeloNome"
                value={formData.vangeloNome}
                onChange={handleChange}
                placeholder="Chi legge"
                className="mt-2"
              />
            </Form.Group>

            <Form.Group controlId="preghiere" className="mt-3">
              <Form.Label>Preghiere</Form.Label>
              <Form.Control
                type="text"
                name="preghiere"
                value={formData.preghiere}
                onChange={handleChange}
                placeholder="Inserisci chi farà le preghiere"
              />
            </Form.Group>

            <Button variant="primary" className="w-100 mt-4" onClick={generatePDF}>
              Genera PDF
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEucaristia;
