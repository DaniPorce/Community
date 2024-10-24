import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import jsPDF from 'jspdf'; // Importa jsPDF

const CreatePreparation: React.FC = () => {
  const [primaRiferimento, setPrimaRiferimento] = useState('');
  const [primaLettura, setPrimaLettura] = useState('');
  const [secondaRiferimento, setSecondaRiferimento] = useState('');
  const [secondaLettura, setSecondaLettura] = useState('');
  const [terzaRiferimento, setTerzaRiferimento] = useState('');
  const [terzaLettura, setTerzaLettura] = useState('');
  const [vangeloRiferimento, setVangeloRiferimento] = useState('');
  const [vangeloLettura, setVangeloLettura] = useState('');
  const [ambientale, setAmbientale] = useState('');

  // Funzione per generare il PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Preparazione', 10, 10);
    
    doc.setFontSize(14);
    doc.text('Ambientale:', 10, 20);
    doc.text(ambientale, 50, 20);
    
    // Prima Lettura
    doc.text('Prima Lettura', 10, 30);
    doc.text('Riferimenti:', 10, 40);
    doc.text(primaRiferimento, 50, 40);
    doc.text('Nome Lettura:', 10, 50);
    doc.text(primaLettura, 50, 50);
    
    // Seconda Lettura
    doc.text('Seconda Lettura', 10, 60);
    doc.text('Riferimenti:', 10, 70);
    doc.text(secondaRiferimento, 50, 70);
    doc.text('Nome Lettura:', 10, 80);
    doc.text(secondaLettura, 50, 80);

    // Terza Lettura
    doc.text('Terza Lettura', 10, 90);
    doc.text('Riferimenti:', 10, 100);
    doc.text(terzaRiferimento, 50, 100);
    doc.text('Nome Lettura:', 10, 110);
    doc.text(terzaLettura, 50, 110);
    
    // Vangelo
    doc.text('Vangelo', 10, 120);
    doc.text('Riferimenti:', 10, 130);
    doc.text(vangeloRiferimento, 50, 130);
    doc.text('Nome Lettura del Vangelo:', 10, 140);
    doc.text(vangeloLettura, 50, 140);
    
    doc.save('preparazione.pdf');
  };

  return (
    <Container>
      <h1 className="text-center my-4">Crea Preparazione</h1>

      <Form className="p-3 bg-light rounded shadow-sm">
        {/* Prima Lettura */}
        <h4 className="mb-3">Prima Lettura</h4>
        <Form.Group controlId="primaRiferimento" className="mb-3">
          <Form.Label>Riferimenti</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Inserisci i riferimenti della prima lettura"
            value={primaRiferimento}
            onChange={(e) => setPrimaRiferimento(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="primaLettura" className="mb-3">
          <Form.Label>Nome Lettura</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome e Cognome"
            value={primaLettura}
            onChange={(e) => setPrimaLettura(e.target.value)}
            required
          />
        </Form.Group>

        {/* Seconda Lettura */}
        <h4 className="mb-3">Seconda Lettura</h4>
        <Form.Group controlId="secondaRiferimento" className="mb-3">
          <Form.Label>Riferimenti</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Inserisci i riferimenti della seconda lettura"
            value={secondaRiferimento}
            onChange={(e) => setSecondaRiferimento(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="secondaLettura" className="mb-3">
          <Form.Label>Nome Lettura</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome e Cognome"
            value={secondaLettura}
            onChange={(e) => setSecondaLettura(e.target.value)}
            required
          />
        </Form.Group>

        {/* Terza Lettura */}
        <h4 className="mb-3">Terza Lettura</h4>
        <Form.Group controlId="terzaRiferimento" className="mb-3">
          <Form.Label>Riferimenti</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Inserisci i riferimenti della terza lettura"
            value={terzaRiferimento}
            onChange={(e) => setTerzaRiferimento(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="terzaLettura" className="mb-3">
          <Form.Label>Nome Lettura</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome e Cognome"
            value={terzaLettura}
            onChange={(e) => setTerzaLettura(e.target.value)}
            required
          />
        </Form.Group>

        {/* Vangelo */}
        <h4 className="mb-3">Vangelo</h4>
        <Form.Group controlId="vangeloRiferimento" className="mb-3">
          <Form.Label>Riferimenti del Vangelo</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Inserisci i riferimenti del Vangelo"
            value={vangeloRiferimento}
            onChange={(e) => setVangeloRiferimento(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="vangeloLettura" className="mb-3">
          <Form.Label>Nome Lettura del Vangelo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome e Cognome"
            value={vangeloLettura}
            onChange={(e) => setVangeloLettura(e.target.value)}
            required
          />
        </Form.Group>

        {/* Ambientale */}
        <h4 className="mb-3">Ambientale</h4>
        <Form.Group controlId="ambientale" className="mb-3">
          <Form.Label>Nome Ambientale</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome e Cognome"
            value={ambientale}
            onChange={(e) => setAmbientale(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-center mt-4">
          <Button variant="primary" className="me-2" onClick={generatePDF}>
            Genera PDF
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreatePreparation;
