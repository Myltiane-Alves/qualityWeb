import { Fragment, useEffect, useState } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonTable } from "../../../ButtonsTabela/ButtonTable";
import { formatMoeda } from "../../../../utils/formatMoeda";
import { FaCheck, FaMinus } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { post, put } from "../../../../api/funcRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export const ActionListaProduto = ({ dadosColetorBalanco, empresaSelecionada }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
    getIPUsuario();
  }, [usuarioLogado]);

  const getIPUsuario = async () => {
    const response = await axios.get('http://ipwho.is/')
    if (response.data) {
      setIpUsuario(response.data.ip);
    }
    return response.data;
  }


 
  const dados = dadosColetorBalanco.map((item) => {
    let listarDetalheBalanco = 1;
    return {
      IDPRODUTO: item.IDPRODUTO,
      NUCODBARRAS: item.NUCODBARRAS,
      DSNOME: item.DSNOME,
      PRECOCUSTO: parseFloat(item.PRECOCUSTO),
      PRECOVENDA: item.PRECOVENDA,
      TOTALCONTAGEMGERAL: item.TOTALCONTAGEMGERAL,
      listarDetalheBalanco: listarDetalheBalanco,
    }
  });

  const colunasVendas = [

    {
      field: 'IDPRODUTO',
      header: 'Produto',
      body: row => <th> {row.IDPRODUTO}</th>,
      sortable: true,
    },
    {
      field: 'NUCODBARRAS',
      header: 'Cód. Barras',
      body: row => <th> {row.NUCODBARRAS}</th>,
      sortable: true,
    },
    {
      field: 'DSNOME',
      header: 'Descrição',
      body: row => <th> {row.DSNOME}</th>,
      footer: 'Total',
      sortable: true,
    },
    {
      field: 'PRECOCUSTO',
      header: 'R$ Custo',
      body: row => <th> {formatMoeda(row.PRECOCUSTO)}</th>,
      sortable: true,
    },
    {
      field: 'PRECOVENDA',
      header: 'R$ Venda',
      body: row => <th> {formatMoeda(row.PRECOVENDA)}</th>,
      sortable: true,
    },
    {
      header: 'Opções',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      body: (row) => (
        <div className="d-flex "
          style={{ justifyContent: "space-between" }}
        >
          <div>
            <ButtonTable
              onClickButton={handleSubmit(onSubmit)}
              titleButton={"Confirmar"}
              Icon={FaCheck}
              cor={"success"}
              iconSize={20}
            />
          </div>
        </div>
      ),
    },
  ]


  const onSubmit = async () => {
    if (parseInt(dadosColetorBalanco.length) === 0) {
      const createData = {
        IDEMPRESA: dadosColetorBalanco[0].IDEMPRESA,
        NUMEROCOLETOR: usuarioLogado.id,
        DSCOLETOR: usuarioLogado.nome,
        IDPRODUTO: dadosColetorBalanco[0].IDPRODUTO,
        CODIGODEBARRAS: dadosColetorBalanco[0].NUCODBARRAS,
        DSPRODUTO: dadosColetorBalanco[0].DSNOME,
        TOTALCONTAGEMGERAL: dadosColetorBalanco[0].TOTALCONTAGEMGERAL,
        PRECOCUSTO: dadosColetorBalanco[0].PRECOCUSTO,
        PRECOVENDA: dadosColetorBalanco[0].PRECOVENDA,
        STCANCELADO: 'False',
        INSBALANCO: parseInt(0),
      }
      const response = await post('/criar-detalhe-balanco-avulso', createData)

      const textDados = JSON.stringify(createData)
      let textoFuncao = 'ADMINISTRATIVO/CADASTRO BALANÇO AVULSO';


      const postData = {
        IDFUNCIONARIO: usuarioLogado.id,
        PATHFUNCAO: textoFuncao,
        DADOS: textDados,
        IP: ipUsuario
      }

      const responsePost = await post('/log-web', postData)

      Swal.fire({
        title: 'Sucesso',
        text: 'Cadastro Realizado com Sucesso',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        customClass: {
          container: 'custom-swal', 
        }
      })

      return responsePost.data;
    } else {
      const putData = {
        IDEMPRESA: empresaSelecionada,
        NUMEROCOLETOR: usuarioLogado.id,
        DSCOLETOR: 'COLETOR WEB - ' + usuarioLogado.NOFUNCIONARIO,
        IDPRODUTO: dadosColetorBalanco[0].IDPRODUTO,
        TOTALCONTAGEMGERAL: dadosColetorBalanco[0].TOTALCONTAGEMGERAL,

      }
        const response = await put('/detalhe-balanco-avulso/:id', putData)

        const textDados = JSON.stringify(putData)
        let textoFuncao = 'ADMINISTRATIVO/ALTERAR BALANÇO AVULSO';
    
    
        const postData = {
          IDFUNCIONARIO: usuarioLogado.id,
          PATHFUNCAO: textoFuncao,
          DADOS: textDados,
          IP: ipUsuario
        }
        
        Swal.fire({
          title: 'Sucesso',
          text: 'Alteração Realizada com Sucesso',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            container: 'custom-swal', 
          }
        })

        const responsePost = await post('/log-web', postData)
        handleClose();
        return responsePost.data;
    }


  }



  return (

    <Fragment>

      <div className="panel">
        <div className="panel-hdr">
          <h2> Lista de Produtos </h2>
        </div>
        <div className="card">
          <DataTable
            title="Vendas por Loja"
            value={dados}
            sortField="VRTOTALPAGO"
            sortOrder={-1}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            showGridlines
            stripedRows
            emptyMessage={<div className="dataTables_empty">Nenhum resultado encontrado</div>}
          >
            {colunasVendas.map(coluna => (
              <Column
                key={coluna.field}
                field={coluna.field}
                header={coluna.header}

                body={coluna.body}
                footer={coluna.footer}
                sortable={coluna.sortable}
                headerStyle={{ color: 'white', backgroundColor: "#7a59ad", border: '1px solid #e9e9e9', fontSize: '0.8rem' }}
                footerStyle={{ color: '#212529', backgroundColor: "#e9e9e9", border: '1px solid #ccc', fontSize: '0.8rem' }}
                bodyStyle={{ fontSize: '0.8rem' }}

              />
            ))}
          </DataTable>
        </div>
      </div>
    </Fragment>
  )
}
