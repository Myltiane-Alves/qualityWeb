import React, { Fragment, useEffect, useState, useRef } from "react"
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { dataFormatada } from "../../../../utils/dataFormatada";
import { get, post, put } from "../../../../api/funcRequest";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CiEdit } from "react-icons/ci";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUserAltSlash, FaUserTimes } from "react-icons/fa";
import { ActionUpdateFuncionarioModal } from "./actionUpdateFuncionarioModal";
import { ActionUpdateDescontoFuncionarioModal } from "./actionUpdateDescontoFuncionarioModal";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import HeaderTable from "../../../Tables/headerTable";
import { toFloat } from "../../../../utils/toFloat";
import { formatarPorcentagem } from "../../../../utils/formatarPorcentagem";
import Swal from "sweetalert2";
import { getDataAtual } from "../../../../utils/dataAtual";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { FaCheck } from "react-icons/fa6";
import { ActionEditarFuncionario } from "./ActionEditar/actionEditarFuncionario";

export const ActionListaFuncionarios = ({ dadosFuncionarios }) => {
  const [modalAlterarFuncionarioVisivel, setModalAlterarFuncionarioVisivel] = useState(false);
  const [modalDescontoVisivel, setModalDescontoVisivel] = useState(false);
  const [dadosAtualizarFuncionarios, setDadosAtualizarFuncionarios] = useState([]);
  const [dadosDescontoFuncionarios, setDadosDescontoFuncionarios] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [size, setSize] = useState('small');
  const [data, setData] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [ipUsuario, setIpUsuario] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (usuarioArmazenado) {
      try {
        const parsedUsuario = JSON.parse(usuarioArmazenado);
        setUsuarioLogado(parsedUsuario);;
      } catch (error) {
        console.error('Erro ao parsear o usuário do localStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
  }, [usuarioLogado]);

  useEffect(() => {
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if(response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }


  useEffect(() => {
    const dataAtualCampo = getDataAtual();
    setData(dataAtualCampo);
  },[])
  const dataTableRef = useRef();

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => dataTableRef.current,
    documentTitle: 'Lista de Funcionarios',
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Nº', 'CPF', 'Funcionário', 'Login', 'Função', 'Localização', 'TP. Contratação', 'Tipo', 'Desconto %', 'Situação', 'DT Desl.']],
      body: dados.map(item => [
        item.contador,
        item.NUCPF,
        item.NOFUNCIONARIO, 
        item.NOLOGIN,
        item.DSFUNCAO,
        item.STLOJA == 'True' ? 'Loja' : 'Escritório',
        item.STCONVENIO == 'True' ? 'CLT' : 'PJ',
        item.DSTIPO == 'PN' ? 'PARCEIRO DE NEGÓCIOS' : 'FUNCIÓNARIO',
        item.PERC,
        item.STATIVO == 'True' ? 'Ativo' : 'Inativo',
        dataFormatada(item.DTDEMISSAO)

      ]),
      horizontalPageBreak: true,
      horizontalPageBreakBehaviour: 'immediately'
    });
    doc.save('lista_funcionarios.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    const header = ['Nº', 'CPF', 'Funcionário', 'Login', 'Função', 'Localização', 'TP. Contratação', 'Tipo', 'Desconto %', 'Situação', 'DT Desl.'];
    worksheet['!cols'] = [
      { wpx: 70, caption: 'Nº' },
      { wpx: 100, caption: 'CPF' },
      { wpx: 200, caption: 'Funcionário' },
      { wpx: 100, caption: 'Login' },
      { wpx: 100, caption: 'Função' },
      { wpx: 100, caption: 'Localização' },
      { wpx: 100, caption: 'TP. Contratação' },
      { wpx: 100, caption: 'Tipo' },
      { wpx: 100, caption: 'Desconto %' },
      { wpx: 100, caption: 'Situação' },
      { wpx: 100, caption: 'DT Desl.' },

    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Funcionarios');
    XLSX.writeFile(workbook, 'lista_funcionarios.xlsx');
  };

  const dados = dadosFuncionarios.map((item, index) => {
    let contador = index + 1;
    
    return {
      contador,
      NUCPF: item.NUCPF,
      NOFUNCIONARIO: item.NOFUNCIONARIO,
      NOLOGIN: item.NOLOGIN,
      DSFUNCAO: item.DSFUNCAO,
      STLOJA: item.STLOJA,
      STCONVENIO: item.STCONVENIO,
      DSTIPO: item.DSTIPO,
      PERC: toFloat(item.PERC),
      STATIVO: item.STATIVO,
      DTDEMISSAO: item.DTDEMISSAO,
      ID: item.ID,
      IDFUNCIONARIO: item.IDFUNCIONARIO,
     
    };
  });

  const colunasFuncionarios = [
    {
      field: 'contador',
      header: 'Nº',
      body: row => <th>{row.contador}</th>,
      sortable: true,

    },
    {
      field: 'NUCPF',
      header: 'CPF',
      body: row => <th>{row.NUCPF}</th>,
      sortable: true,

    },
    {
      field: 'NOFUNCIONARIO',
      header: 'Funcionário',
      body: row => (
        <div style={{width: '200px'}}>

          <th>{row.NOFUNCIONARIO}</th>
        </div>
      ),
      sortable: true,

    },
    {
      field: 'NOLOGIN',
      header: 'Login',
      body: row => <th>{row.NOLOGIN}</th>,
      sortable: true,

    },
    {
      field: 'DSFUNCAO',
      header: 'Função',
      body: row => <th>{row.DSFUNCAO}</th>,
      sortable: true,

    },
    {
      field: 'STLOJA',
      header: 'Localização',
      body: (row) => (
        <th>
          {row.STLOJA == 'True' ? 'Loja' : 'Escritório'}
        </th>
      ),
      sortable: true,

    },
    {
      field: 'STCONVENIO',
      header: 'TP. Contratação',
      body: (
        (row) => (
          <th>
            {row.STCONVENIO == 'True' ? 'CLT' : 'PJ'}

          </th>
        )
      ),
      sortable: true,
    },
    {
      field: 'DSTIPO',
      header: 'Tipo',
      body: (row) => (
        <div style={{width: '150px'}}>

        <th>
          {row.DSTIPO == 'PN' ? 'PARCEIRO DE NEGÓCIOS' : 'FUNCIÓNARIO'}
        </th>
        </div>
      ),
      sortable: true,
    },
    {
      field: 'PERC',
      header: 'Desc %',
      body: (
        (row) => (
          <th style={{ color: row.PERC == 'False' ? 'red' : 'blue' }}>
            {formatarPorcentagem(row.PERC)}

          </th>
        )
      ),
      sortable: true,
    },
    {
      field: 'STATIVO',
      header: 'Situação',
      body: (
        (row) => (
          <th style={{ color: row.STATIVO == 'True' ? 'blue' : 'red' }}>
            {row.STATIVO == 'True' ? 'Ativo' : 'Inativo'}

          </th>
        )
      ),
      sortable: true,
    },
    {
      field: 'DTDEMISSAO',
      header: 'DT Desl.',
      body: row => <th>{dataFormatada(row.DTDEMISSAO)}</th>,
      sortable: true,
    },

    {
      field: 'ID',
      header: 'Opções',
      body: (row) => {
        if(row.STATIVO == 'True')  {
          return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div className="p-1">
                <ButtonTable
                  titleButton={"Alterar"}
                  onClickButton={() => handleClickEdit(row)}
                  Icon={CiEdit}
                  iconSize={20}
                  iconColor={"#fff"}
                  cor={"primary"}
                  width="30px"
                  height="30px"

                />

              </div>
              <div className="p-1">
                <ButtonTable
                  titleButton={"Alterar Desconto Autorizado"}
                  onClickButton={() => handleClickDesconto(row)}
                  Icon={MdOutlineAttachMoney}
                  iconSize={20}
                  iconColor={"#fff"}
                  cor={"info"}
                  width="30px"
                  height="30px"
                />

              </div>
              <div className="p-1">
                <ButtonTable
                  titleButton={"Inativar"}
                  onClickButton={() => handleAtivarFuncionario(row)}
                  Icon={FaUserAltSlash}
                  iconSize={20}
                  iconColor={"#fff"}
                  cor={"warning"}
                  width="30px"
                  height="30px"
                />

              </div>
              <div className="p-1">
                <ButtonTable
                  titleButton={"Desligar"}
                  onClickButton={() => handleDesligarFuncionario(row)}
                  Icon={FaUserTimes}
                  iconSize={20}
                  iconColor={"#fff"}
                  cor={"danger"}
                  width="30px"
                  height="30px"
                />

              </div>

            </div>
          )

        } else {
          return (
            <div className="p-1">
            <ButtonTable
              titleButton={"ativar"}
              onClickButton={() => handleAtivarFuncionario(row)}
              Icon={FaCheck}
              iconSize={18}
              iconColor={"#fff"}
              cor={"danger"}
            />

          </div>
          )
        }
    },
      sortable: true,
    },

  ]


  const handleEdit = async (IDFUNCIONARIO) => {
    try {
      const response = await get(`/funcionarios-loja?byId=${IDFUNCIONARIO}`)
      if (response.data) {
        setDadosAtualizarFuncionarios(response.data)

        setModalAlterarFuncionarioVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickEdit = (row) => {
    if (row && row.IDFUNCIONARIO) {
      handleEdit(row.IDFUNCIONARIO);
    }
  };

  const handleDesconto = async (IDFUNCIONARIO) => {
    try {
      const response = await get(`/funcionarios-loja?byId=${IDFUNCIONARIO}`)
      if (response.data) {
        setDadosDescontoFuncionarios(response.data)
        console.log(response, 'dadosDescontoFuncionarios')
        setModalDescontoVisivel(true);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda: ', error);
    }
  };

  const handleClickDesconto = (row) => {
    if (row && row.IDFUNCIONARIO) {
      handleDesconto(row.IDFUNCIONARIO);
    }
  };



  const handleDesligarFuncionario = async (row) => {
    const putData = {
      DATAULTIMAALTERACAO: data,
      STATIVO: 'False',
      DATA_DEMISSAO :data,
      ID: row.ID
    }
    

    try {
      const response = await put('/inativar-funcionario', putData)

      Swal.fire({
        title: 'Atualização',
        text: 'Atualizção Realizada com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

      const textDados = JSON.stringify(putData)
      let status = putData.STATIVO;
      let textoFuncao;
      if(status =='True'){
        textoFuncao = 'INFORMATICA/ATIVA DESLIGAMENTO DE FUNCIONARIO';
      }else{
          textoFuncao = 'INFORMATICA/DESLIGAMENTO DE FUNCIONARIO';
      }
  
  
      const createData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }
  
      const responsePost = await post('/log-web', createData)
  
      
      return responsePost.data;
    } catch (error) {
      Swal.fire({
        title: 'Erro ao Atualizar',
        text: 'Erro ao Tentar Atualizar',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
      console.error('Erro ao parsear o usuário do localStorage:', error);
    }
  }

  const handleAtivarFuncionario = async (row) => {
    const putData = {
      DATAULTIMAALTERACAO: data,
      STATIVO: 'True',
      DATA_DEMISSAO: '',
      ID: row.ID
    }
    try {
      const response = await put('/inativar-funcionario', putData)
      

      Swal.fire({
        title: 'Atualização',
        text: 'Atualizção Realizada com Sucesso',
        icon: 'success',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })

      const textDados = JSON.stringify(putData)
      let status = putData.STATIVO;
      let textoFuncao;
      if(status === 'True'){
        textoFuncao = 'INFORMATICA/ATIVA DESLIGAMENTO DE FUNCIONARIO';
      } else {
        textoFuncao = 'INFORMATICA/DESLIGAMENTO DE FUNCIONARIO';
      }
  
      const createData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }
  
      const responsePost = await post('/log-web', createData)
  
      
      return responsePost.data;
    } catch (error) {
      Swal.fire({
        title: 'Erro ao Atualizar',
        text: 'Erro ao Tentar Atualizar',
        icon: 'error',
        timer: 3000,
        customClass: {
          container: 'custom-swal',
        }
      })
      console.error('Erro ao parsear o usuário do localStorage:', error);
    }
  }
  
  
  return (

    <Fragment>

      <div className="panel">
        <div className="panel-hdr">
          <h2>Lista de Funcionários</h2>
        </div>
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <HeaderTable
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            handlePrint={handlePrint}
            exportToExcel={exportToExcel}
            exportToPDF={exportToPDF}
          />

        </div>
        <div className="card" ref={dataTableRef}>


          <DataTable
            title="Lista de Funcionários"
            value={dados}
            size={size}
            globalFilter={globalFilterValue}
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50, 100, dados.length]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Registros"
            filterDisplay="menu"
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasFuncionarios.map(coluna => (

              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}

                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem', border: '1px solid #e9e9e9'}}
              />
            ))}
          </DataTable>

        </div>
      </div>


      <ActionEditarFuncionario 
         show={modalAlterarFuncionarioVisivel}
         handleClose={() => setModalAlterarFuncionarioVisivel(false)}
         dadosAtualizarFuncionarios={dadosAtualizarFuncionarios}
      /> 
      {/* <ActionUpdateFuncionarioModal
        show={modalAlterarFuncionarioVisivel}
        handleClose={() => setModalAlterarFuncionarioVisivel(false)}
        dadosAtualizarFuncionarios={dadosAtualizarFuncionarios}
      /> */}


      <ActionUpdateDescontoFuncionarioModal
        show={modalDescontoVisivel}
        handleClose={() => setModalDescontoVisivel(false)}
        dadosDescontoFuncionarios={dadosDescontoFuncionarios}
      />

    </Fragment>
  )
}

