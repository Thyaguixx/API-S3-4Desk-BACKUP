import { GETParceiroEstoque } from '../GETs/GETParceiroEstoque';
import { SETParceiroEstoque } from '../SETs/SETParceiroEstoque';

const { Client } = require('pg');

export async function POSTEmpresaCompraOleoParceiro(client, UsuarioID, ParceiroID, ParceiroEstoqueID, transacaoEmpresaParceiro) {
  try {

    let isSucesso = false

    const EmpresaQuery = {
      text: 'SELECT EmpresaID FROM Empresa WHERE UsuarioID = $1',
      values: [UsuarioID],
    };
    const GETEmpresaResult = await client.query(EmpresaQuery);
    const EmpresaID = GETEmpresaResult.rows[0].EmpresaID;

    // Iniciar uma transação no banco de dados
    await client.query('BEGIN');

    const insertQuery = `
    INSERT INTO HistoricoParceiroEmpresa (
      EmpresaID,
      ParceiroID,
      HistoricoParceiroEmpresaData,
      HistoricoParceiroEmpresaDescricao,
      HistoricoParceiroEmpresaProdutoDescricao,
      HistoricoParceiroEmpresaProdutoQuantidade,
      HistoricoParceiroEmpresaCreditoQuantidade,
      HistoricoParceiroEmpresaTipoTransacao
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `;
    const insertValues = [
      EmpresaID,
      ParceiroID,
      transacaoEmpresaParceiro.TransacaoEmpresaParceiroData,
      'Transação entre empresa e parceiro, empresa compra óleo',
      transacaoEmpresaParceiro.ParceiroEstoqueProdutoDescricao,
      transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
      transacaoEmpresaParceiro.ParceiroCreditoQuantidade,
      'EmpresaCompraOleo'
    ];
    await client.query(insertQuery, insertValues);



    const GETEmpresaEstoque = {
      text: 'SELECT EmpresaEstoqueID FROM EmpresaEstoque WHERE EmpresaEstoqueTipo = $1 and EmpresaID = $2',
      values: [UsuarioID, transacaoEmpresaParceiro.EstoqueTipo],
    };
    const GETEmpresaEstoqueResult = await client.query(GETEmpresaEstoque);
    const EmpresaEstoqueID = GETEmpresaEstoqueResult.rows[0].EmpresaEstoqueID;


    
    if (EmpresaEstoqueID) {
      const updateEstoqueEmpresaQuery = {
        text: `
          UPDATE EmpresaEstoque
          SET EmpresaEstoqueProdutoQuantidade = EmpresaEstoqueProdutoQuantidade + $1
          WHERE EmpresaEstoqueID = $2
        `,
        values: [
          transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
          EmpresaEstoqueID,
        ],
      };
      await client.query(updateEstoqueEmpresaQuery);
    } else {

      const insertEmpresaEstoqueQuery = `
      INSERT INTO EmpresaEstoque (
        EmpresaID,
        EmpresaEstoqueEstoqueProdutoDescricao,
        EmpresaEstoqueEstoqueTipo,
        EmpresaEstoqueEstoqueProdutoQuantidade
      )
      VALUES ($1, $2, $3, $4)
    `;
      const insertEmpresaEstoqueValues = [
        EmpresaID, 
        transacaoEmpresaParceiro.ParceiroEstoqueProdutoDescricao,
        transacaoEmpresaParceiro.EstoqueTipo,
        transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
      ];
      await client.query(insertEmpresaEstoqueQuery, insertEmpresaEstoqueValues);
    }

    const updateParceiroQuery = {
      text: `
        UPDATE Parceiro
        SET ParceiroCreditoQuantidade = ParceiroCreditoQuantidade + $1
        WHERE ParceiroID = $2
      `,
      values: [
        transacaoParceiroParceiro.ParceiroCreditoQuantidade,
        parceiroID,
      ],
    };

    await client.query(updateParceiroQuery);
    // Atualizar a quantidade de estoque no Parceiro
    const updateEstoqueQuery = {
      text: `
        UPDATE ParceiroEstoque
        SET ParceiroEstoqueProdutoQuantidade = ParceiroEstoqueProdutoQuantidade - $1
        WHERE ParceiroEstoqueID = $2
      `,
      values: [
        transacaoEmpresaParceiro.ParceiroEstoqueProdutoQuantidade,
        ParceiroEstoqueID,
      ],
    };
    await client.query(updateEstoqueQuery);

    // Atualizar a quantidade de créditos no Parceiro
    const updateCreditoParceiroQuery = {
      text: `
        UPDATE Parceiro
        SET ParceiroCreditoQuantidade = ParceiroCreditoQuantidade + $1
        WHERE ParceiroID = $2
      `,
      values: [
        transacaoParceiroParceiro.ParceiroCreditoQuantidade,
        ParceiroID,
      ],
    };

    await client.query(updateCreditoParceiroQuery);








    await client.query('COMMIT');
    // console.log('Transação realizada com sucesso.');

    // const retornoParceiroEstoque = await GETParceiroEstoque(client, parceiroID)
    // console.log(JSON.stringify(retornoParceiroEstoque))

    // if (!retornoParceiroEstoque.isSucesso) {
    //   const parceiroEstoque = {
    //     ParceiroID: parceiroID,
    //     ParceiroEstoqueProdutoDescricao: transacaoParceiroParceiro.ParceiroEstoqueProdutoDescricao,
    //     ParceiroEstoqueTipo: transacaoParceiroParceiro.ParceiroEstoqueTipo,
    //     ParceiroEstoqueProdutoQuantidade: transacaoParceiroParceiro.ParceiroEstoqueProdutoQuantidade
    //   }

    //   const retorno = await SETParceiroEstoque(client, parceiroEstoque)
    //   isSucesso = retorno.isSucesso

    // } else {
    //   const parceiroEstoque = {
    //     ParceiroEstoqueID: retornoParceiroEstoque.parceiroEstoque.ParceiroEstoqueID,
    //     ParceiroID: parceiroID,
    //     ParceiroEstoqueProdutoDescricao: transacaoParceiroParceiro.ParceiroEstoqueProdutoDescricao,
    //     ParceiroEstoqueTipo: transacaoParceiroParceiro.ParceiroEstoqueTipo,
    //     ParceiroEstoqueProdutoQuantidade: transacaoParceiroParceiro.ParceiroEstoqueProdutoQuantidade
    //   }

    //   const retorno = await SETParceiroEstoque(client, parceiroEstoque)
    //   isSucesso = retorno.isSucesso

    // }


    return { isSucesso, mensagem: isSucesso ? 'Transação realizada com sucesso.' : 'Erro ao realizar a transação.' };

  } catch (error) {
    // Rollback em caso de erro
    await client.query('ROLLBACK');
    console.error('Erro ao realizar a transação:', error);
  }
}
