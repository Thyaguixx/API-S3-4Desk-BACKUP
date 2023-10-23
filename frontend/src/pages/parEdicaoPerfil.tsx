import React from "react";
import Footer from "../components/reusable/Footer";
import TopMenu from "../components/reusable/TopMenu";
import { ThemeProvider, createTheme } from "@mui/material";
import Step3 from "../components/EdicaoUsuario/step3";


function ParEdicaoPerfil() {
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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TopMenu />
        <Step3 />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default ParEdicaoPerfil;
