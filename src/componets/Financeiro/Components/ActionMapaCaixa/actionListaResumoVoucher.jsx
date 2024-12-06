import { Fragment } from "react"
import { formatMoeda } from "../../../../utils/formatMoeda"


export const ActionListaResumoVoucher = ({ dadosResumoVoucher }) => {
  const dados = Array.isArray(dadosResumoVoucher) ? dadosResumoVoucher.map((item, index) => {

    return {
      VRVOUCHER: item.VRVOUCHER,
    }
  }) : [];

  const calcularTotalVoucher = () => {
    let total = 0;
    for(let resultado of dados) {
      total += parseFloat(resultado.VRVOUCHER); 
    }
    return total;
  }
  return (

    <Fragment>

      <div className="card">
        <table className="table table-bordered table-hover table-responsive-lg table-striped w-100">
          <tbody className="thead-themed">
            <tr>
              <td style={{ textAlign: 'center', fontSize: '1rem', width: '60%' }}>
                Total Voucher
              </td>
              <td style={{ textAlign: 'right' }}>{formatMoeda(calcularTotalVoucher()) } </td>
            </tr>

          </tbody>
        </table>
      </div>

    </Fragment>
  )
}
