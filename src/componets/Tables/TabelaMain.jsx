import { Fragment, useEffect, useState } from "react"
import Table from "react-bootstrap/esm/Table"
import PropTypes from 'prop-types';
import { ButtonEditar } from "../ButtonsTabela/ButtonEditar"
import { ButtonSalvar } from "../ButtonsTabela/ButtonSalvar"
import { ButtonCancelar } from "../ButtonsTabela/ButtonCancelar"
import Pagination from 'react-bootstrap/Pagination';
import { InputSelect } from "../Buttons/InputSelect";
// import { ButtonPrint } from "../Buttons/ButtonPrint";
// import { ButtonExcel } from "../Buttons/ButtonExcel";
// import { ButtonPDF } from "../Buttons/ButtonPDF";
import { InputSearch } from "../Buttons/InputSearch";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { InputSelectTabela } from "../Buttons/InputSelectTabela";

const TabelaPrincipal = ({
  colunas,
  nome,
  colunaOriginal,
  nomesColunas,
  data,
  onEditar,
  onSalvar,
  onCancelar,
  itensPorPagina,
  handlePaginaAnterior,
  handleProximaPagina,
  handlePaginaClicada,
  showCancelar,
  showEditar,
  showSalvar,
}) => {

  const [paginaAtual, setPaginaAtual] = useState(1);

  const startIndex = (paginaAtual - 1) * itensPorPagina;
  const endIndex = paginaAtual * itensPorPagina;

  const dadosPaginados = data && data.length > 0 ? data.slice(startIndex, endIndex) : [];
  const totalPaginas = Math.ceil(data ? data.length / itensPorPagina : 0);

  const Options = [
    { value: 0, label: "Todos" },
    // Adicione outras opções conforme necessário
  ];

  function getNestedValue(obj, path) {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : ''), obj);
  }

  return (
    <Fragment>
      <div id="resultado">

        <div
          className="col-sm-6 col-md-12 col-xl-12  mb-3 mb-md-0 d-flex"
          style={{
            justifyContent: "space-between"

          }}
        >
          <InputSearch />
          <div className="d-flex" >

            <InputSelectTabela
              label="Empresa"
              nome="idloja"
              id="idloja"
              options={Options}
            />
            {/* <ButtonPrint />
            <ButtonExcel />
            <ButtonPDF /> */}
          </div>
        </div>

        <Table
          responsive
          className="table table-bordered table-hover table-striped w-100 dataTable no-footer dtr-inline collapsed"


        >
          <thead className="bg-primary-600">
            <tr className="sorting_asc" role="row" aria-sort="ascending">
            {colunas && Object.keys(colunas).map((coluna, index) => (
              <th key={index}>{coluna}</th>
            ))}
              {/* {colunas.map((coluna, index) => (
                <th key={index}>{coluna}</th>
              ))} */}
            </tr>
          </thead>
          <tbody>
            {dadosPaginados.length > 0 ? (
              dadosPaginados.map((item, rowIndex) => (
                <tr role="row" key={rowIndex} className="table-success">
                  {Object.keys(colunas).map((colunaKey, colIndex) => (
                    <td class="sorting_1" key={colIndex}>
                      {colIndex === Object.keys(colunas).length - 1 ? (
                        <div style={{ display: "flex", justifyContent: "space-between", width: "120px" }}>
                          {showEditar && <ButtonEditar onClickEdit={() => onEditar(item)} />}
                          {showSalvar &&  <ButtonSalvar onClick={() => onSalvar(item)} /> }
                          {showCancelar && <ButtonCancelar onClick={() => onCancelar(item)} />}
                        </div>
                      ) : (
                        // item[colunas] alterado para item[colunaKey]
                        typeof colunas[colunaKey] === 'string' ? (
                          getNestedValue(item, colunas[colunaKey])
                        ) : (
                          colunas[colunaKey] // Se não for uma string, exibe o valor da coluna diretamente
                        )
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="">
                <td valign="top" className="dataTables_empty" colSpan={Object.keys(colunas).length}>
                  <h2>Sem Registros para Exibir</h2>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="table-warning totalQuebraCaixaLoja">
            <tr>
              <th style={{ textAlign: "center;" }}>Total Vendas</th>
              <th style={{ textAlign: "right" }}>0,00</th>
              <th style={{ textAlign: "right" }}>0,00</th>
              <th style={{ textAlign: "right" }}>0,00</th>
              <th colSpan={7}></th>

            </tr>

          </tfoot>

          {/* <PaginationBtn /> */}
        </Table>

        <Pagination className='mt-5'>
          <Pagination.First onClick={() => handlePaginaClicada(1)} />
          <Pagination.Prev onClick={handlePaginaAnterior} />
          {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(pagina => (
            <Pagination.Item key={pagina} active={pagina === paginaAtual} onClick={() => handlePaginaClicada(pagina)}>
              {pagina}
              {/* {console.log(pagina)} */}
            </Pagination.Item>
          ))}


          <Pagination.Next onClick={handleProximaPagina} />
          <Pagination.Last onClick={() => handlePaginaClicada(totalPaginas)} />
        </Pagination>
      </div>
    </Fragment>
  )
}



TabelaPrincipal.propTypes = {
  colunas: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEditar: PropTypes.func.isRequired,
  onSalvar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
  itensPorPagina: PropTypes.number.isRequired,
  paginaAtual: PropTypes.number.isRequired,
  handlePaginaAnterior: PropTypes.func.isRequired,
  handleProximaPagina: PropTypes.func.isRequired,
  handlePaginaClicada: PropTypes.func.isRequired,
}

export default TabelaPrincipal;



// {dadosPaginados.length > 0 ? (
//   dadosPaginados.map((item, rowIndex) => (
//     <tr key={rowIndex} className="table-success">
//       {colunaOriginal.map((coluna, colIndex) => (
//         <td key={colIndex}>
//           {colIndex === colunas.length - 1 ? (
//             <div style={{ display: "flex", justifyContent: "space-between", width: "120px" }}>
//               <ButtonEditar onClickEdit={() => onEditar(item)} />
//               <ButtonSalvar onClick={() => onSalvar(item)} />
//               <ButtonCancelar onClick={() => onCancelar(item)} />
//             </div>
//           ) : (
//             item[coluna]
//           )}
//         </td>
//       ))}
//     </tr>
//   ))
// ) : (
//   <tr className="">
//     <td valign="top" className="dataTables_empty" colSpan={colunas.length}>
//       <h2>Sem Registros para Exibir</h2>
//     </td>
//   </tr>
// )}
