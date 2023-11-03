import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";

export default function AdmUsuarioHistorico() {
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

  function createData(name: string, fat: number, carbs: number) {
    return { name, fat, carbs };
  }

  const rows = [
    createData('Raynara', 159, 11),
    createData('Diane', 237, 9.0),
    createData('Rita', 262, 16.0),
  ];

  // function handleEditClick({ event }: { event: MouseEvent<HTMLButtonElement, MouseEvent>; }): void {
  //     throw new Error("Function not implemented.");
  // }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}></Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Box
            sx={{
              width: isMobile ? "100%" : isTablet ? "100%" : "100%",
              backgroundColor: "white",
              borderRadius: 5,
              borderColor: "gray",
              border: 1,
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">E-mail</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      {/* Célula de ações com ícones */}
                      <TableCell align="center">
                        <IconButton size="small" >
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination size='small' sx={{ ml: '35%', mt: '15%' }} count={10} variant="outlined" color="primary" />
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
