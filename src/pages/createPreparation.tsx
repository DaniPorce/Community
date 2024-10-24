import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const CreatePreparation: React.FC = () => {
  const [formData, setFormData] = useState({
    primaLetturaRiferimenti: '',
    primaLetturaAmmonizione: '',
    primaLetturaNome: '',
    secondaLetturaRiferimenti: '',
    secondaLetturaAmmonizione: '',
    secondaLetturaNome: '',
    terzaLetturaRiferimenti: '',
    terzaLetturaAmmonizione: '',
    terzaLetturaNome: '',
    vangeloRiferimenti: '',
    vangeloAmmonizione: '',
    vangeloNome: '',
    ambientaleNome: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateExcel = () => {
    const data = [
      ['Preparazione'],
      ['Ambientale:', formData.ambientaleNome],
      ['Prima Lettura:', formData.primaLetturaRiferimenti],
      ['Ammonizione:', formData.primaLetturaAmmonizione],
      ['Nome Lettura:', formData.primaLetturaNome],
      ['Seconda Lettura:', formData.secondaLetturaRiferimenti],
      ['Ammonizione:', formData.secondaLetturaAmmonizione],
      ['Nome Lettura:', formData.secondaLetturaNome],
      ['Terza Lettura:', formData.terzaLetturaRiferimenti],
      ['Ammonizione:', formData.terzaLetturaAmmonizione],
      ['Nome Lettura:', formData.terzaLetturaNome],
      ['Vangelo:', formData.vangeloRiferimenti],
      ['Ammonizione:', formData.vangeloAmmonizione],
      ['Nome Lettura:', formData.vangeloNome],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Preparazione');
    XLSX.writeFile(wb, 'preparazione.xlsx');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow p-4">
            <h1 className="text-center my-4">Crea Preparazione</h1>
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
                  name="primaLetturaAmmonizione"
                  value={formData.primaLetturaAmmonizione}
                  onChange={handleChange}
                  placeholder="Ammonizione"
                  className="mt-2"
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
                  name="secondaLetturaAmmonizione"
                  value={formData.secondaLetturaAmmonizione}
                  onChange={handleChange}
                  placeholder="Ammonizione"
                  className="mt-2"
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

              <Form.Group controlId="terzaLettura" className="mt-3">
                <Form.Label>Terza Lettura</Form.Label>
                <Form.Control
                  type="text"
                  name="terzaLetturaRiferimenti"
                  value={formData.terzaLetturaRiferimenti}
                  onChange={handleChange}
                  placeholder="Riferimenti terza lettura"
                />
                <Form.Control
                  type="text"
                  name="terzaLetturaAmmonizione"
                  value={formData.terzaLetturaAmmonizione}
                  onChange={handleChange}
                  placeholder="Ammonizione"
                  className="mt-2"
                />
                <Form.Control
                  type="text"
                  name="terzaLetturaNome"
                  value={formData.terzaLetturaNome}
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
                  name="vangeloAmmonizione"
                  value={formData.vangeloAmmonizione}
                  onChange={handleChange}
                  placeholder="Ammonizione"
                  className="mt-2"
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

              <Button variant="primary" className="w-100 mt-4" onClick={generateExcel}>
                Genera Excel
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePreparation;
