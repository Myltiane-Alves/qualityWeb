import { Fragment } from "react"
import { Modal } from "react-bootstrap"
import { HeaderModal } from "../Modais/HeaderModal/HeaderModal"
import { FooterModal } from "../Modais/FooterModal/footerModal"
import { InputSelect } from "../Buttons/InputSelect"
import { InputFieldModal } from "../Buttons/InputFieldModal"

export const CadastroActionCadProdPedidoAvulsoModal = ({ show, handleClose }) => {
  const options = [
    { value: "Funcionario 1", label: "Funcionario 1" },
    { value: "Funcionario 2", label: "Funcionario 2" },
  ]
  return (

    <Fragment>


      <div id="resultadoprodcadavulsopedido"></div>

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal fade"
        id="CadadiantamentoSalario"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <HeaderModal
          title="Produtos Avulsos"
          subTitle={"Inclusão de Produtos Avulso"}
          handleClose={handleClose}
        />
        <form>
          <div className="modal-body">


            <div className="row">
              <div className="col-sm-6 col-xl-3">

                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Marca do Grupo"

                />
              </div>
              <div className="col-sm-6 col-xl-3 mt-3">

                <InputFieldModal
                  id="nomeempAdiantamento"
                  className="form-control input"
                  readOnly={true}
                  label="Pesquisar Referencia/Produto"
                />
              </div>
              <div className="col-sm-6 col-xl-6 mt-2">

                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Lista dos Produtos da Pesquisa"

                />
              </div>
            </div>



            <div className="row mt-3">
              <div className="col-sm-6 col-xl-2">
               
                <InputFieldModal
                  id="nomeempAdiantamento"
                  className="form-control input"
                  readOnly={true}
                  label="Quantidade"
                />
              </div>
              <div className="col-sm-6 col-xl-2">
    
                <InputFieldModal
                  id="nomeempAdiantamento"
                  className="form-control input"
                  readOnly={true}
                  label="Referência"
                />
              </div>
              <div className="col-sm-6 col-xl-6">

                <InputFieldModal
                  id="nomeempAdiantamento"
                  className="form-control input"
                  readOnly={true}
                  label="Descrição Produto"
                />
              </div>
              <div className="col-sm-6 col-xl-2">
          

                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Categoria Produto"

                />
              </div>
            </div>



            <div className="row mt-3">
              <div className="col-sm-6 col-xl-2">                
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Tamanho"

                />
              </div>
              <div className="col-sm-6 col-xl-5">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Fornecedor"

                />
              </div>
              <div className="col-sm-6 col-xl-3">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Fabricante"
                />
              </div>
              <div className="col-sm-6 col-xl-2">

                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Unidade"
                />
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-sm-6 col-xl-2">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Cor"
                />
              </div>
              <div className="col-sm-6 col-xl-2">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Tipo de Tecido"
                />
              </div>
              {/* <!-- */}
              <div className="col-sm-6 col-xl-2">

                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Categoria Grade"
                />
              </div>
              {/* --> */}
              <div className="col-sm-6 col-xl-3">

                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Estrutura"
                />
              </div>
              <div className="col-sm-6 col-xl-2">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Estilos"
                />
              </div>
              <div className="col-sm-6 col-xl-3">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Categorias"
                />
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-sm-6 col-xl-4">

                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Local Exposição"
                />
              </div>

              <div className="col-sm-6 col-xl-2">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="E-commerce"
                />
              </div>
              <div className="col-sm-6 col-xl-2">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Rede Social"
                />
              </div>
              <div className="col-sm-6 col-xl-2">
                <InputFieldModal
                  id="nomeempAdiantamento"
                  className="form-control input"
                  readOnly={false}
                  label="Vr Custo"
                />
              </div>
              <div className="col-sm-6 col-xl-2">

                <InputFieldModal
                  id="nomeempAdiantamento"
                  className="form-control input"
                  readOnly={false}
                  label="Vr Venda"
                />
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-sm-6 col-xl-3">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="NCM"
                />
              </div>
              <div className="col-sm-6 col-xl-3">

                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Tipo Produto"
                />
              </div>
              <div className="col-sm-6 col-xl-6">
                <InputSelect
                  id="IDFuncionario"
                  options={options}
                  label="Tipo Fiscal"
                />
              </div>
            </div>


            <div className="row">
              <div className="col-sm-6 col-xl-4">
                <label className="form-label">PRÉVIA DO PRODUTO</label>
              </div>
              <div className="col-sm-6 col-xl-8" id="buttonpreviaavulso">

              </div>
            </div>

            <div className="form-group">
              <div className="row" id="resultadoprevprodavulso">
              </div>
            </div>
          </div>
        </form>

        <FooterModal handleClose={handleClose} />

      </Modal>

    </Fragment>
  )
}

{/* <script>
      $("#vrunitcusto").mask('#.##0,00', {reverse: true});
      $("#vrunitvenda").mask('#.##0,00', {reverse: true});
    </script> */}
