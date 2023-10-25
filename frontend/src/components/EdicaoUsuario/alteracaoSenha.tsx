import * as React from "react";
import { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

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

export default function AlteracaoSenha() {

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{
              bgcolor: "#ffffff",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: "80%",
              width: "100%",
            //   padding: '5%',
              mt: 20,
              borderRadius: 3
            }} >
            <Grid container spacing={1}>

              <Grid item xs={9}>
              <Typography sx={{ml: 5, mb: 1, fontSize: '20px' }}>
                Editar Senha:
              </Typography>
              </Grid>
              
              <Box margin={1} display="flex" flexDirection="column" >
                <Grid container direction="column" padding={4} spacing={2}>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                      <TextField
                        fullWidth
                        name="NovaSenha"
                        label="Nova senha"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        fullWidth
                        name="ConfirmarSenha"
                        label="Confirmar senha"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  
                  <Grid container item direction="row" spacing={2}>
                  <Grid item xs={6}> {/* Dividir o espaço da grid igualmente em 2 colunas */}
                <Button
                    variant="outlined"
                    sx={{
                    borderRadius: 20,
                    width: '90%', // Use 100% da largura da coluna
                    height: 40,
                    mt: 5
                    }}
                >
                    Retornar
                </Button>
                </Grid>
                
                <Grid item xs={6}>
                <Button
                    variant="outlined"
                    sx={{
                    borderRadius: 20,
                    width: '90%', // Use 100% da largura da coluna
                    height: 40,
                    ml: 1, // Adicione uma margem à esquerda para separar os botões
                    mt: 5
                    }}
                >
                    Confirmar
                </Button>
                </Grid>

                  </Grid>

                  

                </Grid>
              </Box>
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
