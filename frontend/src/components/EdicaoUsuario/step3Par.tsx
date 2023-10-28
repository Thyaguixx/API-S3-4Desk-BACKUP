import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AlteracaoSenha from "./alteracaoSenha";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

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

export default function Step3Par() {
  const [razaoSocial, setRazaoSocial] = React.useState('' as any)
  const [nomeFantasia, setNomeFantasia] = React.useState('' as any)
  const [cnpj, setCnpj] = React.useState(''); // Estado para armazenar o CNPJ formatado
  const [dataInicio, setDataInicio] = React.useState('' as any)
  const [responsavelEmpresa, setResponsavelEmpresa] = React.useState('' as any)
  const [volumeOleo, setVolumeOleo] = React.useState('' as any)
  const [endereco, setEndereco] = React.useState('' as any)
  const [numero, setNumero] = React.useState('' as any)
  const [bairro, setBairro] = React.useState('' as any)
  const [cidade, setCidade] = React.useState('' as any)
  const [uf, setUf] = React.useState('' as any)
  const [cidadesAtendem, setCidadesAtendem] = React.useState('' as any)
  const [princParceiros, setPrincParceiros] = React.useState('' as any)

  const [isAlterarSenhaClicked, setIsAlterarSenhaClicked] = React.useState(false);
  const [isInputsVisible, setInputsVisible] = React.useState(true);
  const navigate = useNavigate();

  // Função para formatar o CNPJ
  const formatCnpj = (value: string) => {
    // Remove todos os caracteres não numéricos do valor
    const cnpjValue = value.replace(/\D/g, '');

    // Formata o CNPJ com a máscara
    let formattedCnpj = cnpjValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );

    setCnpj(formattedCnpj); // Atualiza o estado com o CNPJ formatado
  };

  const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formatCnpj(event.target.value);
  };

  const handleClickAlteraSenha = () => {
    setIsAlterarSenhaClicked(true);
    setInputsVisible(false);
  }

  const recuperarInfo = async () => {
    const usuarioLogado = sessionStorage.getItem('UsuarioLogado')

    if (usuarioLogado) {
      const usuarioObj = JSON.parse(usuarioLogado)

      const response = await Axios.get(`${process.env.REACT_APP_BaseURL}/recupera-credito-parceiro/${usuarioObj.UsuarioID}`)

      if (response.data.Sucesso) {
        const parceiro = response.data.ParceiroInfo

        setRazaoSocial(parceiro.ParceiroNomeCompleto)
        setNomeFantasia(parceiro.ParceiroNomeFantasia)
        setCnpj(parceiro.ParceiroCNPJ)
        setDataInicio(parceiro.ParceiroDataCadastro)
        setResponsavelEmpresa(parceiro.ParceiroResponsavel)
        setVolumeOleo(parceiro.ParceiroVolumeOleoMensal)
        setEndereco(parceiro.ParceiroEndereco)
        setNumero(parceiro.ParceiroEnderecoNumero)
        setBairro(parceiro.ParceiroBairro)
        setCidade(parceiro.ParceiroCidade)
        setUf(parceiro.ParceiroUF)
        setCidadesAtendem(parceiro.ParceiroCidadesAtendimento)
        setPrincParceiros(parceiro.ParceiroPrincipaisParceiros)
      }

    }
  }

  React.useEffect(() => {
    recuperarInfo()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Box sx={{
            bgcolor: "#ffffff",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "80%",
            width: "100%",
            // padding: '5%',
            mt: 20,
            borderRadius: 3
          }} >
            <Grid container spacing={1}>

              <Grid item xs={9}>
                <Typography sx={{ ml: 5, mb: 1, fontSize: '20px' }}>
                  Editar Informações:
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 20,
                    width: '80%', // Use 100% da largura da coluna
                    height: 40,
                    backgroundColor: "#136935",
                    color: 'white',
                    '&:hover': {
                      backgroundColor: "white", // Mantém a cor de fundo durante o hover
                      color: '#136935', // Define a cor do texto como branco durante o hover
                    },
                  }}
                  onClick={handleClickAlteraSenha}
                >
                  Alterar senha
                </Button>
              </Grid>

              {isInputsVisible && (
                <Box margin={1} display="flex" flexDirection="column" >
                  <Grid container direction="column" padding={4} spacing={2}>
                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={2} >
                        <TextField
                          fullWidth
                          name="RazaoSocial"
                          label="Razão social"
                          value={razaoSocial}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={2}>
                        <TextField
                          fullWidth
                          name="NomeFantasia"
                          label="Nome fantasia"
                          value={nomeFantasia}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={2}>
                        <TextField
                          fullWidth
                          name="cnpj"
                          label="CNPJ"
                          size="small"
                          value={cnpj} // Exibe o CNPJ formatado
                          onChange={handleCnpjChange} // Manipula a formatação
                          inputProps={{ maxLength: 18 }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={2}>
                        <TextField
                          fullWidth
                          name="DataInicioOp"
                          value={dataInicio}
                          label="Data de inicio da operação"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={2}>
                        <TextField
                          fullWidth
                          name="ResponsavelEmpresa"
                          value={responsavelEmpresa}
                          label="Responsável pela empresa"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={2}>
                        <TextField
                          fullWidth
                          name="VolumeOleo"
                          value={volumeOleo}
                          label="Volume coleta de óleo mensal"
                          size="small"
                        />
                      </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={2}>
                        <TextField
                          fullWidth
                          name="Endereco"
                          value={endereco}
                          label="Logradouro"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={1} xl={2}>
                        <TextField
                          fullWidth
                          name="Numero"
                          value={numero}
                          label="Nº"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                        <TextField
                          fullWidth
                          name="Bairro"
                          value={bairro}
                          label="Bairro"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                        <TextField
                          fullWidth
                          name="Cidade"
                          value={cidade}
                          label="Cidade"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={1} xl={2}>
                        <TextField
                          fullWidth
                          name="uf"
                          value={uf}
                          label="UF"
                          size="small"
                          inputProps={{ maxLength: 2 }} // Limita para dois caracteres
                        />
                      </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={2}>
                        <TextField
                          fullWidth
                          name="CidadesAtendem"
                          value={cidadesAtendem}
                          label="Cidades que atendem"
                          size="small"
                          // multiline
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={2}>
                        <TextField
                          fullWidth
                          name="numeroContato"
                          label="Número de contato"
                          size="small"
                        // multiline
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={1}>
                        <TextField
                          fullWidth
                          name="Parceiros"
                          value={princParceiros}
                          label="Principais parceiros"
                          size="small"
                        // multiline
                        />
                      </Grid>
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={6}> {/* Dividir o espaço da grid igualmente em 2 colunas */}
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: 20,
                            width: '100%', // Use 100% da largura da coluna
                            height: 40,
                            mt: 5
                          }}
                          onClick={() => navigate('/parceiro-saldo')}
                        >
                          Retornar
                        </Button>
                      </Grid>

                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: 20,
                            width: '100%', // Use 100% da largura da coluna
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
              )}

              {isAlterarSenhaClicked && (<AlteracaoSenha />)}

            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
