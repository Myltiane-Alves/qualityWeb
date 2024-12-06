import React, { Fragment, useState } from "react"
import { ActionPesquisaCreateVoucherCliente } from "./actionPesquisaCreateVoucherCliente";
import { ActionPesquisaCreateVoucher } from "./actionPesquisaCreateVoucher";


export const ActionPesquisaVoucher = () => {
  const [actionPrinicpal, setActionPrincipal] = useState(true);
  const [actionSecundaria, setActionSecundaria] = useState(false);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [tabelaVendasClientes, setTabelaVendasClientes] = useState(false);


  return (

    <VoucherProvider>
      <ActionPesquisaCreateVoucher
        tabelaVisivel={tabelaVisivel}
        setTabelaVisivel={setTabelaVisivel}
        tabelaVendasClientes={tabelaVendasClientes}
        setTabelaVendasClientes={setTabelaVendasClientes}
        actionPrinicpal={actionPrinicpal}
        setActionPrincipal={setActionPrincipal}
        actionSecundaria={actionSecundaria}
        setActionSecundaria={setActionSecundaria}
      />

      <ActionPesquisaCreateVoucherCliente
        tabelaVisivel={tabelaVisivel}
        setTabelaVisivel={setTabelaVisivel}
        tabelaVendasClientes={tabelaVendasClientes}
        setTabelaVendasClientes={setTabelaVendasClientes}
        actionPrinicpal={actionPrinicpal}
        setActionPrincipal={setActionPrincipal}
        actionSecundaria={actionSecundaria}
        setActionSecundaria={setActionSecundaria}
      />
    </VoucherProvider>
  
   
  )
}