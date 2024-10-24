import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import * as XLSX from 'xlsx';

const GroupForm: React.FC = () => {
  const [groups, setGroups] = useState<{ group1: string[], group2: string[], group3: string[] }>({
    group1: [] as string[],
    group2: [] as string[],
    group3: [] as string[],
  });
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [calendar, setCalendar] = useState<{ date: string, group: string[], event: string }[]>([]);

  const months = [
    { value: '1', label: 'Gennaio' },
    { value: '2', label: 'Febbraio' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Aprile' },
    { value: '5', label: 'Maggio' },
    { value: '6', label: 'Giugno' },
    { value: '7', label: 'Luglio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Settembre' },
    { value: '10', label: 'Ottobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Dicembre' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = jsonData[0];
        const tempGroups = { group1: [] as string[], group2: [] as string[], group3: [] as string[] };

        const nomeIndex = headers.indexOf('Nome');
        const cognomeIndex = headers.indexOf('Cognome');
        const gruppoIndex = headers.indexOf('Gruppo');

        if (nomeIndex === -1 || cognomeIndex === -1 || gruppoIndex === -1) {
          alert('Il file Excel non ha le colonne corrette. Deve includere "Nome", "Cognome", e "Gruppo".');
          return;
        }

        jsonData.slice(1).forEach((row: any) => {
          if (row && row[nomeIndex] && row[cognomeIndex] && row[gruppoIndex]) {
            const nome = row[nomeIndex];
            const cognome = row[cognomeIndex];
            const gruppo = Number(row[gruppoIndex]);

            if (gruppo === 1) {
              tempGroups.group1.push(`${nome} ${cognome}`);
            } else if (gruppo === 2) {
              tempGroups.group2.push(`${nome} ${cognome}`);
            } else if (gruppo === 3) {
              tempGroups.group3.push(`${nome} ${cognome}`);
            }
          }
        });

        setGroups(tempGroups);
        alert('Gruppi caricati con successo!');
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const getTuesdaysAndSaturdays = (year: number, month: number): Date[] => {
    const dates: Date[] = [];
    const currentDate = new Date(year, month - 1, 1);

    while (currentDate.getMonth() === month - 1) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 2 || dayOfWeek === 6) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleCreateCalendar = () => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);

    const dates = getTuesdaysAndSaturdays(year, month);

    if (dates.length === 0) {
      alert('Nessuna data trovata per il mese selezionato.');
      return;
    }

    const groupDates = dates.map(date => ({
      date: date.toLocaleDateString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      group: [] as string[],
      event: date.getDay() === 2 ? 'Preparazione Parola' : 'Eucarestia'
    }));

    setCalendar(groupDates);
  };

  const handleAssignGroup = (index: number, groupNumber: number) => {
    setCalendar(prevCalendar => {
      const updatedCalendar = [...prevCalendar];
      const selectedGroup = groupNumber === 1 ? groups.group1 : 
                          groupNumber === 2 ? groups.group2 : 
                          groups.group3;
      updatedCalendar[index] = { ...updatedCalendar[index], group: [...selectedGroup] };
      return updatedCalendar;
    });
  };

  const handleDownloadExcel = () => {
    const worksheetData = [
      ['Data', 'Evento', 'Gruppo'],
      ...calendar.map((entry, index) => [
        entry.date,
        entry.event,
        entry.group.length > 0 ? `Gruppo ${groups.group1.includes(entry.group[0]) ? 1 : groups.group2.includes(entry.group[0]) ? 2 : 3}` : ''
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Calendario');

    const monthName = months.find(m => m.value === selectedMonth)?.label || selectedMonth;
    XLSX.writeFile(workbook, `calendario_gruppi_${monthName}_${selectedYear}.xlsx`);
  };

  return (
    <Container>
      <h1 className="text-center my-4">Gestione Gruppi e Celebrazioni</h1>

      <Form.Group className="mb-4">
        <Form.Label>Carica file Excel con i gruppi</Form.Label>
        <Form.Control type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      </Form.Group>

      <div className="mb-4">
        <h5>Seleziona periodo:</h5>
        <div className="row">
          <div className="col-md-6 mb-2">
            <Form.Group>
              <Form.Label>Mese:</Form.Label>
              <Form.Select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6 mb-2">
          <Form.Group>
              <Form.Label>Anno:</Form.Label>
              <Form.Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {[new Date().getFullYear(), new Date().getFullYear() + 1].map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        <Button 
          variant="primary" 
          onClick={handleCreateCalendar}
          disabled={!selectedMonth || !selectedYear}
        >
          Crea Calendario
        </Button>
        
        {calendar.length > 0 && (
          <Button 
            variant="success" 
            onClick={handleDownloadExcel}
          >
            Scarica Excel
          </Button>
        )}
      </div>

      {calendar.length > 0 && (
        <>
          <h4 className="mt-4">Calendario Eventi:</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Data</th>
                <th>Evento</th>
                <th>Assegna Gruppo</th>
                <th>Gruppo Assegnato</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.event}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button 
                        size="sm"
                        variant="outline-primary" 
                        onClick={() => handleAssignGroup(index, 1)}
                        disabled={groups.group1.length === 0}
                      >
                        Gruppo 1
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline-secondary" 
                        onClick={() => handleAssignGroup(index, 2)}
                        disabled={groups.group2.length === 0}
                      >
                        Gruppo 2
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline-success" 
                        onClick={() => handleAssignGroup(index, 3)}
                        disabled={groups.group3.length === 0}
                      >
                        Gruppo 3
                      </Button>
                    </div>
                  </td>
                  <td>
                    <ul className="list-unstyled m-0">
                      {entry.group.map((person, idx) => (
                        <li key={idx}>{person}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default GroupForm;
