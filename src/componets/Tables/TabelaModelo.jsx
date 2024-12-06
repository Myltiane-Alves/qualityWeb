import React from "react";
import PropTypes from 'prop-types';
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

const TabelaModelo = ({ columns, data, onEdit, onSave, onCancel }) => {
  return (
    <Table className="table table-bordered table-hover table-striped w-100 dataTable no-footer dtr-inline collapsed">
      <thead className="bg-primary-600">
        <tr>
          {/* Mapeie as colunas para renderizar os cabeçalhos */}
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {/* Mapeie os dados com base nas colunas */}
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column]}</td>
              ))}
              <td>
                {/* Botões de ação */}
                <Button onClick={() => onEdit(item)}>Editar</Button>
                <Button onClick={() => onSave(item)}>Salvar</Button>
                <Button onClick={() => onCancel(item)}>Cancelar</Button>
              </td>
            </tr>
          ))
        ) : (
          <tr className="odd table-success">
            <td valign="top" colSpan={columns.length + 1} className="dataTables_empty">
              <h2>Sem Registros para Exibir</h2>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

TabelaModelo.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DynamicTable;
