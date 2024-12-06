import React, { Fragment, useEffect, useState } from "react"
import { ButtonType } from "../../../Buttons/ButtonType"
import { ActionMain } from "../../../Actions/actionMain"
import { get } from "../../../../api/funcRequest";
import { MdAdd } from "react-icons/md";
import { ActionListaRelatorioBi } from "./actionListaRelatorioBI";
import { ActionCadastrarRelatorioBIModal } from "./actionCadastrarRelatorioBIModal";
import { useQuery } from "react-query";

export const ActionPesquisaRelatorioBI = () => {
  const [modalVisivel, setModalVisivel] = useState(false);
  
  const { data: dadosBI = [], error: errorEmpresas, isLoading: isLoadingEmpresas, refetch } = useQuery(
    'relatorioInformaticaBI',
    async () => {
      const response = await get(`/relatorioInformaticaBI`);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, cacheTime: 5 * 60 * 1000
    }
  );


  const handleModalCadastro = () => {
    setModalVisivel(true)
  }

  return (

    <Fragment>
      <ActionMain
        linkComponentAnterior={["Home"]}
        linkComponent={["Relatório BI"]}
        title="Listagem dos Relatórios do BI"
     

        ButtonTypeCadastro={ButtonType}
        linkNome={"Cadastrar Relatório BI"}
        onButtonClickCadastro={handleModalCadastro}
        corCadastro={"success"}
        IconCadastro={MdAdd}

      />

      <ActionListaRelatorioBi dadosBI={dadosBI} />

      <ActionCadastrarRelatorioBIModal show={modalVisivel} handleClose={() => setModalVisivel(false)} />
    </Fragment>
  )
}