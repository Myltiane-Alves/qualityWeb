import React from 'react';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import { formatMoeda } from '../../utils/formatMoeda';
import { dataFormatada } from '../../utils/dataFormatada';
import { ButtonDetalhar } from '../ButtonsTabela/ButtonDetalhar';
import { FooterModal } from './FooterModal/footerModal';
import { HeaderModal } from './HeaderModal/HeaderModal';

const ModalDetalhesVoucher = ({ modalVisivel, handleCloseModal, voucherModal }) => {
  
  const dadosVoucherModal = voucherModal.map((item) => {
    console.log(item, "item")
    return {
      NUCODBARRAS: item.NUCODBARRAS,
      DSPRODUTO: item.DSPRODUTO,
      VRUNIT: item.VRUNIT,
      QTD: item.QTD,
      VRTOTALBRUTO: item.VRTOTALBRUTO,
      VRDESCONTO: item.VRDESCONTO,
      VRTOTALLIQUIDO: item.VRTOTALLIQUIDO,


    }
  });

  const colunasVouchersModal = [
    {
      name: 'Código Barras',
      selector: row => row.NUCODBARRAS,
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: row => row.DSPRODUTO,
      sortable: true,
    },
    {
      name: 'Vr Unit',
      selector: row => formatMoeda(row.VRUNIT),
      sortable: true,
    },
    {
      name: 'QTD',
      selector: row => row.QTD,
      sortable: true,
    },
    {
      name: 'Vr Bruto',
      selector: row => formatMoeda(row.VRTOTALBRUTO),
      sortable: true,
    },
    {
      name: 'Vr Desconto',
      selector: row => formatMoeda(row.VRDESCONTO),
      sortable: true,
    },
  
    {
      name: 'Vr Líquido',
      selector: row => formatMoeda(row.VRTOTALLIQUIDO),
      sortable: true,
    },
  ]

  return (
    <Modal show={modalVisivel} onHide={handleCloseModal} size="lg">
      <HeaderModal
        title={"Detalhes do Voucher"}
        subTitle={"Relação de Produtos Voucher"}
        handleClose={handleCloseModal}
      />
      <Modal.Body>
        <DataTable
          title={`Lista de Produtos do Voucher Nº: ` + voucherModal[0].NUVOUCHER}
          columns={colunasVouchersModal}
          data={dadosVoucherModal}
          pagination={itensPorPagina}
          paginationPerPage={10}
          customStyles={{
            header: {
              style: {
                backgroundColor: '#f2f2f2',
                color: '#7a59ad',
              },
            },
            headCells: {
              style: {
                backgroundColor: '#7a59ad',
                color: 'white',
              },
            },
            cells: {
              style: {
                backgroundColor: '#fbfbfb',

                border: '0.1px solid #e9e9e9',
                // borderRadius: '1px',
                color: '#000',
              },
            },
            pagination: {
              style: {
                backgroundColor: '#7a59ad',
                color: 'white',
              },
            },

          }}
        />
      </Modal.Body>
      <FooterModal handleClose={handleCloseModal} />
    </Modal>
  );
};

export default ModalDetalhesVoucher;
