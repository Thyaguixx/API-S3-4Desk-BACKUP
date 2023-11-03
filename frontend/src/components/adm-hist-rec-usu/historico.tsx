import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Card, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function Historico() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#136935",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(max-width: 10025px)"); // Tela maior que 1024px é considerada como PC
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
  ) {
    return { name, calories, fat, carbs };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
  ];
  
  return (
    <ThemeProvider theme={theme}>
        
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}></Grid>

      <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
    <Box
      sx={{
        width: isMobile ? "100%" : isTablet ? "100%" : "100%",
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
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
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
