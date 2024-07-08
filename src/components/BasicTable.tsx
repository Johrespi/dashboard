import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,               
             backgroundColor: 'skyblue',
              background: 'linear-gradient(to right, skyblue, white)',}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date and Time</TableCell>
            <TableCell align="justify">Wind Direction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.dateTime}>
              <TableCell component="th" scope="row">
                {row.dateTime}
              </TableCell>
              <TableCell align="justify">{row.windDirection}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}