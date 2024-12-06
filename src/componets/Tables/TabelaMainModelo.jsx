import { Fragment, useEffect, useState } from "react"
import Table from "react-bootstrap/esm/Table"
import PropTypes from 'prop-types';
import { ButtonEditar } from "../ButtonsTabela/ButtonEditar"
import { ButtonSalvar } from "../ButtonsTabela/ButtonSalvar"
import { ButtonCancelar } from "../ButtonsTabela/ButtonCancelar"
import Pagination from 'react-bootstrap/Pagination';
import { InputSelect } from "../Buttons/InputSelect";
import { ButtonPrint } from "../Buttons/ButtonPrint";
import { ButtonExcel } from "../Buttons/ButtonExcel";
import { ButtonPDF } from "../Buttons/ButtonPDF";
import { InputSearch } from "../Buttons/InputSearch";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { InputSelectTabela } from "../Buttons/InputSelectTabela";
import CustomTableCell from "./CustomTableCell"

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
      <Table>
        <TableHead>
          <TableRow>
            {colunas && Object.keys(colunas).map((coluna, index) => (
              <CustomTableCell key={index}>{coluna}</CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dadosPaginados.length > 0 ? (
            dadosPaginados.map((item, rowIndex) => (
              <TableRow key={rowIndex} className="table-success">
                {Object.keys(colunas).map((colunaKey, colIndex) => (
                  <CustomTableCell key={colIndex}>
                    {colIndex === Object.keys(colunas).length - 1 ? (
                      <div style={{ display: "flex", justifyContent: "space-between", width: "120px" }}>
                        {showEditar && <ButtonEditar onClickEdit={() => onEditar(item)} />}
                        {showSalvar && <ButtonSalvar onClick={() => onSalvar(item)} />}
                        {showCancelar && <ButtonCancelar onClick={() => onCancelar(item)} />}
                      </div>
                    ) : (
                      typeof colunas[colunaKey] === 'string' ? (
                        getNestedValue(item, colunas[colunaKey])
                      ) : (
                        colunas[colunaKey]
                      )
                    )}
                  </CustomTableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="">
              <CustomTableCell colSpan={Object.keys(colunas).length}>
                <h2>Sem Registros para Exibir</h2>
              </CustomTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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