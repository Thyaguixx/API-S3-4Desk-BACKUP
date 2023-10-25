import React from "react";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import AdmLeftMenu from "../components/reusable/adm-left-menu";
import Footer from "../components/reusable/Footer";
import EstLeftMenu from "../components/reusable/EstLeftMenu";
import EstSaldoBotao from "../components/estSaldo/EstSaldoBotao";
import EstSaldoComponent from "../components/estSaldo/EstSaldoComponent";
import EstSaldoMoney from "../components/estSaldo/EstSaldoMoney";
import AdmTituloTransferirGreenneats from "../components/adm-tranferir-greenneats/adm-titulo-tranferir-greenneats";

function AdmTransferenciaGreenneats(){
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

      return( <div className="App">
      <ThemeProvider theme={theme}>
        <AdmLeftMenu/>
        <Footer />
        <Footer />
        <AdmTituloTransferirGreenneats/>
      </ThemeProvider>
    </div>
    );

}
export default AdmTransferenciaGreenneats;
