import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMediaQuery } from '@mui/material';
import Pagination from '@mui/material/Pagination';


export default function Tabela() {
    
  const theme = createTheme({
    palette: {
      primary: {
        main: '#136935',
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(max-width: 10025px)");

  function createData(
    data: string,
    parceiro: string,
    estabelecimento: string,
    totalLitros: number,
    totalMoedas: number,
  ) { 
    return { data, parceiro, estabelecimento, totalLitros, totalMoedas  };
  }
  
  const rows = [
    createData('21/04/2023', 'Coleta', 'Restaurante', 20, 20),
    createData('21/04/2023', 'Coleta', 'Restaurante', 20, 20),
    createData('21/04/2023', 'Coleta', 'Restaurante', 20, 20),
    createData('21/04/2023', 'Coleta', 'Restaurante', 20, 20),
       
  ];

  
  return (
    <ThemeProvider theme={theme}>
       
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={12} md={3} lg={3} xl={12}></Grid>
 
      <Grid item xs={12} sm={12} md={8} lg={8} xl={12}>
    <Box
      sx={{
        width: isMobile ? "92%" : isTablet ? "92%" : "92%",
        backgroundColor: "white",
        // height: isMobile ? "380px" : isTablet ? "380px" : "330px",
        borderRadius: 5,
        borderColor: "gray",
        border: 1,
        // ml: 55,
        mt: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Centraliza horizontalmente
        // width: "100%",
           
      }}
    >
        <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Data</TableCell>
            <TableCell align="center">Parceiro</TableCell>
            <TableCell align="center">Estabelecimento</TableCell>
            <TableCell align="center">Total Litros</TableCell>
            <TableCell align="center">Total Moedas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.data}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.data}</TableCell>
              <TableCell align="center">{row.parceiro}</TableCell>
              <TableCell align="center">{row.estabelecimento}</TableCell>
              <TableCell align="center">{row.totalLitros}</TableCell>
              <TableCell align="center">{row.totalMoedas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination size='small' sx={{ml:'35%', mt:'15%'}} count={10} variant="outlined" color="primary" />
    </TableContainer>
    </Box>
    </Grid>
    </Grid>
    <Grid/>
    </ThemeProvider>
  );
}