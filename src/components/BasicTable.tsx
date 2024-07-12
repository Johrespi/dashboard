import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

interface DataRow {
  dateTime: string;
  windDirection: string;
}

interface BasicTableProps {
  input: DataRow[];
}

export default function BasicTable(input: BasicTableProps) {
  // Desestructura el arreglo de entrada para obtener dataToShow
  let [rows, setRows] = useState<DataRow[]>([]);

  useEffect(() => {
    setRows(input.input);
  }, [input]);

  return (
    <TableContainer component={Paper} style={{ borderRadius: 30, maxWidth: 650, background: 'transparent' }}>
      <Table sx={{maxWidth: 650, background: 'linear-gradient(to right, #74ABDB, skyblue)'}} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell align="justify" style={{fontWeight: 'bold', fontSize: '20px'}} > Hora</TableCell>
            <TableCell align="center" style={{fontWeight: 'bold', fontSize: '20px'}} >Dirección del viento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.dateTime}>
              <TableCell component="th" scope="row">
                {row.dateTime}
              </TableCell>
              <TableCell align="center">{row.windDirection}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}